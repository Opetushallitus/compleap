import { resolveApplicationStatus } from './recommendationsHelper'

describe('Resolving application status', () => {
  it('succeeds for valid ongoing application', () => {
    const data = {
      'document': 'test',
      'applicationOnGoing': true,
      'applicationStart': null,
      'applicationEnd': null
    }

    return expect(resolveApplicationStatus(data)).toEqual({
      message: 'Haku käynnissä'
    })
  })

  it('succeeds for valid ongoing application with explicit start time', () => {
    const data = {
      'document': 'test',
      'applicationOnGoing': true,
      'applicationStart': 1538994179986,
      'applicationEnd': null
    }

    return expect(resolveApplicationStatus(data)).toEqual({
      message: 'Haku käynnissä'
    })
  })

  it('succeeds for valid ongoing application with explicit start and end times', () => {
    const today = new Date()
    const end = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())

    const data = {
      'document': 'test',
      'applicationOnGoing': true,
      'applicationStart': 1538994179986,
      'applicationEnd': end
    }

    return expect(resolveApplicationStatus(data)).toEqual({
      message: 'Haku käynnissä'
    })
  })

  it('succeeds for valid ended application with explicit start and end dates', () => {
    const data = {
      'document': 'test',
      'applicationOnGoing': false,
      'applicationStart': 1538994179986,
      'applicationEnd': 1556620447719
    }

    return expect(resolveApplicationStatus(data)).toEqual({
      message: 'Haku päättynyt'
    })
  })

  it('succeeds for stale data', () => {
    const data = {
      'document': 'test',
      'applicationOnGoing': true,
      'applicationStart': 1538994179986,
      'applicationEnd': 1556620447719
    }

    return expect(resolveApplicationStatus(data)).toEqual({
      message: 'Haku päättynyt'
    })
  })

  it('succeeds for valid future application', () => {
    const today = new Date()
    const start = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())
    const end = new Date(today.getFullYear() + 2, today.getMonth(), today.getDate())

    const data = {
      'document': 'test',
      'applicationOnGoing': false,
      'applicationStart': start.valueOf(),
      'applicationEnd': end.valueOf()
    }

    return expect(resolveApplicationStatus(data)).toEqual({
      message: 'Haku alkaa',
      parameter: start
    })
  })

  it('succeeds for future application with mismatching data', () => {
    const today = new Date()
    const start = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())

    const data = {
      'document': 'test',
      'applicationOnGoing': true,
      'applicationStart': start,
      'applicationEnd': null
    }

    return expect(resolveApplicationStatus(data)).toEqual({
      message: 'Haku alkaa',
      parameter: start
    })
  })

  it('succeeds for ongoing application with mismatching data', () => {
    const today = new Date()
    const end = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())

    const data = {
      'document': 'test',
      'applicationOnGoing': false,
      'applicationStart': 1538994179986,
      'applicationEnd': end
    }

    return expect(resolveApplicationStatus(data)).toEqual({
      message: 'Haku käynnissä',
    })
  })

  it('reverts to empty message when data in inconclusive', () => {
    const data = {
      'document': 'test',
      'applicationOnGoing': null,
      'applicationStart': null,
      'applicationEnd': null
    }

    return expect(resolveApplicationStatus(data)).toEqual({
      message: ''
    })
  })
})
