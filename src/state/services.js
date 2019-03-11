import uuid from 'uuid/v4'

// TODO: implement APIs
const getInterestSuggestions = () => Promise.resolve([{
  topic: 'TBD1',
  id: uuid(),
  selected: false,
  subtopics: [{
    topic: 'TBDx',
    id: uuid(),
    selected: false
  }, {
    topic: 'TBDy',
    id: uuid(),
    selected: false
  }]
}, {
  topic: 'TBD2',
  id: uuid(),
  selected: false,
  subtopics: [{
    topic: 'TBDa',
    id: uuid(),
    selected: false
  }, {
    topic: 'TBDb',
    id: uuid(),
    selected: false
  }]
}])

export default {
  getInterestSuggestions
}
