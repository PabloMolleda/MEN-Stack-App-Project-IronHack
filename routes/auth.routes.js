const router = require("express").Router()
const bcrypt = require('bcrypt')
const User = require('./../models/User.model')

// Sign up

router.get('/register', (req, res) => res.render('users/sign-up'))

router.post('/register', (req, res) => {

  const { mail, password, name, lastName, personalId, phone, street, buildingNumber, 
        zipCode, city, country, role } = req.body


const address = { street, buildingNumber, zipCode, city, country }

  User
    .findOne({ mail })
    .then(user => {

      if (user) {
        res.render('users/sign-up', { errorMessage: 'Email already registered' })
        return
      }

      const bcryptSalt = 10
      const salt = bcrypt.genSaltSync(bcryptSalt)
      const hashPass = bcrypt.hashSync(password, salt)

      console.log(req.body)
      
      User
        .create({ mail, password: hashPass, name, lastName, personalId, phone, address, role })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err, 'este es el error 1'))

    })
    .catch(err => console.log(err, 'este es el error 2'))
})

// Log in

router.get('/log-in', (req, res) => res.render('users/log-in'))

router.post('/log-in', (req, res) => {

    const { username, password } = req.body

    User
        .findOne({ username })
        .then(user => {

            if (!user) {
                res.render('users/log-in', { errorMessage: 'Unknown User' })
                return
            }

            if (bcrypt.compareSync(password, user.password) === false) {
                res.render('users/log-in', { errorMessage: 'Wrong Password' })
                return
            }
            req.session.currentUser = user
            res.redirect('/')
        })
        .catch(err => console.log(err))
})

// Log off

router.get('/log-off', (req, res) => req.session.destroy(() => res.redirect('/')))


module.exports = router