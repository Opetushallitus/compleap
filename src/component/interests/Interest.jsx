import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { dispatch } from 'state/state'
import { InteractionEvent } from 'state/events'

const TopicBubble = styled.button`
  display: inline-block;
  width: 5rem;
  height: 5rem;
  padding: 0;
  margin: 0.5rem;
  background: ${({ theme, selected, hasParent }) =>
    selected ? theme.color.background.accent : hasParent ? theme.color.gray : theme.color.white};
  border: solid 1px ${({ theme, hasParent }) => hasParent ? 'transparent' : theme.color.black};
  border-radius: 50%;
  cursor: pointer;
`

const SubtopicList = styled.ul`
  display: inline-flex;
  flex-wrap: wrap;
  vertical-align: top;
  padding: 0;
`

const SubtopicListItem = styled.li`
  display: inline-block;
`

const Interest = ({ interest, parentId }) => (
  <React.Fragment>
    <TopicBubble
      value={interest.topic}
      selected={interest.selected}
      hasParent={!!parentId}
      onClick={() => dispatch({ type: InteractionEvent.TOGGLE_INTEREST, data: { id: interest.id, parentId } })}
    >
      {interest.topic}
    </TopicBubble>

    {interest.selected && interest.subtopics && (
      <SubtopicList>
        {interest.subtopics.map(s => (
          <SubtopicListItem key={s.topic}>
            <Interest interest={s} parentId={interest.id}/>
          </SubtopicListItem>
        ))}
      </SubtopicList>
    )}
  </React.Fragment>
)

Interest.propTypes = {
  interest: PropTypes.object,
  parentId: PropTypes.string
}

export default Interest
