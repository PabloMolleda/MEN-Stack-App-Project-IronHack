const router = require("express").Router()
const bcrypt = require('bcrypt')
const User = require('./../models/User.model')

// 
router.get('/my-profile', (req, res) => res.render('profile/index'))

router.get('/my-profile/edit', (req, res) => {

    const { user_id } = req.query

    User
        .findById(user_id)
        .then(user => res.render('profile/edit-profile', user))
        .catch(err => console.log(err))
})
router.post('/my-profile/edit', (req, res) => {

    const { mail, name, lastName, personalId, phone, street, buildingNumber,
        zipCode, city, country, role } = req.body


    const address = { street, buildingNumber, zipCode, city, country }


    const { user_id } = req.query

    User
        .findByIdAndUpdate(user_id, { mail, name, lastName, personalId, phone, address, role })
        .then(() => { res.redirect("/my-profile") })
        .catch(err => console.log(err))
})

module.exports = router