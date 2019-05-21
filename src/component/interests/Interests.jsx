import React, { useContext, useRef } from 'react'
import PropTypes from 'prop-types'
import { Context } from 'state/state'
import useTranslation from 'component/generic/hook/useTranslation'
import { H1 } from 'ui/typography'
import TopicList from 'component/interests/topic-list/TopicList'
import { countSelectedInterests } from 'util/recommendationsHelper'
import useObservable from 'component/generic/hook/useObservable'
import Notification from 'component/interests/notification/Notification'
import InterestCountNotification from 'component/interests/notification/InterestCountNotification'

const Interests = () => {
  const t = useTranslation()
  const context$ = useContext(Context)
  const container = useRef(null)

  const interests$ = context$.map(({ context }) => context.interests.data)
  const numSelectedInterests$ = countSelectedInterests(interests$)
  const numSelectedInterests = useObservable(numSelectedInterests$)

  return (
    <div ref={container}>
      <H1>{t`Kiinnostukset`}</H1>
      <TopicList/>
      <Notification container={container} offsetTop={250} offsetBottom={100}>
        <InterestCountNotification numSelectedInterests={numSelectedInterests} container={container}/>
      </Notification>
    </div>
  )
}

Interests.propTypes = {
  initialSuggestions: PropTypes.object
}

export default Interests
