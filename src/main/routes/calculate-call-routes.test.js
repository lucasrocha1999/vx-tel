const request = require('supertest')
const env = require('../config/env')
const app = require('../config/app')
const MongoHelper = require('../../infra/helpers/mongo-helper')
let valueModel, planModel

describe('Calculator Routes', () => {
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

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return 200 when the plan informed is valid', async () => {
    await request(app)
      .post('/api/calculate-call')
      .send({
        cityCodeOrigin: '011',
        cityCodeDestination: '017',
        callTime: 30,
        plan: 'FaleMais 30'
      })
      .expect(200)
  })

  test('Should return 500 when the plan informed is invalid', async () => {
    await request(app)
      .post('/api/calculate-call')
      .send({
        cityCodeOrigin: '011',
        cityCodeDestination: '017',
        callTime: 30,
        plan: 'FaleMais 0'
      })
      .expect(500)
  })

  test('Should return 500 when the cityCodeOrigin/cityCodeDestination informed is invalid', async () => {
    await request(app)
      .post('/api/calculate-call')
      .send({
        cityCodeOrigin: '0',
        cityCodeDestination: '0',
        callTime: 30,
        plan: 'FaleMais 30'
      })
      .expect(500)
  })
})
