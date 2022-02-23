/*!
 * © 2021 Atypon Systems LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { hash } from 'bcrypt'

import { PrismaClient, UserRole } from '../generated'
import doc1 from './doc1.json'

const prisma = new PrismaClient()

const DEFAULT_USERS = [
  {
    email: `quarterback+ADMIN@atypon.com`,
    firstname: 'Edna',
    lastname: 'Admin',
    role: UserRole.ADMIN,
  },
  {
    email: `quarterback+USER@atypon.com`,
    firstname: 'John',
    lastname: 'Smith',
    role: UserRole.USER,
  },
]

const DEFAULT_DOCS = [
  {
    name: 'Example doc 1',
    doc: doc1,
  },
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
    data: DEFAULT_DOCS.map((d) => ({ ...d, user_id: userId })),
  })
}

async function main() {
  const password = await hash('asdfasdf', 10)
  const users = await Promise.all(DEFAULT_USERS.map((user) => insertUser(user, password)))
  const docs = await Promise.all(users.map((user) => insertPmDocs(user.id)))
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
