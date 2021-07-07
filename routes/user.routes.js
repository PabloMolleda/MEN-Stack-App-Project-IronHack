const router = require("express").Router()
const User = require('./../models/User.model')
const { checkLoggedUser } = require('./../middleware')


router.get('/my-profile', checkLoggedUser, (req, res) => {

    const {currentUser} = req.session

    res.render('profile/index', currentUser)

})


router.get('/my-profile/edit', checkLoggedUser, (req, res) => {

    const {currentUser} = req.session

    res.render('profile/edit-profile', currentUser)
})


router.post('/my-profile/edit', checkLoggedUser, (req, res) => {

    const { mail, name, lastName, personalId, phone, role } = req.body
    const address = { street, buildingNumber, zipCode, city, country } = req.body
    const { user_id } = req.query

    User
        .findByIdAndUpdate(user_id, { mail, name, lastName, personalId, phone, address, role })
        .then(() => { res.redirect("/my-profile") })
        .catch(err => console.log(err))
})

module.exports = router