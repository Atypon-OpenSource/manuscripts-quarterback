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
import { Router } from 'express'

import { authenticate, validateBody } from '$middlewares'

import * as authCtrl from './routes/auth/auth.ctrl'
import * as commentCtrl from './routes/comment/comment.ctrl'
import * as docCtrl from './routes/doc/doc.ctrl'
import * as reviewCtrl from './routes/review/review.ctrl'
import * as snapCtrl from './routes/snapshot/snap.ctrl'

const router = Router()

router.post('/login', authCtrl.login)

router.get('/docs', authenticate, docCtrl.listDocuments)
router.get('/doc/:documentId', authenticate, docCtrl.getDocument)
router.post('/doc', authenticate, docCtrl.createDocument)
router.put('/doc/:documentId', authenticate, docCtrl.updateDocument)
router.delete('/doc/:documentId', authenticate, docCtrl.deleteDocument)
router.get('/doc/:documentId/open', authenticate, docCtrl.openDocument)

router.get('/doc/:documentId/snapshot/labels', authenticate, snapCtrl.listSnapshotLabels)
router.get('/snapshot/:snapshotId', authenticate, snapCtrl.getSnapshot)
router.put('/snapshot/:snapshotId', authenticate, snapCtrl.updateSnapshot)
router.delete('/snapshot/:snapshotId', authenticate, snapCtrl.deleteSnapshot)
router.post('/snapshot', authenticate, snapCtrl.saveSnapshot)

router.get('/doc/:documentId/comments', authenticate, commentCtrl.listComments)
router.post('/comment', authenticate, commentCtrl.createComment)
router.put('/comment/:commentId', authenticate, commentCtrl.updateComment)
router.delete('/comment/:commentId', authenticate, commentCtrl.deleteComment)

router.get('/doc/:documentId/reviews', authenticate, reviewCtrl.listReviews)
router.get('/review/:reviewId', authenticate, reviewCtrl.getReview)
router.post('/doc/:documentId/review', authenticate, reviewCtrl.createReview)
router.post('/doc/:documentId/review/:reviewId/finish', authenticate, reviewCtrl.finishReview)
router.delete('/doc/:documentId/review/:reviewId', authenticate, reviewCtrl.deleteReview)

export default router
