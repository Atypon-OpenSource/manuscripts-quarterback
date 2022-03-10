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
import { ILoginParams, ISignUpParams, User } from '@manuscripts/quarterback-shared'
import { compare, hash } from 'bcrypt'

import { CustomError, prisma } from '$common'

export const authService = {
  loginUser: async ({ email, password }: ILoginParams): Promise<User> => {
    const user = await prisma.user.findFirst({ where: { email } })
    if (!user) {
      throw new CustomError('No User Found', 401)
    }

    const isValid = await compare(password, user.password)
    if (!isValid) {
      throw new CustomError('Wrong Password', 401)
    }

    // @ts-ignore
    delete user.password
    return user
  },
}
