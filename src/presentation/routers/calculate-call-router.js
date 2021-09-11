const HttpResponse = require('../helpers/http-response')
const { MissingParamError, InvalidParamError } = require('../../utils/errors')

module.exports = class CalculateCall {
  constructor ({ calculatorUseCase } = {}) {
    this.calculatorUseCase = calculatorUseCase
  }

  async route (httpRequest) {
    try {
      const { cityCodeOrigin, cityCodeDestination, callTime, plan } = httpRequest.body
      // [TO-DO] - check if the plan is valid
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
