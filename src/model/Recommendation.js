import Validatable from 'model/Validatable'
import schema from 'model/schema/RecommendationModelSchema'
import { snakeCaseToCamelCase } from 'util/conversion'

function RecommendationModel () {}

RecommendationModel.prototype = Object.create(Validatable.prototype)
RecommendationModel.constructor = RecommendationModel

function Recommendation (data) {
  const obj = new RecommendationModel()
  Object.entries(data).forEach(([k, v]) => { obj[snakeCaseToCamelCase(k)] = v })
  obj.validate(schema)
  return obj
}

export default Recommendation
