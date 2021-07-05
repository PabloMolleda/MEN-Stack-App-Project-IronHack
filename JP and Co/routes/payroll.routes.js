const router = require("express").Router()
const Payroll = require('./../models/Payroll.model')

// new payroll
router.get("/create", (req, res) => res.render("payroll/payroll-create"))

router.post("/create", (req, res) => {

    const {
        name,
        surname,
        street,
        buildingNumber,
        zipCode,
        city,
        country,
        phone,
        employeeId,
        NIN,
        profesionalTitle,
        seniorityDate,
        startDate,
        endDate,
        signDate,
        weeklyHours,
        hoursWage,
        yearlyBonus,
        NINpercentage,
        TAX,
        VAT
    } = req.body
    console.log(req.body)
    const employee = {
        name,
        surname,
        street,
        buildingNumber,
        zipCode,
        city,
        country,
        phone,
        employeeId,
        NIN,
        profesionalTitle
    }
    const address = {
        street,
        buildingNumber,
        zipCode,
        city,
        country
    }
    const payrollDates = {
        startDate,
        endDate,
        signDate
    }
    const percentage = {
        NINpercentage,
        TAX,
        VAT
    }

    Payroll
        .create(
            {
                employee,
                seniorityDate,
                payrollDates,
                weeklyHours,
                hoursWage,
                yearlyBonus,
                percentage
            })
        // .populate('user')
        .then(newPayroll => {
            res.redirect('/services/hr/payroll/list')
            console.log(newPayroll)
        })
        .catch(err => console.log(err))
})

// payrolls list
router.get("/list", (req, res) => {

    Payroll
        .find()
        .then(payrolls => res.render("payroll/payroll-list", { payrolls }))
        .catch(err => console.log(err))
})



// see payroll details

// delete payroll

// edit payroll

module.exports = router