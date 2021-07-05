const router = require("express").Router()
const NewHire = require('./../models/New-hire.model')
// new agreement
router.get("/create", (req, res) => res.render("new-hire/new-hire-create"))
router.post("/create", (req, res) => {

    const {
        contractype,
        duration,
        positionTitle,
        name,
        surname,
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
        functions,
        trialPeriodDuration,
        location,
        signDate
    } = req.body
    console.log(req.body)
    const contract = {
        contractype,
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
        surname,
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
        functions,
        trialPeriodDuration,
        location,
        signDate
    }
    NewHire
        .create({ contract, employee, agreementDetails })
        .then(theNewHire => {
            res.send('holi')
            console.log(theNewHire)
        })
        .catch(err => console.log(err))
})
// agreements list

// see agreement details

// delete agreement

// edit agreement

module.exports = router