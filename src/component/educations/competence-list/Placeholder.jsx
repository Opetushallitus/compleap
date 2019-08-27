import React from 'react'
import styled from 'styled-components'
import * as R from 'ramda'
import { chipButtonBase } from 'ui/properties'

const List = styled.ul`
  list-style: none;
  padding: 0;
`

const ListItem = styled.li`
  display: inline-block;
`

const PlaceholderTag = styled.button`
  ${chipButtonBase};

  border: solid 2px ${({ theme }) => theme.color.grayLightest};
  background-color: ${({ theme }) => theme.color.white};
  min-height: 1rem;
  line-height: 1rem;
  padding: 0.3rem 4rem 0.3rem 1rem;
  margin: 0.2rem;
`

const Content = styled.div.attrs(({ width }) => ({ style: { width } }))``

const Placeholder = () => (
  <List>
    {R.range(0, 45).map(v => (
      <ListItem key={v}>
        <PlaceholderTag>
          <Content width={`${Math.random() * 6}rem`}/>
        </PlaceholderTag>
      </ListItem>
    ))}
  </List>
)

export default Placeholder
