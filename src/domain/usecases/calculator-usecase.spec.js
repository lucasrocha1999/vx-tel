const LoadPlanTableRepository = require('../../infra/repositories/load-plan-table-repository')
const LoadValueTableRepository = require('../../infra/repositories/load-value-table-repository')
const { MissingParamError, InvalidParamError } = require('../../utils/errors')
const CalculatorUseCase = require('./calculator-usecase')
const MongoHelper = require('../../infra/helpers/mongo-helper')
const env = require('../../main/config/env')
let valueModel, planModel

const makeSut = () => {
  const loadValueTableRepositorySpy = new LoadValueTableRepository()
  const loadPlanTableRepositorySpy = new LoadPlanTableRepository()
  const sut = new CalculatorUseCase({
    loadValueTableRepository: loadValueTableRepositorySpy,
    loadPlanTableRepository: loadPlanTableRepositorySpy
  })
  return {
    sut,
    loadValueTableRepositorySpy,
    loadPlanTableRepositorySpy
  }
}

describe('Calculator UseCase', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
    valueModel = await MongoHelper.getCollection('ListaValores')
    planModel = await MongoHelper.getCollection('FaleMais')
  })

  beforeEach(async () => {
    await valueModel.deleteMany()
    await planModel.deleteMany()
    await valueModel.insertOne({
      origem: '011',
      destino: '017',
      valor: 1.7
    })
    await planModel.insertOne({
      plano: 'FaleMais 30',
      tempo: 30
    })
  })
  test('Should throw if no cityCodeOrigin/cityCodeDestination is provided', async () => {
    const { sut } = makeSut()
    const data = {
      cityCodeOrigin: 'invalid_param',
      cityCodeDestination: 'invalid_param',
      callTime: 20,
      plan: 'FaleMais 30'
    }
    const promise = sut.calculate(data)
    expect(promise).rejects.toThrow(new InvalidParamError('cityCodeOrigin/cityCodeDestination'))
  })
})
