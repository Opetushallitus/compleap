import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { dispatch } from 'state/state'
import { InteractionEvent } from 'state/events'
import Chip from 'component/generic/widget/Chip'
import useTranslation from 'component/generic/hook/useTranslation'

/**
 * Use 'display: contents' for modern browsers (to flatten the topic and subtopic lists).
 * Fall back to wrapped flex list with IE and Edge.
 */
const SubtopicList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  display: contents;
  list-style: none;
  vertical-align: top;
  padding: 0;
`

const SubtopicListItem = styled.li`
  display: contents;
`

const Interest = ({ interest, parentId }) => {
  const t = useTranslation()
  return (
    <React.Fragment>
      <Chip
        value={t(interest.topic)}
        selected={interest.selected}
        type={!parentId ? 'primary' : 'secondary'}
        onClick={() => dispatch({ type: InteractionEvent.TOGGLE_INTEREST, data: { id: interest.id, parentId } })}
      >
        {t(interest.topic)}
      </Chip>

      {interest.selected && interest.subtopics && (
        <SubtopicList>
          {interest.subtopics.map(s => (
            <SubtopicListItem key={s.id}>
              <Interest interest={s} parentId={interest.id}/>
            </SubtopicListItem>
          ))}
        </SubtopicList>
      )}
    </React.Fragment>
  )
}

Interest.propTypes = {
  interest: PropTypes.object,
  parentId: PropTypes.string
}

export default Interest
