const CalculateCall = require('./calculate-call-router')
const { MissingParamError, InvalidParamError } = require('../../utils/errors')
const { ServerError } = require('../errors')

const makeSut = () => {
  const calculatorUseCaseSpy = makeCalculatorUseCase()
  const planValidatorSpy = makePlanValidator()
  const sut = new CalculateCall({
    calculatorUseCase: calculatorUseCaseSpy,
    planValidator: planValidatorSpy
  })
  return {
    sut,
    calculatorUseCaseSpy,
    planValidatorSpy
  }
}

const makePlanValidator = () => {
  class PlanValidatorSpy {
    isValid (plan) {
      this.plan = plan
      return this.isPlanValid
    }
  }
  const planValidatorSpy = new PlanValidatorSpy()
  planValidatorSpy.isPlanValid = true
  return planValidatorSpy
}

const makeCalculatorUseCase = () => {
  class CalculatorUseCaseSpy {
    async calculate ({ cityCodeOrigin, cityCodeDestination, callTime, plan }) {
      this.cityCodeOrigin = cityCodeOrigin
      this.cityCodeDestination = cityCodeDestination
      this.callTime = callTime
      this.plan = plan
      return {
        withSpeakMore: 0,
        noSpeakMore: 51
      }
    }
  }
  const calculatorUseCaseSpy = new CalculatorUseCaseSpy()
  return calculatorUseCaseSpy
}

describe('Calculator Router', () => {
  test('Should return 400 if no cityCodeOrigin is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        cityCodeDestination: '017',
        callTime: 30,
        plan: 'FaleMais 30'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('cityCodeOrigin').message)
  })
  test('Should return 400 if no cityCodeDestination is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        cityCodeOrigin: '011',
        callTime: 30,
        plan: 'FaleMais 30'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('cityCodeDestination').message)
  })
  test('Should return 400 if no callTime is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        cityCodeOrigin: '011',
        cityCodeDestination: '017',
        plan: 'FaleMais 30'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('callTime').message)
  })
  test('Should return 400 if no plan is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        cityCodeOrigin: '011',
        cityCodeDestination: '017',
        callTime: 30
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('plan').message)
  })
  test('Should call PlanValidator with correct plan', async () => {
    const { sut, planValidatorSpy } = makeSut()
    const httpRequest = {
      body: {
        cityCodeOrigin: '011',
        cityCodeDestination: '017',
        callTime: 30,
        plan: 'FaleMais 30'
      }
    }
    await sut.route(httpRequest)
    expect(planValidatorSpy.plan).toBe(httpRequest.body.plan)
  })
  test('Should call CalculatorUseCase with correct params', async () => {
    const { sut, calculatorUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        cityCodeOrigin: '011',
        cityCodeDestination: '017',
        callTime: 30,
        plan: 'FaleMais 30'
      }
    }
    await sut.route(httpRequest)
    expect(calculatorUseCaseSpy.cityCodeOrigin).toBe(httpRequest.body.cityCodeOrigin)
    expect(calculatorUseCaseSpy.cityCodeDestination).toBe(httpRequest.body.cityCodeDestination)
    expect(calculatorUseCaseSpy.callTime).toBe(httpRequest.body.callTime)
    expect(calculatorUseCaseSpy.plan).toBe(httpRequest.body.plan)
  })
  test('Should return 500 if the plan is not valid', async () => {
    const { sut, planValidatorSpy } = makeSut()
    planValidatorSpy.isPlanValid = false
    const httpRequest = {
      body: {
        cityCodeOrigin: '011',
        cityCodeDestination: '017',
        callTime: 30,
        plan: 'invalid_plan'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new InvalidParamError('plan').message)
  })
  test('Should return 500 if no httpRequest is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('Should return 500 if httpRequest has no body', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route({})
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })
})
