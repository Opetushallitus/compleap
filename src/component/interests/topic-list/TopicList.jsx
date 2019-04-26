import React, { useContext } from 'react'
import styled from 'styled-components'
import useTranslation from 'component/generic/hook/useTranslation'
import { H2 } from 'ui/typography'
import Interest from 'component/interests/interest/Interest'
import useObservable from 'component/generic/hook/useObservable'
import { Context } from 'state/state'
import Placeholder from 'component/interests/topic-list/Placeholder'

const StyledTagList = styled.ul`
  width: 100%; // Required for IE to prevent overflow
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
`

/**
 * Use 'display: contents' for modern browsers (to flatten the topic and subtopic lists).
 * Fall back to wrapped flex list with IE and Edge.
 */
const TopicListItem = styled.li`
  display: flex;
  flex-wrap: wrap;
  display: contents;
`

const TopicList = () => {
  const context$ = useContext(Context)
  const t = useTranslation()
  const interests = useObservable(context$, { path: ['context', 'interests', 'data'] })
  const status = useObservable(context$, { path: ['value', 'profile', 'interests'] })

  if (status === 'pending') return <Placeholder/>
  if (status === 'failure') return <div>{'error'}</div>

  return (
    <React.Fragment>
      <p>
        {t(
          'Valitse mahdollisimman tarkasti mitkä allaolevista asioista sinua kiinnostavat. ' +
          'Mitä tarkemmin valitset, sitä tarkemmin pystymme etsimään sinulle sopivia koulutuksia.'
        )}
      </p>
      <H2>{t`Valitse seuraavista ainakin 5 sinua kiinnostavaa asiaa`}</H2>
      <StyledTagList>
        {interests.map(v => (
          <TopicListItem key={v.id}>
            <Interest interest={v}/>
          </TopicListItem>
        ))}
      </StyledTagList>
    </React.Fragment>
  )
}

export default TopicList
