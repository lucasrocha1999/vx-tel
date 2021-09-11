const { MissingParamError, InvalidParamError } = require('../../utils/errors')

module.exports = class CalculatorUseCase {
  constructor ({ loadPriceTableRepository, loadPlanTableRepository } = {}) {
    this.loadPriceTableRepository = loadPriceTableRepository
    this.loadPlanTableRepository = loadPlanTableRepository
  }

  async calculate ({cityCodeOrigin, cityCodeDestination, callTime, plan}) {
    if (!cityCodeOrigin)
      throw new MissingParamError('cityCodeOrigin')
    if (!cityCodeDestination)
      throw new MissingParamError('cityCodeDestination')
    if (!callTime)
      throw new MissingParamError('callTime')
    if (!plan)
      throw new MissingParamError('plan')

    const percentage = 1.1
    let withSpeakMore = 0
    let noSpeakMore = 0

    const { valor } = await this.loadPriceTableRepository.load(cityCodeOrigin, cityCodeDestination)
    if (!valor)
      throw new InvalidParamError('cityCodeOrigin/cityCodeDestination')
    const { tempo } = await this.loadPlanTableRepository.load(plan)
    if (!tempo)
      throw new InvalidParamError('plan')

    if (parseInt(callTime) <= tempo) {
      noSpeakMore = valor * callTime
    } else {
      const overflow = parseInt(callTime) - tempo
      withSpeakMore = (valor * overflow) * percentage
      noSpeakMore = valor * parseInt(callTime)
    }

    return { withSpeakMore, noSpeakMore }
  }
}
