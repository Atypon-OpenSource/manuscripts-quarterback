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
import { forwardRef } from 'react'

interface IProps {
  className?: string
  value?: string | number
  id?: string
  name?: string
  autoComplete?: 'on' | 'off'
  step?: number
  type?: 'email' | 'password' | 'text' | 'number' | 'search' | 'textarea'
  icon?: React.ReactNode
  iconPadding?: string
  fullWidth?: boolean
  disabled?: boolean
  placeholder?: string
  title?: string
  required?: boolean
  onChange?: (value: string) => void // Basically one of: string | file (numbers are strings)
  onFocus?: () => void
  onBlur?: () => void
  onKeyPress?: (e: React.KeyboardEvent) => void
}

export const Input = forwardRef((props: IProps, ref?: React.Ref<any>) => {
  const {
    className = '',
    value,
    type,
    id,
    name,
    autoComplete,
    step,
    icon,
    placeholder,
    disabled,
    required,
    title,
    onChange,
    onFocus,
    onBlur,
    onKeyPress,
  } = props

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    if (!disabled && onChange) {
      onChange(event.target.value)
    }
  }
  return (
    <div
      className={`${className} flex items-center relative border border-gray-400 rounded bg-gray-100
        w-72 focus-within:ring focus-within:ring-blue-200`}
    >
      <span className="pl-2 pr-1 w-max">{icon}</span>
      <input
        className="w-full p-1 bg-transparent rounded outline-none"
        ref={ref}
        value={value}
        type={type}
        id={id}
        name={name}
        step={step}
        autoComplete={autoComplete}
        placeholder={placeholder}
        title={title}
        disabled={disabled}
        required={required}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyPress={onKeyPress}
      />
    </div>
  )
})

Input.defaultProps = {
  autoComplete: 'off',
  required: false,
  type: 'text',
  disabled: false,
}
