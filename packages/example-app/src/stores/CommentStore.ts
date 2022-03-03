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
  CommentWithUserColor,
  ICreateCommentRequest,
  ICreateCommentResponse,
  IUpdateCommentRequest,
  UserWithColor,
} from '@manuscripts/quarterback-shared'
import * as commentApi from 'api/comment'
import { action, computed, makeObservable, observable, runInAction } from 'mobx'
import randomColor from 'randomcolor'

export class CommentStore {
  @observable commentsMap: Map<string, CommentWithUserColor> = new Map()
  @observable userColorsMap: Map<string, string> = new Map()
  @observable openCommentLists: Set<string> = new Set()
  STORAGE_KEY = 'comment-store'

  constructor() {
    makeObservable(this)
  }

  @computed get comments() {
    return Array.from(this.commentsMap.values())
  }

  @computed get changeComments() {
    const changeMap = new Map<string, CommentWithUserColor[]>()
    Array.from(this.commentsMap.values()).forEach((c) => {
      const prev = changeMap.get(c.change_id)
      if (prev) {
        changeMap.set(c.change_id, [...prev, c])
      } else {
        changeMap.set(c.change_id, [c])
      }
    })
    return changeMap
  }

  @action toggleCommentListOpen = (id: string) => {
    if (this.openCommentLists.has(id)) {
      this.openCommentLists.delete(id)
    } else {
      this.openCommentLists = this.openCommentLists.add(id)
    }
  }

  @action listComments = async (docId: string, user: UserWithColor) => {
    const resp = await commentApi.listComments(docId)
    if (!resp.ok) {
      console.error(resp.error)
    } else {
      runInAction(() => {
        this.userColorsMap = new Map([[user.id, user.color]])
        this.commentsMap = new Map(
          resp.data.comments.map((c) => {
            let color = this.userColorsMap.get(c.user_id)
            if (!color) {
              color = randomColor({
                luminosity: 'dark',
              })
              this.userColorsMap.set(c.user_id, color)
            }
            const comment: CommentWithUserColor = {
              ...c,
              user: {
                ...c.user,
                color,
              },
            }
            return [c.id, comment]
          })
        )
      })
    }
    return resp
  }

  @action createComment = async (payload: ICreateCommentRequest, user: UserWithColor) => {
    const resp = await commentApi.createComment(payload)
    if (!resp.ok) {
      console.error(resp.error)
    } else {
      runInAction(() => {
        if (!this.userColorsMap.has(user.id)) {
          this.userColorsMap.set(user.id, user.color)
        }
        this.commentsMap.set(resp.data.id, {
          ...resp.data,
          user: {
            firstname: user.firstname,
            color: user.color,
          },
        })
      })
    }
    return resp
  }

  @action updateComment = async (commentId: string, values: IUpdateCommentRequest) => {
    const resp = await commentApi.updateComment(commentId, values)
    if (!resp.ok) {
      console.error(resp.error)
    } else {
      runInAction(() => {
        const old = this.commentsMap.get(commentId)
        old && this.commentsMap.set(commentId, { ...old, ...values })
      })
    }
    return resp
  }

  @action deleteComment = async (snapId: string) => {
    const resp = await commentApi.deleteComment(snapId)
    if (!resp.ok) {
      console.error(resp.error)
    } else {
      runInAction(() => {
        this.commentsMap.delete(snapId)
      })
    }
    return resp
  }

  @action reset = () => {}
}
