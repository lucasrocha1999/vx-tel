const MissingParamError = require('../../utils/errors/missing-param-error')
const MongoHelper = require('../helpers/mongo-helper')


module.exports = class LoadPriceTableRepository {
  async load (cityCodeOrigin, cityCodeDestination,) {
    if (!cityCodeOrigin) {
      throw new MissingParamError('cityCodeOrigin')
    }
    if (!cityCodeDestination) {
      throw new MissingParamError('cityCodeDestination')
    }
    const priceModel = await MongoHelper.getCollection('ListaValores')
    const valor = await priceModel.find({ 
      origem: cityCodeOrigin,
      destino: cityCodeDestination
    }, {  
      projection: {
        _id: 0,
        valor: 1
      }
    }).toArray()
    return valor[0]
  }
}