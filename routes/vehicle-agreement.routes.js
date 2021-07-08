const router = require("express").Router()
const VehicleAgreement = require('../models/Vehicle-agreement.model')
const { checkLoggedUser, checkPersonalOrAdmin } = require('../middleware')

router.get('/', (req, res) => res.render('vehicle-agree/index'))


router.get('/create', checkLoggedUser, checkPersonalOrAdmin, (req, res) => res.render('vehicle-agree/new-agreement'))


router.post('/create', checkLoggedUser, checkPersonalOrAdmin, (req, res) => {

  const { purchasePrice, agreementDate, street, buildingNumber,
    zipCode, city, country, name, lastName, personalId, typeOfAgreement } = req.body

  const vehicleInfo = { year, status, model, plate, conditions } = req.body
  const address = { street, buildingNumber, zipCode, city, country }
  const subject = { name, lastName, personalId, address }
  const user = req.session.currentUser._id

  VehicleAgreement
    .create({ purchasePrice, vehicleInfo, subject, agreementDate, typeOfAgreement, user })
    .then(() => { res.redirect('/personal/legal/vehicle-agreement/list') })
    .catch(err => console.log('An error has ocurred when creating a new agreement', err))
})


router.get('/list', checkLoggedUser, checkPersonalOrAdmin, (req, res) => {

  VehicleAgreement
    .find()
    .then(agreements => {
      res.render('vehicle-agree/agree-list', { agreements })
    })
    .catch(err => console.log('An error has ocurred when listing all agrements', err))

})


router.get('/preview/:agreementID', checkLoggedUser, checkPersonalOrAdmin, (req, res) => {

  const { agreementID } = req.params

  VehicleAgreement
    .findById(agreementID)
    .populate('user')
    .then(agreement => {
      agreement.typeOfAgreement === 'selling' ? res.render('vehicle-agree/selling-agree-preview', agreement) : res.render('vehicle-agree/buying-agree-preview', agreement)
    })
    .catch(err => console.log('An error has ocurred when previewing agreement details', err))
})


router.get('/delete', checkLoggedUser, checkPersonalOrAdmin, (req, res) => {

  const { agreement_ID } = req.query

  VehicleAgreement
    .findByIdAndRemove(agreement_ID)
    .then(() => res.redirect('/personal/legal/vehicle-agreement/list'))
    .catch(err => console.log('An error has ocurred when deleting an agreement', err))
})


router.get('/edit', checkLoggedUser, checkPersonalOrAdmin, (req, res) => {

  const { agreement_ID } = req.query

  VehicleAgreement
    .findById(agreement_ID)
    .then(agreement => res.render('selling-vehicle-agree/edit-agree', agreement))
    .catch(err => console.log('An error has ocurred when showing agreement details', err))

})


router.post('/edit', checkLoggedUser, checkPersonalOrAdmin, (req, res) => {

  const { agreement_ID } = req.query
  const { purchasePrice, agreementDate, street, buildingNumber,
    zipCode, city, country, name, lastName, personalId } = req.body

  const vehicleInfo = { year, status, model, plate, conditions } = req.body
  const address = { street, buildingNumber, zipCode, city, country }
  const subject = { name, lastName, personalId, address }

  VehicleAgreement
    .findByIdAndUpdate(agreement_ID, { purchasePrice, vehicleInfo, subject, agreementDate })
    .then(() => res.redirect('/personal/legal/vehicle-agreement/list'))
    .catch(err => console.log('An has ocurred when editing an agreement', err))
})


module.exports = router
