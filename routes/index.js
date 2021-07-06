module.exports = app => {
  app.use('/', require('./base.routes.js'))
  app.use('/personal-services', require('./personal-services.routes.js'))
  app.use('/company-services', require('./company-services.routes.js'))
  app.use('/personal-services/legal/vehicle-agreement', require('./vehicle-agreement.routes.js'))
  app.use('/company-services/hr/payroll', require('./payroll.routes.js'))
  app.use('/company-services/hr/new-hire-agreement', require('./new-hire.routes.js'))
  app.use('/company-services/business/invoice', require('./invoice.routes.js'))
  app.use('/', require('./auth.routes.js'))
  //   app.use('/user', require('./user.routes.js'))
}