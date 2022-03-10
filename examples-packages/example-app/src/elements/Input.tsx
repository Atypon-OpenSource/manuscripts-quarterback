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
import React, { forwardRef } from 'react'
import styled from 'styled-components'

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

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (!disabled && onChange) {
      onChange(event.target.value)
    }
  }
  return (
    <Container className={`${className}`}>
      <IconWrapper>{icon}</IconWrapper>
      <StyledInput
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
    </Container>
  )
})

Input.defaultProps = {
  autoComplete: 'off',
  required: false,
  type: 'text',
  disabled: false,
}

const Container = styled.div`
  align-items: center;
  border: 1px solid #747474;
  border-radius: 4px;
  display: flex;
  &:focus-within {
    box-shadow: 0 0 0 2px rgba(80, 0, 255, 0.2);
  }
`
const IconWrapper = styled.span`
  padding: 0 0.25rem 0 0.5rem;
  width: max-content;
`
const StyledInput = styled.input`
  background: transparent;
  border: 0;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  font-size: 14px;
  outline: none;
  padding: 0.5rem;
  width: 100%;
`
