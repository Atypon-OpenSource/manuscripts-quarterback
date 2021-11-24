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
import * as docCtrl from './routes/doc/doc.ctrl'

const router = Router()

router.post('/login', authCtrl.login)

router.get('/docs', authenticate, docCtrl.getDocuments)

export default router
