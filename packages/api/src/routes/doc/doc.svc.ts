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
import { Event, PmDoc } from '@manuscripts/quarterback-shared'

import { CustomError, prisma } from '$common'

export const docService = {
  async getDocuments(userId: string): Promise<Event<PmDoc[]>> {
    const found = await prisma.pmDoc.findMany({
      where: {
        user_id: userId,
      },
    })
    return { ok: true, data: found }
  },
}
