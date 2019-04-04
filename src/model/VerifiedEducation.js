import Validatable from 'model/Validatable'
import schema from 'model/schema/VerifiedEducationModelSchema'

function VerifiedEducationModel (placeOfStudy, uri, name, qualificationTitles, status, children) {
  this.placeOfStudy = placeOfStudy
  this.uri = uri
  this.name = name
  this.qualificationTitles = qualificationTitles
  this.status = status
  this.children = children
}

VerifiedEducationModel.prototype = Object.create(Validatable.prototype)
VerifiedEducationModel.constructor = VerifiedEducationModel

function VerifiedEducation ({ placeOfStudy, uri, name, qualificationTitles, status, children }) {
  const obj = new VerifiedEducationModel(placeOfStudy, uri, name, qualificationTitles, status, children)
  obj.validate(schema)
  return obj
}

export default VerifiedEducation
