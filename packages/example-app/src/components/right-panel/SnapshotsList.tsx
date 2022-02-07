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
import { YjsExtension, YjsExtensionState, YjsSnapshot } from '@manuscripts/ext-yjs'
import React, { useMemo, useState } from 'react'
import { FiChevronDown, FiChevronRight } from 'react-icons/fi'
import styled from 'styled-components'

interface IProps {
  className?: string
  yjsState?: YjsExtensionState
  yjsStore?: YjsExtension['store']
}

export function SnapshotsList(props: IProps) {
  const { className, yjsState, yjsStore } = props
  const [isVisible, setIsVisible] = useState(true)
  const snapshots = useMemo(() => yjsState?.snapshots || [], [yjsState])
  const selectedSnapshot = useMemo(() => yjsState?.selectedSnapshot, [yjsState])

  function handleInspectSnapshot(snap: YjsSnapshot) {
    yjsStore?.inspectSnapshot(snap)
  }
  function handleResumeEditing() {
    yjsStore?.resumeEditing()
  }
  function handleDeleteSnapshot(snap: YjsSnapshot) {
    yjsStore?.deleteSnapshot(snap)
  }
  return (
    <>
      <Header>
        <button onClick={() => setIsVisible(!isVisible)} className="header-btn">
          <span>{isVisible ? <FiChevronDown size={16} /> : <FiChevronRight size={16} />}</span>
          <Title>Snapshots</Title>
        </button>
        <button
          className={`inspect-btn ${selectedSnapshot ? '' : 'hidden'}`}
          onClick={() => handleResumeEditing()}
        >
          Stop inspecting
        </button>
      </Header>
      <List className={`${className} ${isVisible ? '' : 'hidden'}`}>
        {snapshots.map((snap: YjsSnapshot, i: number) => (
          <SnapListItem key={`${snap.id}`}>
            <TitleWrapper>
              <h4>Snapshot {i + 1}</h4>
              <Buttons>
                <button onClick={() => handleInspectSnapshot(snap)}>Inspect</button>
                <button onClick={() => handleDeleteSnapshot(snap)}>Delete</button>
              </Buttons>
            </TitleWrapper>
            <small>{new Date(snap.date).toLocaleString()}</small>
          </SnapListItem>
        ))}
      </List>
    </>
  )
}

const Header = styled.div`
  align-items: center;
  display: flex;
  margin: 1rem 0 0.5rem 0;
  & > .header-btn {
    align-items: center;
    background: transparent;
    border: 0;
    cursor: pointer;
    display: flex;
    margin: 0;
    padding: 0;
  }
  & > .inspect-btn {
    margin-left: 1rem;
  }
  .hidden {
    display: none;
    visibility: hidden;
  }
`
const Title = styled.h3`
  font-size: 1rem;
  font-weight: 400;
  margin: 0 0 0 0.5rem;
  text-transform: uppercase;
`
const List = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  max-height: 300px;
  overflow-y: scroll;
  padding: 0;
  &.hidden {
    display: none;
    visibility: hidden;
  }
  & > li:nth-child(odd) {
    background: #f3f3f3;
  }
`
const SnapListItem = styled.li`
  border-radius: 2px;
  padding: 0.25rem;
`
const TitleWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  & > h4 {
    margin: 0;
    margin-right: 1rem;
  }
`
const Buttons = styled.div`
  display: flex;
  margin: 0.25rem 0;
  button + button {
    margin-left: 0.5rem;
  }
`
