const router = require("express").Router()
const VehicleAgreement = require('./../models/Vehicle-agreement.model')
const PDFDocument = require('pdfkit')
const { checkLoggedUser, checkPersonalOrAdmin } = require('../middleware')

router.get('/', (req, res) => res.render('vehicle-agree/index'))


router.get('/create', checkLoggedUser, checkPersonalOrAdmin, (req, res) => res.render('vehicle-agree/new-agreement'))


router.post('/create', checkLoggedUser, checkPersonalOrAdmin, (req, res) => {

  const { purchasePrice, agreementDate, name, lastName, personalId, typeOfAgreement } = req.body

  const vehicleInfo = { year, status, model, plate, conditions } = req.body
  const address = { street, buildingNumber, zipCode, city, country } = req.body
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

router.get('/preview/print/:agreementID', checkLoggedUser, checkPersonalOrAdmin, (req, res) => {

  const { agreementID } = req.params

  VehicleAgreement
    .findById(agreementID)
    .populate('user')
    .then(agreement => {

      if (agreement.typeOfAgreement === 'selling') {

        const filename = `Receipt_whatever.pdf`;
        const doc = new PDFDocument({ bufferPages: true });
        const stream = res.writeHead(200, {
          'Content-Type': 'application/pdf',
          'Content-disposition': `attachment;filename=${filename}.pdf`,
        });
        doc.on('data', (chunk) => stream.write(chunk));
        doc.on('end', () => stream.end());

        doc.font('Times-Roman')
          .fontSize(12)
          .text(agreement)
        /*  .text(line)
         .moveDown()
         .text(line1)
         .moveDown()
         .text(line2)
         .moveDown()
         .text(line3)
         .moveDown()
         .text(line4)
         .moveDown()
         .text(line5)
         .moveDown()
         .text(line6)
         .moveDown()
         .text(line7)
         .moveDown()
         .text(line8)
         .moveDown()
         .text(line9)
         .moveDown()
         .text(line10)
         .moveDown()
         .text(line11)
         .moveDown()
         .text(line12)
         .moveDown()
         .text(line13)
         .moveDown()
         .text(line14)
         .moveDown()
         .text(line15)
         .moveDown()
         .text(line16)
         .moveDown()
         .text(line17)
         .moveDown()
         .text(line18)
         .moveDown()
         .text(line19)
         .moveDown()
         .text(line20)
         .moveDown()
         .text(line21)
         .moveDown()
*/

        doc.end()

        const line = 'JP & Co.'
        const line1 = 'VEHICLE BILL OF SALE'
        const line2 = `I,${subject.name} ${subject.lastName},in consideration of $ ${purchasePrice},do hereby sell, transfer and convey to
    ${user.name} ${user.lastname} ,the following vehicle:`
        const line3 = 'DESCRIPTION OF VEHICLE'
        const line4 = 'Year'
        const line5 = `${vehicleInfo.year}`
        const line6 = 'Status'
        const line7 = `${vehicleInfo.status[0]}`
        const line8 = 'Model'
        const line9 = `${vehicleInfo.model}`
        const line10 = 'Plate:'
        const line11 = `${vehicleInfo.plate}`
        const line12 = 'TERMS AND CONDITIONS (if applicable)'
        const line13 = `${vehicleInfo.conditions}`
        const line14 = 'SELLER'
        const line15 = `Name: ${subject.name} ${subject.lastName}`
        const line16 = `Address: ${subject.address.street},${subject.address.buildingNumber},${subject.address.zipCode},${subject.address.city},${subject.address.country}`
        const line17 = `Date:${agreementDate}`
        const line18 = 'BUYER'
        const line19 = `Name:${user.name} ${user.lastName}`
        const line20 = `Address:${user.address.street},${user.address.buildingNumber},${user.address.zipCode},${user.address.city},${user.address.country}`
        const line21 = `Date:${agreementDate}`



      } else {

        const filename = `Receipt_whatever.pdf`;
        const doc = new PDFDocument({ bufferPages: true });
        const stream = res.writeHead(200, {
          'Content-Type': 'application/pdf',
          'Content-disposition': `attachment;filename=${filename}.pdf`,
        });
        doc.on('data', (chunk) => stream.write(chunk));
        doc.on('end', () => stream.end());

        doc.font('Times-Roman')
          .fontSize(12)
          .text(sellingAgreement);
        doc.end();

      }
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
  const { purchasePrice, agreementDate, name, lastName, personalId } = req.body

  const vehicleInfo = { year, status, model, plate, conditions } = req.body
  const address = { street, buildingNumber, zipCode, city, country } = req.body
  const subject = { name, lastName, personalId, address }

  VehicleAgreement
    .findByIdAndUpdate(agreement_ID, { purchasePrice, vehicleInfo, subject, agreementDate })
    .then(() => res.redirect('/personal/legal/vehicle-agreement/list'))
    .catch(err => console.log('An has ocurred when editing an agreement', err))
})


module.exports = router
