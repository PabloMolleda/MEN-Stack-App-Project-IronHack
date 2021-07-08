const router = require("express").Router()
const NewHire = require('../models/New-hire.model')
const { checkLoggedUser, checkCompanyOrAdmin } = require('../middleware')


router.get('/', (req, res) => res.render('new-hire/index'))


router.get("/create", checkLoggedUser, checkCompanyOrAdmin, (req, res) => res.render("new-hire/new-hire-create"))


router.post("/create", checkLoggedUser, checkCompanyOrAdmin, (req, res) => {


    const { name, lastName, phone, personalId, NIN, street, buildingNumber, zipCode, city, country, contractType, duration, positionTitle, startDate, endDate, weeklyHours, yearlyBonus, yearlyHours,
        functions, trialPeriodDuration, location, signDate, salaryPerYear } = req.body

    const contract = { contractType, duration, positionTitle }

    const address = { street, buildingNumber, zipCode, city, country }
    const employee = { name, lastName, phone, personalId, address, NIN }

    const agreementDetails = {
        startDate, endDate, weeklyHours, yearlyBonus, yearlyHours,
        functions, trialPeriodDuration, location, signDate, salaryPerYear
    }

    const user = req.session.currentUser._id

    NewHire
        .create({ contract, employee, agreementDetails, user })
        .then(() => { res.redirect('/company/hr/employment-agreement/list') })
        .catch(err => console.log(err))
})


router.get("/list", checkLoggedUser, checkCompanyOrAdmin, (req, res) => {

    NewHire
        .find()
        .then(newHires => res.render("new-hire/new-hire-list", { newHires }))
        .catch(err => console.log(err))
})


router.get('/delete', checkLoggedUser, checkCompanyOrAdmin, (req, res) => {

    const { newHire_id } = req.query

    NewHire
        .findByIdAndRemove(newHire_id)
        .then(() => res.redirect('/company/hr/employment-agreement/list'))
        .catch(err => console.log(err))

})


router.get('/edit', checkLoggedUser, checkCompanyOrAdmin, (req, res) => {

    const { newHire_id } = req.query

    NewHire
        .findById(newHire_id)
        .then(theNewHire => res.render('new-hire/new-hire-edit', theNewHire))
        .catch(err => console.log(err))
})


router.post('/edit', checkLoggedUser, checkCompanyOrAdmin, (req, res) => {
    const { name, lastName, phone, personalId, NIN, street, buildingNumber, zipCode, city, country, contractType, duration, positionTitle, startDate, endDate, weeklyHours, yearlyBonus, yearlyHours,
        functions, trialPeriodDuration, location, signDate, salaryPerYear } = req.body

    const contract = { contractType, duration, positionTitle }

    const address = { street, buildingNumber, zipCode, city, country }
    const employee = { name, lastName, phone, personalId, address, NIN }

    const agreementDetails = {
        startDate, endDate, weeklyHours, yearlyBonus, yearlyHours,
        functions, trialPeriodDuration, location, signDate, salaryPerYear
    }

    const { newHire_id } = req.query

    NewHire
        .findByIdAndUpdate(newHire_id, { contract, employee, agreementDetails })
        .then(() => { res.redirect('/company/hr/employment-agreement/list') })
        .catch(err => console.log(err))
})


router.get("/preview/:newHire_id", checkLoggedUser, checkCompanyOrAdmin, (req, res) => {

    const { newHire_id } = req.params

    NewHire
        .findById(newHire_id)
        .populate('user')
        .then(() => { res.render("new-hire/new-hire-preview") })
        .catch(err => console.log(err))
})


module.exports = router