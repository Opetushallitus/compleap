import React from 'react'
import PropTypes from 'prop-types'
import Button from 'component/generic/widget/Button'
import { dispatch } from 'state/state'
import { InteractionEvent } from 'state/events'

const Interest = ({ interest, parentId }) => {
  return (
    <React.Fragment>
      <Button
        value={interest.topic}
        onClick={() => dispatch({ type: InteractionEvent.TOGGLE_INTEREST, data: { id: interest.id, parentId } })}
      >
        {interest.topic + interest.selected}
      </Button>

      {interest.selected && interest.subtopics && (
        <ul>
          {interest.subtopics.map(s => (
            <li key={s.topic}>
              <Interest interest={s} parentId={interest.id}/>
            </li>
          ))}
        </ul>
      )}
    </React.Fragment>
  )
}

Interest.propTypes = {
  interest: PropTypes.object,
  parentId: PropTypes.string
}

export default Interest
