const router = require("express").Router()
const Payroll = require('./../models/Payroll.model')

// new payroll
router.get("/create", (req, res) => res.render("payroll/payroll-create"))

router.post("/create", (req, res) => {

    const {
        name,
        lastName,
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
    const address = {
        street,
        buildingNumber,
        zipCode,
        city,
        country
    }
    const employee = {
        name,
        lastName,
        address,
        phone,
        employeeId,
        NIN,
        profesionalTitle
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
    const payrollDetails = {
        seniorityDate,
        payrollDates,
        weeklyHours,
        hoursWage,
        yearlyBonus,
        percentage
    }

    Payroll
        .create({ employee, payrollDetails })
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

// delete payroll
router.get('/delete', (req, res) => {
    ///coasters/delete ?id={{id}}
    const { payroll_id } = req.query

    Payroll

        .findByIdAndRemove(payroll_id)
        .then(() => res.redirect('/services/hr/payroll/list'))
        .catch(err => console.log(err))

})
// edit payroll

// see payroll details
router.get("/preview/:payroll_id", (req, res) => {

    const { payroll_id } = req.params
    console.log(req.params)
    Payroll
        .findById(payroll_id)
        .then(payroll => {
            res.render("payroll/payroll-preview", payroll)
            console.log(payroll)
        })
        .catch(err => console.log(err))
})

// edit payroll

module.exports = router