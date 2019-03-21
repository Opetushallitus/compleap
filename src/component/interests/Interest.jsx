import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { dispatch } from 'state/state'
import { InteractionEvent } from 'state/events'
import { rounded } from 'ui/properties'

const TopicBubble = styled.button`
  ${rounded};

  display: inline-block;
  background: ${({ theme, hasParent }) => hasParent ? theme.color.accentLightest : theme.color.white};
  border-style: solid;
  border-width: ${({ theme, hasParent }) => hasParent ? '2px' : '3px'};
  border-color: ${({ theme, hasParent, selected }) =>
    selected
      ? hasParent ? theme.color.accentDarker : theme.color.accent
      : hasParent ? 'transparent' : theme.color.grayLighter};
  cursor: pointer;
  font-size: ${({ theme }) => theme.font.size.base};
  padding: 0.5rem 1rem;
  margin: 0.5rem 0.25rem;
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
