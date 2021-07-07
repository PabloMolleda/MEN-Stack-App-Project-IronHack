module.exports = app => {
  app.use('/', require('./base.routes.js'))
  app.use('/personal-services', require('./personal-services.routes.js'))
  app.use('/company-services', require('./company-services.routes.js'))
  app.use('/personal-services/legal/vehicle-agreement-buying', require('./vehicle-agreement-buying.routes.js'))
  app.use('/personal-services/legal/vehicle-agreement-selling', require('./vehicle-agreement-selling.routes.js'))
  app.use('/company-services/hr/payroll', require('./payroll.routes.js'))
  app.use('/company-services/hr/new-hire-agreement', require('./new-hire.routes.js'))
  app.use('/company-services/business/invoice', require('./invoice.routes.js'))
  app.use('/', require('./auth.routes.js'))
  app.use('/', require('./user.routes.js'))
}

