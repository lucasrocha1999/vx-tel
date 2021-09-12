const MongoHelper = require('../helpers/mongo-helper')
const MissingParamError = require('../../utils/errors/missing-param-error')
const LoadPlanTableRepository = require('./load-plan-table-repository')
const env = require('../../main/config/env')
let planModel

const makeSut = () => {
  return new LoadPlanTableRepository()
}

describe('LoadPlanTableRepository Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
    planModel = await MongoHelper.getCollection('FaleMais')
  })

  beforeEach(async () => {
    await planModel.deleteMany()
    await planModel.insertOne({
      plano: 'FaleMais 30',
      tempo: 30
    })
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return time when the plan informed is valid', async () => {
    const sut = makeSut()
    const res = await sut.load('FaleMais 30')
    expect(res.tempo).toBe(30)
  })

  test('Should throw if no params are provided', async () => {
    const sut = makeSut()
    expect(sut.load()).rejects.toThrow(new MissingParamError('plan'))
  })
})
