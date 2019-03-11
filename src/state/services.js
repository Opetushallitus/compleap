import interests from 'mock/interests'
import * as R from 'ramda'
import uuid from 'uuid/v4'
import { subtopicsLens } from 'state/helper'

// TODO: implement APIs
const getInterestSuggestions = () => Promise.resolve(
  interests
    .map(interest => R.assoc('id', uuid(), interest))
    .map(interest => R.assoc('selected', false, interest))
    .map(interest => R.over(subtopicsLens(),
      subtopics => subtopics
        .map(v => R.assoc('id', uuid(), v))
        .map(R.assoc('selected', false)),
      interest
    ))
)

export default {
  getInterestSuggestions
}
