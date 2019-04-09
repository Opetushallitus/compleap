import React, { useContext } from 'react'
import styled from 'styled-components'
import t from 'util/translate'
import { H2 } from 'ui/typography'
import Interest from 'component/interests/interest/Interest'
import useObservable from 'component/generic/hook/useObservable'
import { Context } from 'state/state'
import Placeholder from 'component/interests/topic-list/Placeholder'

const StyledTagList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
`

const TopicListItem = styled.li`
  display: contents;
`

const TopicList = () => {
  const context$ = useContext(Context)
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
          <TopicListItem key={v.topic}>
            <Interest interest={v}/>
          </TopicListItem>
        ))}
      </StyledTagList>
    </React.Fragment>
  )
}

export default TopicList
