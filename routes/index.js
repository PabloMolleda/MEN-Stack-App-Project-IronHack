module.exports = app => {
  app.use('/', require('./base.routes.js'))
  app.use('/', require('./user.routes.js'))
  app.use('/', require('./auth.routes.js'))
  app.use('/company', require('./company-services.routes.js'))
  app.use('/personal', require('./personal-services.routes.js'))
  app.use('/personal/legal/vehicle-agreement', require('./vehicle-agreement.routes.js'))
  app.use('/company/hr/payroll', require('./payroll.routes.js'))
  app.use('/company/hr/employment-agreement', require('./employ-agreement.routes.js'))
  app.use('/company/business/invoice', require('./invoice.routes.js'))
}

