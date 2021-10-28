import { PrismaClient } from '../generated'
import { hash } from 'bcrypt'

import { UserRole } from '../generated'

import doc1 from './doc1.json'

const prisma = new PrismaClient()

const DEFAULT_USERS = [
  {
    email: `quarterback+ADMIN@atypon.com`,
    firstname: 'Edna',
    lastname: 'Admin',
    role: UserRole.ADMIN
  },
  {
    email: `quarterback+USER@atypon.com`,
    firstname: 'John',
    lastname: 'Smith',
    role: UserRole.USER
  }
]

const DEFAULT_DOCS = [
  {
    name: 'Example 1',
    doc: doc1
  }
]

async function insertUser(userParams: typeof DEFAULT_USERS[0], password: string) {
  return prisma.user.upsert({
    where: { email: userParams.email },
    update: {},
    create: {
      ...userParams,
      password,
    },
  })
}

async function insertPmDocs(userId: string) {
  await prisma.pmDoc.createMany({
    data: DEFAULT_DOCS.map(d => ({ ...d, user_id: userId })),
  })
}

async function main() {
  const password = await hash('asdfasdf', 10)
  const users = await Promise.all(DEFAULT_USERS.map(user => insertUser(user, password)))
  const docs = await Promise.all(users.map(user => insertPmDocs(user.id)))
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
