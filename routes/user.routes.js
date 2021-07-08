const router = require("express").Router()
const User = require('./../models/User.model')
const Company = require('./../models/Company.model')
const { checkLoggedUser, checkCompanyOrAdmin } = require('./../middleware')


router.get('/my-profile', checkLoggedUser, (req, res) => {

    const ifCompany = req.session.currentUser.role === 'company'
    const user_id = req.session.currentUser._id

    User
        .findById(user_id)
        .populate('company')
        .then(user => res.render('profile/index', { user, ifCompany }))
        .catch(err => console.log(err))

})


router.get('/my-profile/edit', checkLoggedUser, (req, res) => {

    const { currentUser } = req.session

    res.render('profile/edit-profile', currentUser)

})


router.post('/my-profile/edit', checkLoggedUser, (req, res) => {

    const { mail, name, lastName, personalId, phone, role } = req.body
    const address = { street, buildingNumber, zipCode, city, country } = req.body
    const { user_id } = req.query

    User
        .findByIdAndUpdate(user_id, { mail, name, lastName, personalId, phone, address, role })
        .then(() => res.redirect("/my-profile"))
        .catch(err => console.log(err))

})


router.get('/my-profile/company-edit', checkLoggedUser, checkCompanyOrAdmin, (req, res) => {

    const { company_id}  = req.query

    Company
        .findById(company_id)
        .then(company => res.render('profile/company-edit-profile', company))
        .catch(err => console.log('An error has ocurred when showing company details', err))

})


router.post('/my-profile/company-edit', checkLoggedUser, checkCompanyOrAdmin, (req, res) => {

    const { mail, name, companyId, phone } = req.body
    const address = { street, buildingNumber, zipCode, city, country } = req.body
    
    const { company_id } = req.query

    Company
        .findByIdAndUpdate(company_id, { mail, name, companyId, phone, address })
        .then(() => res.redirect("/my-profile"))
        .catch(err => console.log('An error has ocurred when editing company details', err))

})

module.exports = router