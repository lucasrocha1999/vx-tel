const HttpResponse = require('../helpers/http-response')
const { MissingParamError, InvalidParamError } = require('../../utils/errors')

module.exports = class CalculateCall {
  constructor ({ calculatorUseCase, planValidator } = {}) {
    this.calculatorUseCase = calculatorUseCase
    this.planValidator = planValidator
  }

  async route (httpRequest) {
    try {
      const { cityCodeOrigin, cityCodeDestination, callTime, plan } = httpRequest.body
      if (!cityCodeOrigin) {
        return HttpResponse.badRequest(new MissingParamError('cityCodeOrigin'))
      }
      if (!cityCodeDestination) {
        return HttpResponse.badRequest(new MissingParamError('cityCodeDestination'))
      }
      if (!callTime) {
        return HttpResponse.badRequest(new MissingParamError('callTime'))
      }
      if (!plan) {
        return HttpResponse.badRequest(new MissingParamError('plan'))
      }
      if (!this.planValidator.isValid(plan)) {
        return HttpResponse.badRequest(new InvalidParamError('plan'))
      }
      const { withSpeakMore, noSpeakMore } = await this.calculatorUseCase.calculate({
        cityCodeOrigin,
        cityCodeDestination,
        callTime,
        plan
      })
      return HttpResponse.ok({ withSpeakMore, noSpeakMore })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
