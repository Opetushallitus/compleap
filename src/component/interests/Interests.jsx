import React from 'react'
import PropTypes from 'prop-types'
import t from 'util/translate'
import { H1 } from 'ui/typography'
import TopicList from 'component/interests/topic-list/TopicList'

const Interests = () => (
  <React.Fragment>
    <H1>{t`Kiinnostukset`}</H1>
    <TopicList/>
  </React.Fragment>
)

Interests.propTypes = {
  initialSuggestions: PropTypes.object
}

export default Interests
