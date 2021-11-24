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
  activeNodesMarksPluginKey,
  ActiveNodesMarksState,
  commands,
  useEditorContext,
  usePluginState,
} from '@manuscripts/quarterback-editor'
import React from 'react'
import { FiAtSign, FiBold, FiEye, FiFileMinus, FiFilePlus, FiItalic } from 'react-icons/fi'
import { GrBlockQuote } from 'react-icons/gr'
import { MdViewWeek } from 'react-icons/md'
import styled from 'styled-components'

interface IProps {
  className?: string
}

type IconType =
  | 'bold'
  | 'italic'
  | 'toggle-blockquote'
  | 'update-attribute'
  | 'toggle-split-view'
  | 'toggle-track-changes'
  | 'set-inserted'
  | 'set-deleted'

const marksIcons: {
  title: IconType
  icon: React.ReactNode
}[] = [
  {
    title: 'bold',
    icon: <FiBold size={16} />,
  },
  {
    title: 'italic',
    icon: <FiItalic size={16} />,
  },
]

const commandIcons: {
  title: IconType
  icon: React.ReactNode
}[] = [
  {
    title: 'toggle-blockquote',
    icon: <GrBlockQuote size={16} />,
  },
  {
    title: 'update-attribute',
    icon: <FiAtSign size={16} />,
  },
  {
    title: 'toggle-split-view',
    icon: <MdViewWeek size={16} />,
  },
  {
    title: 'toggle-track-changes',
    icon: <FiEye size={16} />,
  },
  {
    title: 'set-inserted',
    icon: <FiFilePlus size={16} />,
  },
  {
    title: 'set-deleted',
    icon: <FiFileMinus size={16} />,
  },
]

export function Toolbar(props: IProps) {
  const { className } = props
  const { viewProvider } = useEditorContext()
  const activeNodesMarksPlugin = usePluginState<ActiveNodesMarksState>(activeNodesMarksPluginKey)

  function handleIconClick(title: IconType) {
    switch (title) {
      case 'bold':
        viewProvider?.execCommand(
          commands.baseCommands.toggleMark(viewProvider?.view.state.schema.marks.bold)
        )
        return
      case 'italic':
        viewProvider?.execCommand(
          commands.baseCommands.toggleMark(viewProvider?.view.state.schema.marks.italic)
        )
        return
      case 'toggle-blockquote':
        return
      case 'update-attribute':
        viewProvider?.execCommand(commands.trackCommands.addTrackedAttributesToBlockNode())
        return
      case 'toggle-split-view':
        return
      case 'toggle-track-changes':
        viewProvider?.execCommand(commands.trackCommands.toggleTrackChanges())
        return
      case 'set-inserted':
        viewProvider?.execCommand(commands.trackCommands.setInserted())
        return
      case 'set-deleted':
        viewProvider?.execCommand(commands.trackCommands.setDeleted())
        return
    }
  }
  return (
    <Container className={className}>
      <IconList>
        {marksIcons.map((item) => (
          <IconItem key={item.title}>
            <IconButton
              className={`${
                activeNodesMarksPlugin?.activeMarks.includes(item.title) ? 'active' : ''
              }`}
              onClick={() => handleIconClick(item.title)}
            >
              {item.icon}
            </IconButton>
          </IconItem>
        ))}
        {commandIcons.map((item) => (
          <IconItem key={item.title}>
            <IconButton onClick={() => handleIconClick(item.title)} aria-label={item.title}>
              {item.icon}
            </IconButton>
          </IconItem>
        ))}
      </IconList>
    </Container>
  )
}

const Container = styled.div`
  background: var(--color-primary-lighter);
  padding: 1rem;
`
const IconList = styled.div`
  align-items: center;
  color: #fff;
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`
const IconItem = styled.li`
  & + & {
    margin-left: 1rem;
  }
`
const IconButton = styled.button`
  align-items: center;
  background: transparent;
  border: 0;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  padding: 0.25rem;
  &:hover {
    background: rgba(255, 255, 255, 0.7);
    opacity: 0.7;
  }
  &.active {
    background: rgb(215 227 255);
    box-shadow: 0 0 2px 2px rgb(0 0 0 / 18%);
  }
`
