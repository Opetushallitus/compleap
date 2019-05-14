import React, { useContext, useRef } from 'react'
import PropTypes from 'prop-types'
import { Context } from 'state/state'
import useTranslation from 'component/generic/hook/useTranslation'
import { H1 } from 'ui/typography'
import TopicList from 'component/interests/topic-list/TopicList'
import { countSelectedInterests } from 'util/recommendationsHelper'
import useObservable from 'component/generic/hook/useObservable'
import Notification from 'component/interests/notification/Notification'
import InterestCountMessage from 'component/interests/notification/InterestCountMessage'

const Interests = () => {
  const t = useTranslation()
  const context$ = useContext(Context)
  const box = useRef(null)

  const interests$ = context$.map(({ context }) => context.interests.data)
  const numSelectedInterests$ = countSelectedInterests(interests$)
  const numSelectedInterests = useObservable(numSelectedInterests$)

  return (
    <div ref={box}>
      <H1>{t`Kiinnostukset`}</H1>
      <TopicList/>
      <Notification box={box} offset={250}>
        <InterestCountMessage numSelectedInterests={numSelectedInterests}/>
      </Notification>
    </div>
  )
}

Interests.propTypes = {
  initialSuggestions: PropTypes.object
}

export default Interests
