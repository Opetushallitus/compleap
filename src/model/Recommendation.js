import * as R from 'ramda'
import Validatable from 'model/Validatable'
import schema from 'model/schema/RecommendationModelSchema'
import { snakeCaseToCamelCase } from 'util/conversion'

function RecommendationModel () {}

RecommendationModel.prototype = Object.create(Validatable.prototype)
RecommendationModel.constructor = RecommendationModel

const unwrapArray = arr => arr[0]

function Recommendation (data) {
  const obj = new RecommendationModel()
  Object.entries(data).forEach(([k, v]) => { obj[snakeCaseToCamelCase(k)] = v })
  obj.validate(schema)

  // TODO Remove this transformation when incoming data is deduped (eliminating the arrays at source)
  return R.mapObjIndexed((v, k) => {
    const needsTransformation = [
      'applicationEnd',
      'applicationName',
      'applicationOnGoing',
      'applicationStart'
    ]

    if (needsTransformation.includes(k)) return unwrapArray(v)
    return v
  }, obj)
}

export default Recommendation
