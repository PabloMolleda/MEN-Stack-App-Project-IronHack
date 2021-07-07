const router = require("express").Router()
const VehicleAgreement = require('../models/Vehicle-agreement.model')
const { checkLoggedUser, checkCompanyOrAdmin } = require('../middleware')

router.get('/', (req, res) => res.render('selling-vehicle-agree/index'))


router.get('/create', checkLoggedUser, checkCompanyOrAdmin, (req, res) => res.render('selling-vehicle-agree/new-agreement'))


router.post('/create', checkLoggedUser, checkCompanyOrAdmin, (req, res) => {

  const { purchasePrice, agreementDate } = req.body

  const vehicleInfo = { year, status, model, plate, conditions } = req.body
  const address = { street, buildingNumber, zipCode, city, country } = req.body
  const subject = { name, lastName, personalId, address } = req.body


  VehicleAgreement
    .create({ purchasePrice, vehicleInfo, subject, agreementDate })
    .then(() => res.redirect('/personal/legal/vehicle-agreement/list'))
    .catch(err => console.log('An error has ocurred when creating a new agreement', err))
})


router.get('/list', checkLoggedUser, checkCompanyOrAdmin, (req, res) => {

  VehicleAgreement
    .find()
    .then(agreements => res.render('selling-vehicle-agree/agree-list', { agreements }))
    .catch(err => console.log('An error has ocurred when listing all agrements', err))
})


router.get('/preview/:agreementID', checkLoggedUser, checkCompanyOrAdmin, (req, res) => {

  const { agreementID } = req.params

  VehicleAgreement
    .findById(agreementID)
    .populate('user')
    .then(agreement => {
      res.render('selling-vehicle-agree/agree-preview', agreement)
      console.log(agreement)
    })
    .catch(err => console.log('An error has ocurred when previewing agreement details', err))
})


router.get('/delete', checkLoggedUser, checkCompanyOrAdmin, (req, res) => {

  const { agreement_ID } = req.query

  VehicleAgreement
    .findByIdAndRemove(agreement_ID)
    .then(() => res.redirect('/personal/legal/vehicle-agreement/list'))
    .catch(err => console.log('An error has ocurred when deleting an agreement', err))
})


router.get('/edit', checkLoggedUser, checkCompanyOrAdmin, (req, res) => {

  const { agreement_ID } = req.query

  console.log(req.query)

  VehicleAgreement
    .findById(agreement_ID)
    .then(agreement => res.render('selling-vehicle-agree/edit-agree', agreement))
    .catch(err => console.log('An error has ocurred when showing agreement details', err))

})


router.post('/edit', checkLoggedUser, checkCompanyOrAdmin, (req, res) => {

  const { agreement_ID } = req.query
  const { purchasePrice, agreementDate } = req.body
  const vehicleInfo = { year, status, model, plate, conditions } = req.body
  const address = { street, buildingNumber, zipCode, city, country } = req.body
  const subject = { name, lastName, personalId, address } = req.body

  VehicleAgreement
    .findByIdAndUpdate(agreement_ID, { purchasePrice, vehicleInfo, subject, agreementDate })
    .then(() => res.redirect('/personal/legal/vehicle-agreement/list'))
    .catch(err => console.log('An has ocurred when editing an agreement', err))
})


module.exports = router
