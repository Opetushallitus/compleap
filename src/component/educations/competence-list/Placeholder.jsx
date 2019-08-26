import React from 'react'
import styled from 'styled-components'
import * as R from 'ramda'
import CompetenceTag from './fragment/CompetenceTag'

const List = styled.ul`
  list-style: none;
  padding: 0;
`

const ListItem = styled.li`
  display: inline-block;
  margin: 0.5rem;
`

const Content = styled.div.attrs(({ width }) => ({ style: { width } }))``

const Placeholder = () => (
  <List>
    {R.range(0, 45).map(v => (
      <ListItem key={v}>
        <CompetenceTag disabled={true}>
          <Content width={`${Math.random() * 6}rem`}/>
        </CompetenceTag>
      </ListItem>
    ))}
  </List>
)

export default Placeholder
