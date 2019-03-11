import React from 'react'
import PropTypes from 'prop-types'
import Button from 'component/generic/widget/Button'
import { dispatch } from 'state/state'

const Interest = ({ interest, parentId }) => {
  return (
    <React.Fragment>
      <Button value={interest.topic} onClick={event => dispatch({ type: 'TOGGLE', data: { id: interest.id, parentId } })}>
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
