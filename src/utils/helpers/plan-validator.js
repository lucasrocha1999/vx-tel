const MissingParamError = require('../errors/missing-param-error')

module.exports = class PlanValidator {
  isValid (plan) {
    if (!plan) {
      throw new MissingParamError('plan')
    }
    // [TO-DO] - check if the plan is valid
    return true
  }
}
