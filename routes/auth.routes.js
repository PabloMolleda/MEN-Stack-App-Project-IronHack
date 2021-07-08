const router = require("express").Router()
const bcrypt = require('bcrypt')
const User = require('./../models/User.model')
const Company = require('./../models/Company.model')
const { checkLoggedUser, checkCompanyOrAdmin } = require('./../middleware')

router.get('/register', (req, res) => res.render('users/sign-up'))

router.post('/register', (req, res) => {

  const { mail, pwd, name, lastName, personalId, phone, role } = req.body

  const address = { street, buildingNumber, zipCode, city, country } = req.body

  User
    .findOne({ mail })
    .then(user => {

      if (user) {
        res.render('users/sign-up', { errorMessage: 'Email already registered' })
        return
      }

      const bcryptSalt = 10
      const salt = bcrypt.genSaltSync(bcryptSalt)
      const hashPass = bcrypt.hashSync(pwd, salt)

      User
        .create({ mail, password: hashPass, name, lastName, personalId, phone, address, role })
        .then(user => {
          req.session.currentUser = user
          user.role === 'company' ? res.redirect('/register/company-details') : res.redirect('/my-profile')
        })
        .catch(err => console.log(err, 'An error has ocurred when creating a new user'))

    })
    .catch(err => console.log(err, 'An error has ocurred when verifying if an user already exists'))
})


router.get('/register/company-details', checkLoggedUser, checkCompanyOrAdmin, (req, res) => res.render('users/company-sign-up'))


router.post('/register/company-details', checkCompanyOrAdmin, checkCompanyOrAdmin, (req, res) => {

  const { mail, name, companyId, phone } = req.body

  const address = { street, buildingNumber, zipCode, city, country } = req.body

  Company
    .findOne({ mail })
    .then(companyUser => {

      if (companyUser) {
        res.render('users/company-sign-up', { errorMessage: 'Company already registered' })
        return
      }
    })
    .then(() => {
      Company
        .create({ mail, name, companyId, phone, address })
        .then(company => {

          const user_id = req.session.currentUser._id
          const company_id = company._id

          User
            .findByIdAndUpdate(user_id, { company: company_id })
            .then(() => res.redirect('/my-profile'))
            .catch(err => console.log('An has ocurred when updating user info', err))
        })
        .catch(err => console.log(err, 'An error has ocurred when creating a new company'))
    })
    .catch(err => console.log(err, 'An error has ocurred when verifying if company details already exists'))
})

router.get('/log-in', (req, res) => res.render('users/log-in'))

router.post('/log-in', (req, res) => {

  const { mail, pwd } = req.body

  User
    .findOne({ mail })
    .then(user => {

      if (!user) {
        res.render('users/log-in', { errorMessage: 'Unknown User' })
        return
      }

      if (bcrypt.compareSync(pwd, user.password) === false) {
        res.render('users/log-in', { errorMessage: 'Wrong Password' })
        return
      }
      req.session.currentUser = user
      res.redirect('/my-profile')
    })
    .catch(err => console.log(err))
})


router.get('/log-off', (req, res) => req.session.destroy(() => res.redirect('/')))


module.exports = router