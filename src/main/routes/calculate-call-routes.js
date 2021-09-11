const { adapt } = require('../adapters/express-router-adapter')
const CalculateRouterComposer = require('../composers/calculate-call-router-composer')

module.exports = router => {
  router.post('/calculate-call', adapt(CalculateRouterComposer.compose()))
}
