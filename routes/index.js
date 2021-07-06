module.exports = app => {
  app.use('/', require('./base.routes.js'))
  //   app.use('/services', require('./services.routes.js'))
  app.use('/services/legal/vehicle-agreement', require('./vehicle-agreement.routes.js'))
  app.use('/services/hr/payroll', require('./payroll.routes.js'))
  app.use('/services/hr/new-hire-agreement', require('./new-hire.routes.js'))
  app.use('/services/business/invoice', require('./invoice.routes.js'))
  app.use('/', require('./auth.routes.js'))
  //   app.use('/user', require('./user.routes.js'))
}