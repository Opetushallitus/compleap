import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { dispatch } from 'state/state'
import { InteractionEvent } from 'state/events'
import { rounded } from 'ui/properties'
import Remove from 'resources/asset/remove.svg'
import theme from 'ui/theme'

const ChipTag = styled.div`
  ${rounded};

  position: relative;
  display: inline-block;
  background: ${({ theme }) => theme.color.white};
  border-style: solid;
  border-width: 2px;
  border-color: ${({ theme }) => theme.color.grayLighter};
  box-shadow: ${({ theme }) => `0 5px 10px 2px ${theme.color.grayLightest}`};
  height: 1rem;
  line-height: 1rem;
  padding: 0.3rem 2.5rem 0.3rem 1rem;
  
  &:focus {
    outline: 0;
  }
`

const ChipRemoveButton = styled.button`
  position: absolute;
  box-sizing: content-box;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  padding: 2px;
  top: -2px;
  right: -2px;
  border: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.color.grayLighter};
  
  &:hover {
    background-color: ${({ theme }) => theme.color.gray};
  }
  
  &:focus {
    outline: none;
  }
`

const Tag = ({ id, name }) => (
  <ChipTag>
    {name}
    <ChipRemoveButton
      onClick={() => dispatch({ type: InteractionEvent.REMOVE_RECOMMENDATION_LOCATION_FILTER, data: { id } })}
    >
      <Remove style={{
        height: '1.6rem',
        stroke: theme.color.white,
        strokeWidth: 2
      }}/>
    </ChipRemoveButton>
  </ChipTag>
)

Tag.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

export default Tag
