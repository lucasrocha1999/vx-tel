const { InvalidParamError } = require('../../utils/errors')

module.exports = class CalculatorUseCase {
  constructor ({ loadValueTableRepository, loadPlanTableRepository } = {}) {
    this.loadValueTableRepository = loadValueTableRepository
    this.loadPlanTableRepository = loadPlanTableRepository
  }

  async calculate ({ cityCodeOrigin, cityCodeDestination, callTime, plan }) {
    const percentage = 1.1
    let withSpeakMore = 0
    let noSpeakMore = 0

    const responseValue = await this.loadValueTableRepository.load(cityCodeOrigin, cityCodeDestination)
    if (!responseValue) {
      throw new InvalidParamError('cityCodeOrigin/cityCodeDestination')
    }

    const reposnsePlan = await this.loadPlanTableRepository.load(plan)

    const { valor } = responseValue
    const { tempo } = reposnsePlan
    if (parseInt(callTime) <= tempo) {
      noSpeakMore = valor * callTime
    }
    if (parseInt(callTime) > tempo) {
      const overflow = parseInt(callTime) - tempo
      withSpeakMore = (valor * overflow) * percentage
      noSpeakMore = valor * parseInt(callTime)
    }

    return { withSpeakMore, noSpeakMore }
  }
}
