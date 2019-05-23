import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as R from 'ramda'

const Paragraph = styled.p`
  margin: 0.75rem 0;
`

const splitIntoParagraphs = text => {
  const splits = text.split(/(\.)([^. )])/)
  return splits.reduce((res, v, i) => {
    if (i === 0) return R.append(v, res)
    if (v === '.') return R.adjust(res.length - 1, x => x + v, res)
    if (v.length === 1) return R.append(v, res)
    if (R.last(res).length === 1) return R.adjust(res.length - 1, x => x + v, res)
    return v
  }, [])
}

const Description = ({ text }) => splitIntoParagraphs(text).map((v, i) => <Paragraph key={i}>{v}</Paragraph>)

Description.propTypes = {
  text: PropTypes.string.isRequired
}

export default Description
