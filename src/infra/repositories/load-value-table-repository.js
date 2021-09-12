const MissingParamError = require('../../utils/errors/missing-param-error')
const MongoHelper = require('../helpers/mongo-helper')

module.exports = class LoadValueTableRepository {
  async load (cityCodeOrigin, cityCodeDestination) {
    if (!cityCodeOrigin) {
      throw new MissingParamError('cityCodeOrigin')
    }
    if (!cityCodeDestination) {
      throw new MissingParamError('cityCodeDestination')
    }
    const valueModel = await MongoHelper.getCollection('ListaValores')
    const value = await valueModel.find({
      origem: cityCodeOrigin,
      destino: cityCodeDestination
    }, {
      projection: {
        _id: 0,
        valor: 1
      }
    }).toArray()
    return value[0]
  }
}
