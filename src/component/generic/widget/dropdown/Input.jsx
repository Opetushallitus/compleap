import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { bordered } from 'ui/properties'
import TextInput from 'component/generic/widget/TextInput'

const InputContainer = styled.div`
  position: relative;
`

const IconContainer = styled.div`
  ${bordered};

  box-sizing: border-box;
  border-left: none;
  margin: 0;
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  width: 2.5rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.white};
`

const TriangleIcon = styled.svg`
  width: 0.75rem;
  height: 0.75rem;
  fill: ${({ theme }) => theme.color.secondaryLighter};
  
  &:hover {
    fill: ${({ theme }) => theme.color.secondaryDarker};
  }
`

const Input = React.forwardRef(({ placeholder, value, onChange, onFocus, onBlur }, ref) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <InputContainer>
      <TextInput
        type='text'
        placeholder={placeholder}
        ref={ref}
        value={value}
        onChange={onChange}
        onFocus={event => {
          setIsFocused(true)
          onFocus(event)
        }}
        onBlur={event => {
          setIsFocused(false)
          onBlur(event)
        }}
      />
      {!isFocused &&
      <IconContainer onClick={() => ref.current.focus()}>
        <TriangleIcon viewBox='0 0 100 50'>
          <polygon
            points='50,50 0,0 100,0'
          />
        </TriangleIcon>
      </IconContainer>
      }
    </InputContainer>
  )
})

Input.displayName = 'Input'

Input.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
}

export default Input
