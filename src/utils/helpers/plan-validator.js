const MissingParamError = require('../errors/missing-param-error')

module.exports = class PlanValidator {
  constructor ({ loadPlanTableRepository } = {}) {
    this.loadPlanTableRepository = loadPlanTableRepository
  }
  async isValid (plan) {
    if (!plan) {
      throw new MissingParamError('plan')
    }
    const checkIsValid = await this.loadPlanTableRepository.load(plan)
    return !!checkIsValid
  }
}
