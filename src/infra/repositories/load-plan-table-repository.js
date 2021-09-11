const MissingParamError = require('../../utils/errors/missing-param-error')
const MongoHelper = require('../helpers/mongo-helper')


module.exports = class LoadPlanTableRepository {
  async load (plan) {
    if (!plan) {
      throw new MissingParamError('plan')
    }
    const planModel = await MongoHelper.getCollection('FaleMais')
    const time = await planModel.find({
      plano: plan,
    }, {  
      projection: {
        _id: 0,
        tempo: 1
      }
    }).toArray()
    return time[0]
  }
}