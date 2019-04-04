import { validateModel } from 'state/validate/validate'

function Validatable () { }
Validatable.prototype.validate = function (schema) { validateModel(this, schema) }

export default Validatable
