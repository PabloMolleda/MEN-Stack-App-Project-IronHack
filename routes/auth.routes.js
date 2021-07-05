const router = require("express").Router()
const bcrypt = require('bcrypt')
const User = require('./../models/User.model')

// Sign up

router.get('/register', (req, res) => res.render('users/sign-up'))

router.post('/register', (req, res) => {

  const { email, password, name, surname, personalId, phone, street, buildingNumber, 
        zipCode, city, country, companyName, companyId, companyPhone, companyEmail, 
        role, companyStreet, companyBuildingNumber, companyZipCode, companyCity, 
        companyCountry } = req.body

const address = { street, buildingNumber, zipCode, city, country }

const company = { companyName, companyId, companyPhone, companyEmail }

const companyAddress = { companyStreet, companyBuildingNumber, companyZipCode, companyCity, companyCountry }

  User
    .findOne({ email })
    .then(email => {

      if (email) {
        res.render('users/sign-up', { errorMessage: 'Email already registered' })
        return
      }

      const bcryptSalt = 10
      const salt = bcrypt.genSaltSync(bcryptSalt)
      const hashPass = bcrypt.hashSync(pwd, salt)

      User
        .create({ email, password, name, surname, personalId, phone, address, role, company  })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))

    })
    .catch(err => console.log(err))
})

// Log in

// Log off


module.exports = router