const CalculateCall = require('../../presentation/routers/calculate-call-router')
const CalculatorUseCase = require('../../domain/usecases/calculator-usecase')
const LoadValueTableRepository = require('../../infra/repositories/load-value-table-repository')
const LoadPlanTableRepository = require('../../infra/repositories/load-plan-table-repository')
const PlanValidator = require('../../utils/helpers/plan-validator')

module.exports = class CalculateRouterComposer {
  static compose () {
    const loadValueTableRepository = new LoadValueTableRepository()
    const loadPlanTableRepository = new LoadPlanTableRepository()
    const planValidator = new PlanValidator({ loadPlanTableRepository })
    const calculatorUseCase = new CalculatorUseCase({
      loadValueTableRepository,
      loadPlanTableRepository
    })
    return new CalculateCall({
      calculatorUseCase,
      planValidator
    })
  }
}
