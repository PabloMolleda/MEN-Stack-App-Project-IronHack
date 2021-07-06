const router = require("express").Router()
const VehicleAgreement = require('./../models/vehicle-agreement.model')

router.get('/', (req, res) => res.render('selling-vehicle-agree/index'))

router.get('/create', (req, res) => res.render('selling-vehicle-agree/new-agreement'))

router.post('/create', (req, res) => {

  const { purchasePrice, year, status, model, plate, conditions, name, lastName,
    personalId, street, buildingNumber, zipCode, city, country, agreementDate } = req.body

  const vehicleInfo = { year, status, model, plate, conditions }
  const address = { street, buildingNumber, zipCode, city, country }
  const subject = { name, lastName, personalId, address }

  console.log(req.body)

  VehicleAgreement
    .create({ purchasePrice, vehicleInfo, subject, agreementDate })
    .then(() => res.redirect('/personal-services/legal/vehicle-agreement-selling/list'))
    .catch(err => console.log('An error has ocurred when creating a new agreement', err))
})

router.get('/list', (req, res) => {

  VehicleAgreement
    .find()
    .then(agreements => res.render('selling-vehicle-agree/agree-list', { agreements }))
    .catch(err => console.log('An error has ocurred when listing all agrements', err))
})

router.get('/preview/:agreementID', (req, res) => {

  const { agreementID } = req.params

  VehicleAgreement
    .findById(agreementID)
    .populate('user')
    .then(agreement => res.render('selling-vehicle-agree/agree-preview', agreement))
    .catch(err => console.log('An error has ocurred when previewing agreement details', err))
})

router.get('/delete/:agreementID', (req, res) => res.render('selling-vehicle-agree/agree-list'))

router.post('/delete/:agreementID', (req, res) => {

  const { agreementID } = req.params

  VehicleAgreement
    .findByIdAndRemove(agreementID)
    .then(() => res.redirect('/personal-services/legal/vehicle-agreement-selling/list'))
    .catch(err => console.log('An error has ocurred when deleting an agreement', err))
})

router.get('/edit/:agreementID', (req, res) => {

  const { agreementID } = req.params

  console.log(req.params)

  VehicleAgreement
    .findById(agreementID)
    .then(agreement => res.render('selling-vehicle-agree/edit-agree', agreement))
    .catch(err => console.log('An error has ocurred when showing agreement details', err))

})



router.post('/edit/:agreementID', (req, res) => {

  const { agreementID } = req.params
  const { purchasePrice, year, status, model, plate, conditions, name, lastName,
    personalId, street, buildingNumber, zipCode, city, country, agreementDate } = req.body

    console.log(req.body, req.params)

  const vehicleInfo = { year, status, model, plate, conditions }
  const address = { street, buildingNumber, zipCode, city, country }
  const subject = { name, lastName, personalId, address }

  VehicleAgreement
    .findByIdAndUpdate(agreementID, { purchasePrice, vehicleInfo, subject, agreementDate })
    .then(() => res.redirect('/personal-services/legal/vehicle-agreement-selling/list'))
    .catch(err => console.log('An has ocurred when editing an agreement', err))
})

module.exports = router
