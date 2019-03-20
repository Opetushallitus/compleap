import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Interest from 'component/interests/Interest'
import { Context } from 'state/state'
import useObservable from 'component/generic/hook/useObservable'
import t from 'util/translate'
import { H2, H3 } from 'ui/typography'

const TopicList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
`

const Interests = () => {
  const context$ = useContext(Context)
  const status = useObservable(context$, { path: ['value', 'profile', 'interests'] })
  const interests = useObservable(context$, { path: ['context', 'interests', 'data'] })

  if (status === 'pending') return <div>{'loading'}</div>
  if (status === 'failure') return <div>{'error'}</div>

  return (
    <React.Fragment>
      <H2>{t`Kiinnostukset`}</H2>
      <p>
        {t(
          'Valitse mahdollisimman tarkasti mitkä allaolevista asioista sinua kiinnostavat. ' +
          'Mitä tarkemmin valitset, sitä tarkemmin pystymme etsimään sinulle sopivia koulutuksia.'
        )}
      </p>
      <H3>{t`Valitse seuraavista ainakin 5 sinua kiinnostavaa asiaa`}</H3>
      <TopicList>
        {interests.map(v => (
          <li key={v.topic}>
            <Interest interest={v}/>
          </li>
        ))}
      </TopicList>
    </React.Fragment>
  )
}

Interests.propTypes = {
  initialSuggestions: PropTypes.object
}

export default Interests
