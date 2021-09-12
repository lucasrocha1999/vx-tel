const MongoHelper = require('../helpers/mongo-helper')
const MissingParamError = require('../../utils/errors/missing-param-error')
const LoadValueTableRepository = require('./load-value-table-repository')
const env = require('../../main/config/env')
let valueModel

const makeSut = () => {
  return new LoadValueTableRepository()
}

describe('LoadValueTableRepository Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
    valueModel = await MongoHelper.getCollection('ListaValores')
  })

  beforeEach(async () => {
    await valueModel.deleteMany()
    await valueModel.insertOne({
      origem: '011',
      destino: '017',
      valor: 1.7
    })
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return the value when the entered cityCodeOrigin/cityCodeDestination is valid', async () => {
    const sut = makeSut()
    const res = await sut.load('011', '017')
    expect(res.valor).toBe(1.7)
  })
  test('Should throw if no params CityCodeOrigin is not provided', async () => {
    const sut = makeSut()
    expect(sut.load()).rejects.toThrow(new MissingParamError('cityCodeOrigin'))
  })
  test('Should throw if no params cityCodeDestination is not provided', async () => {
    const sut = makeSut()
    expect(sut.load('011')).rejects.toThrow(new MissingParamError('cityCodeDestination'))
  })
})
