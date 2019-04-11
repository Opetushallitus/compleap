import React from 'react'
import PropTypes from 'prop-types'
import useTranslation from 'component/generic/hook/useTranslation'
import { H1 } from 'ui/typography'
import TopicList from 'component/interests/topic-list/TopicList'

const Interests = () => {
  const t = useTranslation()
  return (
    <React.Fragment>
      <H1>{t`Kiinnostukset`}</H1>
      <TopicList/>
    </React.Fragment>
  )
}

Interests.propTypes = {
  initialSuggestions: PropTypes.object
}

export default Interests
