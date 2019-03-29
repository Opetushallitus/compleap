import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Interest from 'component/interests/interest/Interest'
import { Context } from 'state/state'
import useObservable from 'component/generic/hook/useObservable'
import t from 'util/translate'
import { H1, H2 } from 'ui/typography'

const TopicList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
`

const TopicListItem = styled.li`
  display: contents;
`

const Interests = () => {
  const context$ = useContext(Context)
  const status = useObservable(context$, { path: ['value', 'profile', 'interests'] })
  const interests = useObservable(context$, { path: ['context', 'interests', 'data'] })

  if (status === 'pending') return <div>{'loading'}</div>
  if (status === 'failure') return <div>{'error'}</div>

  return (
    <React.Fragment>
      <H1>{t`Kiinnostukset`}</H1>
      <p>
        {t(
          'Valitse mahdollisimman tarkasti mitkä allaolevista asioista sinua kiinnostavat. ' +
          'Mitä tarkemmin valitset, sitä tarkemmin pystymme etsimään sinulle sopivia koulutuksia.'
        )}
      </p>
      <H2>{t`Valitse seuraavista ainakin 5 sinua kiinnostavaa asiaa`}</H2>
      <TopicList>
        {interests.map(v => (
          <TopicListItem key={v.topic}>
            <Interest interest={v}/>
          </TopicListItem>
        ))}
      </TopicList>
    </React.Fragment>
  )
}

Interests.propTypes = {
  initialSuggestions: PropTypes.object
}

export default Interests
