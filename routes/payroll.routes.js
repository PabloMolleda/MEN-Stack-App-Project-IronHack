const router = require("express").Router()
const Payroll = require('./../models/Payroll.model')
const { checkLoggedUser, checkCompanyOrAdmin } = require('./../middleware')


router.get('/', (req, res) => res.render('payroll/index'))


router.get("/create", checkLoggedUser, checkCompanyOrAdmin, (req, res) => res.render("payroll/payroll-create"))


router.post("/create", checkLoggedUser, checkCompanyOrAdmin, (req, res) => {

    const address = { street, buildingNumber, zipCode, city, country } 
    const employee = { name, lastName, address, phone, employeeId, NIN, profesionalTitle } = req.body

    const payrollDates = { startDate, endDate, signDate } = req.body
    const percentage = { NINpercentage, TAX, VAT } = req.body
    const payrollDetails = { seniorityDate, weeklyHours, hoursWage, yearlyBonus } = req.body

    console.log(req.body)

    Payroll
        .create({ employee, payrollDetails })
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

    const address = { street, buildingNumber, zipCode, city, country } = req.body
    const employee = { name, lastName, address, phone, employeeId, NIN, profesionalTitle } = req.body

    const payrollDates = { startDate, endDate, signDate } = req.body
    const percentage = { NINpercentage, TAX, VAT } = req.body
    const payrollDetails = { seniorityDate, payrollDates, weeklyHours, hoursWage, yearlyBonus, percentage } = req.body

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
        .then(() => { res.render("payroll/payroll-preview", payroll) })
        .catch(err => console.log(err))
})


module.exports = router