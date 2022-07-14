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
import React from 'react'
import { FiCornerUpLeft } from 'react-icons/fi'
import styled from 'styled-components'

interface Props {
  className?: string
  onReplyClick: () => void
}

const CommentActions: React.FC<Props> = (props) => {
  const {
    className = '',
    onReplyClick: onClick
  } = props
  return (
    <Container className={className}>
      <div></div>
      <Button onClick={onClick}>
        <FiCornerUpLeft size={16} />
      </Button>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`
const Button = styled.button`
  background: transparent;
  border: 0;
  cursor: pointer;
  margin: 0;
  padding: 0;
  &:hover {
    opacity: 0.7;
  }
`
export default styled(CommentActions)``
