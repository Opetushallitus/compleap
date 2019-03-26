import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { bordered, roundedRectangle } from 'ui/properties'
import useKeyCommands from 'component/generic/hook/useKeyCommands'

const Container = styled.div`
  position: relative;
`

const ResultsPane = styled.div`
  ${roundedRectangle};
  ${bordered};

  box-sizing: border-box;
  width: 100%;
  max-width: 500px;
  position: absolute;
  background-color: ${({ theme }) => theme.color.white};
  padding: 0;
  max-height: 15rem;
  overflow-y: auto;
`

const ResultsList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`

const Result = styled.li`
  cursor: pointer;
  padding: 0.75rem;
  background-color: ${({ theme, focused }) => focused ? theme.color.grayLightest : 'transparent'};
`

const Options = ({ options, onSelect, onEscape }) => {
  const [focusedIndex, setFocusedIndex] = useState(0)

  const focusOption = index => setFocusedIndex(index)
  const selectOptionAtIndex = index => index !== undefined && options[index] && onSelect(options[index].id)

  useKeyCommands({
    onEscape,
    onEnter: () => selectOptionAtIndex(focusedIndex),
    onDown: () => {
      const nextIndex = focusedIndex + 1 >= options.length ? focusedIndex : focusedIndex + 1
      setFocusedIndex(nextIndex)
    },
    onUp: () => {
      const prevIndex = focusedIndex - 1 < 0 ? 0 : focusedIndex - 1
      setFocusedIndex(prevIndex)
    }
  })

  return (
    <Container>
      <ResultsPane>
        <ResultsList>
          {options.map(({ id, label }, i) => (
            <Result
              key={id}
              focused={focusedIndex === i}
              onClick={() => selectOptionAtIndex(i)}
              onMouseOver={() => focusOption(i)}
              onMouseDown={event => event.preventDefault()}
            >
              {label}
            </Result>
          ))}
        </ResultsList>
      </ResultsPane>
    </Container>
  )
}

Options.propTypes = {
  options: PropTypes.array,
  onSelect: PropTypes.func.isRequired,
  onEscape: PropTypes.func.isRequired
}

export default Options
