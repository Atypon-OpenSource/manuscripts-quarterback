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

// import { Intent } from '../types/theme'

interface IProps {
  children?: React.ReactNode
  className?: string
  // intent?: Intent
  type?: 'button' | 'submit' | 'reset' | 'link'
  disabled?: boolean
  href?: string
  loading?: boolean
  fullWidth?: boolean
  onClick?: () => void
}

export function Button(props: IProps) {
  const { className, children, onClick, type, disabled, loading, href } = props

  function handleClick(e: React.MouseEvent) {
    return !disabled && onClick && onClick()
  }
  return (
    <>
      {type === 'link' ? (
        <a
          className={`${className} px-4 py-2 mt-5 leading-tight text-white bg-red-500 rounded`}
          onClick={onClick}
          type={type}
          href={href}
        >
          {children}
        </a>
      ) : (
        <button
          className={`${className} px-4 py-2 mt-5 leading-tight text-white bg-red-500 rounded`}
          onClick={handleClick}
          type={type}
          disabled={disabled}
        >
          {children}
        </button>
      )}
    </>
  )
}

// export const Button = styled(ButtonEl)<IProps>`
//   align-items: center;
//   background-color: ${({ theme, intent }) => getIntentColor(theme, intent)};
//   border: 1px solid ${({ theme, intent }) => intent !== 'transparent' ? theme.color.textDark : 'transparent'};
//   border-radius: 4px;
//   color: ${({ intent, theme }) => getIntentTextColor(theme, intent)};
//   cursor: pointer;
//   display: flex;
//   font-size: ${({ theme }) => theme.fontSize.medium};
//   justify-content: center;
//   line-height: 1.1;
//   min-height: calc(2rem + 5px); // Scaled to the size of m-sized Spinner inside Button
//   min-width: 100px;
//   padding: 0.5rem 1.5rem;
//   text-decoration: none;
//   transition: 0.2s all;
//   width: ${({ fullWidth }) => fullWidth ? '100%' : ''};
//   &:hover {
//     background: ${({ theme, intent }) => intent === 'transparent' && theme.color.gray.lightest};
//     box-shadow: ${({ intent }) => intent !== 'transparent' && '0 0 2px 2px #039be569'};
//   }
//   &:disabled {
//     box-shadow: none;
//     color: rgba(34, 34, 34, 0.4);
//     cursor: default;
//   }
// `

Button.defaultProps = {
  intent: 'primary',
  fullWidth: false,
  type: 'button',
  disabled: false,
  loading: false,
}
