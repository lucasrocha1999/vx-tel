const CalculateCall = require('../../presentation/routers/calculate-call-router')
const CalculatorUseCase = require('../../domain/usecases/calculator-usecase')
const LoadPriceTableRepository = require('../../infra/repositories/load-price-table-repository')
const LoadPlanTableRepository = require('../../infra/repositories/load-plan-table-repository')
const PlanValidator = require('../../utils/helpers/plan-validator')

module.exports = class CalculateRouterComposer {
  static compose () {
    const loadPriceTableRepository = new LoadPriceTableRepository()
    const loadPlanTableRepository = new LoadPlanTableRepository()
    const planValidator = new PlanValidator({ loadPlanTableRepository })
    const calculatorUseCase = new CalculatorUseCase({
      loadPriceTableRepository,
      loadPlanTableRepository
    })
    return new CalculateCall({
      calculatorUseCase,
      planValidator
    })
  }
}
