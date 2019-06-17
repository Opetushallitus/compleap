import Validatable from 'model/Validatable'
import schema from 'model/schema/CompetenceModelSchema'
import { snakeCaseToCamelCase } from 'util/conversion'

function CompetenceModel (conceptUri, preferredLabelEn, preferredLabelFi, unitUri) {
  this.conceptUri = conceptUri
  this.preferredLabelEn = preferredLabelEn
  this.preferredLabelFi = preferredLabelFi
  this.unitUri = unitUri
}

CompetenceModel.prototype = Object.create(Validatable.prototype)
CompetenceModel.constructor = CompetenceModel

function Competence (data) {
  const obj = new CompetenceModel()
  Object.entries(data).forEach(([k, v]) => { obj[snakeCaseToCamelCase(k)] = v })
  obj.validate(schema)
  return obj
}

export default Competence
