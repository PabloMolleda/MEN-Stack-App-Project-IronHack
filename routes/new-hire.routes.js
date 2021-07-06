const router = require("express").Router()
const NewHire = require('./../models/New-hire.model')


router.get('/', (req, res) => res.render('new-hire/index'))
// new agreement
router.get("/create", (req, res) => res.render("new-hire/new-hire-create"))
router.post("/create", (req, res) => {

    const {
        contractType,
        duration,
        positionTitle,
        name,
        lastName,
        street,
        buildingNumber,
        zipCode,
        city,
        country,
        phone,
        personalId,
        NIN,
        startDate,
        endDate,
        weeklyHours,
        yearlyHours,
        yearlyBonus,
        functions,
        trialPeriodDuration,
        location,
        signDate
    } = req.body
    console.log(req.body)
    const contract = {
        contractType,
        duration,
        positionTitle,
    }
    const address = {
        street,
        buildingNumber,
        zipCode,
        city,
        country,
    }
    const employee = {
        name,
        lastName,
        address,
        phone,
        personalId,
        NIN,
    }
    const agreementDetails = {
        startDate,
        endDate,
        weeklyHours,
        yearlyHours,
        yearlyBonus,
        functions,
        trialPeriodDuration,
        location,
        signDate
    }
    NewHire
        .create({ contract, employee, agreementDetails })
        .then(theNewHire => {
            res.redirect('/services/hr/new-hire-agreement/list')
            console.log(theNewHire)
        })
        .catch(err => console.log(err))
})
// agreements list
router.get("/list", (req, res) => {

    NewHire
        .find()
        .then(newHires => res.render("new-hire/new-hire-list", { newHires }))
        .catch(err => console.log(err))
})
// delete agreement
router.get('/delete', (req, res) => {

    const { newHire_id } = req.query

    NewHire

        .findByIdAndRemove(newHire_id)
        .then(() => res.redirect('/services/hr/new-hire-agreement/list'))
        .catch(err => console.log(err))

})
// edit agreement
router.get('/edit', (req, res) => {

    const { newHire_id } = req.query

    NewHire
        .findById(newHire_id)
        .then(theNewHire => res.render('new-hire/new-hire-edit', theNewHire))
        .catch(err => console.log(err))
})

router.post('/edit', (req, res) => {

    const { newHire_id } = req.query
    const {
        contractType,
        duration,
        positionTitle,
        name,
        lastName,
        street,
        buildingNumber,
        zipCode,
        city,
        country,
        phone,
        personalId,
        NIN,
        startDate,
        endDate,
        weeklyHours,
        yearlyHours,
        yearlyBonus,
        functions,
        trialPeriodDuration,
        location,
        signDate
    } = req.body
    console.log(req.body)
    const contract = {
        contractType,
        duration,
        positionTitle,
    }
    const address = {
        street,
        buildingNumber,
        zipCode,
        city,
        country,
    }
    const employee = {
        name,
        lastName,
        address,
        phone,
        personalId,
        NIN,
    }
    const agreementDetails = {
        startDate,
        endDate,
        weeklyHours,
        yearlyHours,
        yearlyBonus,
        functions,
        trialPeriodDuration,
        location,
        signDate
    }

    NewHire
        .findByIdAndUpdate(newHire_id, { contract, employee, agreementDetails })
        .then(edition => {
            res.redirect('/services/hr/new-hire-agreement/list')
            console.log(edition)
        })
        .catch(err => console.log(err))
})




// see agreement details
router.get("/preview/:newHire_id", (req, res) => {

    const { newHire_id } = req.params
    console.log(req.params)
    NewHire
        .findById(newHire_id)
        .then(newHire => {
            res.render("new-hire/new-hire-preview", newHire)
            console.log(newHire)
        })
        .catch(err => console.log(err))
})




module.exports = router