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
import {
  ListedComment,
  Event,
  ICreateCommentRequest,
  IUpdateCommentRequest,
} from '@manuscripts/quarterback-shared'

import { CustomError, log, prisma } from '$common'
import { Comment } from '@manuscripts/quarterback-db'

export const commentService = {
  async listComments(docId: string): Promise<Event<ListedComment[]>> {
    const found = await prisma.comment.findMany({
      where: {
        doc_id: docId,
      },
      select: {
        id: true,
        body: true,
        createdAt: true,
        change_id: true,
        user_id: true,
        doc_id: true,
        snapshot_id: true,
        user: {
          select: {
            firstname: true,
          },
        },
      },
    })
    return { ok: true, data: found }
  },
  async createComment(payload: ICreateCommentRequest, userId: string): Promise<Event<Comment>> {
    const saved = await prisma.comment.create({
      data: {
        ...payload,
        user_id: userId,
      },
    })
    return { ok: true, data: saved }
  },
  // TODO check permissions
  async updateComment(commentId: string, payload: IUpdateCommentRequest): Promise<Event<Comment>> {
    const saved = await prisma.comment.update({
      data: payload,
      where: {
        id: commentId,
      },
    })
    return { ok: true, data: saved }
  },
  // TODO check permissions
  async deleteComment(commentId: string): Promise<Event<Comment>> {
    const saved = await prisma.comment.delete({
      where: {
        id: commentId,
      },
    })
    return { ok: true, data: saved }
  },
}
