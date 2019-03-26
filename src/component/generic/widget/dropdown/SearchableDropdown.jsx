import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import B from 'baconjs'
import { dispatch } from 'state/state'
import { InteractionEvent } from 'state/events'
import Options from 'component/generic/widget/dropdown/Options'
import Input from 'component/generic/widget/dropdown/Input'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
`

const SearchableDropdown = ({ placeholder, options, selectedId, locale = 'fi-FI' }) => {
  const [rawInput, setRawInput] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [filteredOptions, setFilteredOptions] = useState(options)

  const inputFieldRef = useRef()
  const inputBusRef = useRef()

  useEffect(() => {
    const inputBus = new B.Bus()
    inputBusRef.current = inputBus
    const resultStream = inputBus.map(doFilter)

    const subscriptions = [
      inputBus.onValue(setRawInput),
      resultStream.onValue(setFilteredOptions)
    ]

    return () => subscriptions.forEach(unsubscribe => unsubscribe())
  })

  const doFilter = input =>
    options.filter(({ label }) =>
      label.toLocaleLowerCase(locale).includes(input.toLocaleLowerCase(locale)))

  const onInputFocus = () => {
    inputBusRef.current.push('')
    setIsFocused(true)
  }

  const onInputBlur = () => {
    inputBusRef.current.push('')
    setIsFocused(false)
  }

  const onSelectOption = id => {
    dispatch({ type: InteractionEvent.SELECT_EDUCATION_SPECIFIER, data: { id } })
    inputBusRef.current.push('')
    inputFieldRef.current.blur()
  }

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
      {isFocused && <Options options={filteredOptions} onSelect={onSelectOption}/>}
    </Container>
  )
}

SearchableDropdown.propTypes = {
  placeholder: PropTypes.string,
  options: PropTypes.array,
  selectedId: PropTypes.string.isRequired,
  locale: PropTypes.string
}

export default SearchableDropdown
