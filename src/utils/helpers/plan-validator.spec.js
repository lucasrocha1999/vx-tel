const MissingParamError = require('../errors/missing-param-error')
const PlanValidator = require('./plan-validator')

const makeSut = () => {
  return new PlanValidator()
}

describe('Plan Validator', () => {
  test('Should throw if no plan is provided', async () => {
    const sut = makeSut()
    expect(sut.isValid()).rejects.toThrow(new MissingParamError('plan'))
  })
})
