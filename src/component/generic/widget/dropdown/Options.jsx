import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { bordered, roundedRectangle } from 'ui/properties'

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
  
  &:hover {
    background-color: ${({ theme }) => theme.color.grayLightest};
  }
`

const Options = ({ options, onSelect }) => (
  <Container>
    <ResultsPane>
      <ResultsList>
        {options.map(({ id, label }) => (
          <Result
            key={id}
            onClick={() => onSelect(id)}
            onMouseDown={event => event.preventDefault()}
          >
            {label}
          </Result>
        ))}
      </ResultsList>
    </ResultsPane>
  </Container>
)

Options.propTypes = {
  options: PropTypes.array,
  onSelect: PropTypes.func.isRequired
}

export default Options
