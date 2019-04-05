import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import B from 'baconjs'
import Options from 'component/generic/widget/dropdown/Options'
import Input from 'component/generic/widget/dropdown/Input'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
`

const useInputFilter = (inputBusRef, filterFn, onInputChange, onResultChange) => useEffect(() => {
  const inputBus = new B.Bus()
  inputBusRef.current = inputBus
  const resultStream = inputBus.map(filterFn)

  const subscriptions = [
    inputBus.onValue(onInputChange),
    resultStream.onValue(onResultChange)
  ]

  return () => subscriptions.forEach(unsubscribe => unsubscribe())
})

const Select = ({ placeholder, options, onSelect, selectedId, locale = 'fi-FI' }) => {
  const [rawInput, setRawInput] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [filteredOptions, setFilteredOptions] = useState(options)

  const inputFieldRef = useRef()
  const inputBusRef = useRef()

  const resetInput = () => inputBusRef.current && inputBusRef.current.push('')
  const closeOptions = () => inputFieldRef.current && inputFieldRef.current.blur()

  const onInputFocus = () => {
    resetInput()
    setIsFocused(true)
  }

  const onInputBlur = () => {
    resetInput()
    setIsFocused(false)
  }

  const selectOption = id => {
    onSelect(id)
    resetInput()
    closeOptions()
  }

  const doFilter = input =>
    options.filter(({ label }) =>
      label.toLocaleLowerCase(locale).includes(input.toLocaleLowerCase(locale)))

  useInputFilter(inputBusRef, doFilter, setRawInput, setFilteredOptions)

  const selectedOption = options.find(({ id }) => id === selectedId)
  const selectedLabel = selectedOption ? selectedOption.label : ''

  return (
    <Container>
      <Input
        ref={inputFieldRef}
        placeholder={placeholder}
        value={isFocused ? rawInput : selectedLabel}
        onChange={({ target }) => inputBusRef.current.push(target.value)}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
      />
      {isFocused && (
        <Options
          options={filteredOptions}
          onSelect={selectOption}
          onEscape={() => inputFieldRef.current.blur()}
        />
      )}
    </Container>
  )
}

Select.propTypes = {
  placeholder: PropTypes.string,
  options: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedId: PropTypes.string.isRequired,
  locale: PropTypes.string
}

export default Select
