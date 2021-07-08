const router = require("express").Router()
const Payroll = require('./../models/Payroll.model')
const { checkLoggedUser, checkCompanyOrAdmin } = require('./../middleware')


router.get('/', (req, res) => res.render('payroll/index'))


router.get("/create", checkLoggedUser, checkCompanyOrAdmin, (req, res) => res.render("payroll/payroll-create"))


router.post("/create", checkLoggedUser, checkCompanyOrAdmin, (req, res) => {
    const { name, lastName, phone, employeeId, NIN, profesionalTitle, street, buildingNumber, zipCode, city, country, startDate, endDate, signDate, NINpercentage, TAX, VAT, seniorityDate, weeklyHours, hoursWage, yearlyBonus } = req.body

    const address = { street, buildingNumber, zipCode, city, country }
    const employee = { name, lastName, address, phone, employeeId, NIN, profesionalTitle }

    const payrollDates = { startDate, endDate, signDate }
    const percentage = { NINpercentage, TAX, VAT }
    const payrollDetails = { seniorityDate, weeklyHours, hoursWage, yearlyBonus, percentage, payrollDates }

    const user = req.session.currentUser._id

    Payroll
        .create({ employee, payrollDetails, user })
        .then(() => { res.redirect('/company/hr/payroll/list') })
        .catch(err => console.log(err))
})


router.get("/list", checkLoggedUser, checkCompanyOrAdmin, (req, res) => {

    Payroll
        .find()
        .then(payrolls => res.render("payroll/payroll-list", { payrolls }))
        .catch(err => console.log(err))
})


router.get('/delete', checkLoggedUser, checkCompanyOrAdmin, (req, res) => {

    const { payroll_id } = req.query

    Payroll

        .findByIdAndRemove(payroll_id)
        .then(() => res.redirect('/company/hr/payroll/list'))
        .catch(err => console.log(err))

})


router.get('/edit', checkLoggedUser, checkCompanyOrAdmin, (req, res) => {

    const { payroll_id } = req.query

    Payroll
        .findById(payroll_id)
        .then(thepayroll => res.render('payroll/payroll-edit', thepayroll))
        .catch(err => console.log(err))
})


router.post('/edit', checkLoggedUser, checkCompanyOrAdmin, (req, res) => {

    const { name, lastName, phone, employeeId, NIN, profesionalTitle, street, buildingNumber, zipCode, city, country, startDate, endDate, signDate, NINpercentage, TAX, VAT, seniorityDate, weeklyHours, hoursWage, yearlyBonus } = req.body

    const address = { street, buildingNumber, zipCode, city, country }
    const employee = { name, lastName, address, phone, employeeId, NIN, profesionalTitle }

    const payrollDates = { startDate, endDate, signDate }
    const percentage = { NINpercentage, TAX, VAT }
    const payrollDetails = { seniorityDate, weeklyHours, hoursWage, yearlyBonus, percentage, payrollDates }

    const { payroll_id } = req.query

    Payroll

        .findByIdAndUpdate(payroll_id, { employee, payrollDetails })
        .then(() => { res.redirect('/company/hr/payroll/list') })
        .catch(err => console.log(err))
})


router.get("/preview/:payroll_id", checkLoggedUser, checkCompanyOrAdmin, (req, res) => {

    const { payroll_id } = req.params

    Payroll
        .findById(payroll_id)
        .populate('user')
        .then(payroll => { res.render("payroll/payroll-preview", payroll) })
        .catch(err => console.log(err))
})


module.exports = router