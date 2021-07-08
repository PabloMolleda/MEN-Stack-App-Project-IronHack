const router = require("express").Router()
const Invoice = require('./../models/Invoice.model')
const { checkLoggedUser, checkCompanyOrAdmin } = require('./../middleware')


router.get('/', (req, res) => res.render('invoice/index'))


router.get("/create", checkLoggedUser, checkCompanyOrAdmin, (req, res) => res.render("invoice/invoice-create"))


router.post("/create", checkLoggedUser, checkCompanyOrAdmin, (req, res) => {



    const { name, lastName, email, phone, street, buildingNumber, zipCode, city, country, productName, price, quantity, VAT, invoiceDate, paymentDate, accrualDate } = req.body

    const date = { invoiceDate, paymentDate, accrualDate }
    const products = [{ productName, price, quantity, VAT }]

    const address = { street, buildingNumber, zipCode, city, country }
    const client = { name, lastName, email, address, phone }

    const user = req.session.currentUser._id

    Invoice
        .create({ date, products, client, user })
        .then(() => { res.redirect('/company/business/invoice/list') })
        .catch(err => console.log(err))

})


router.get("/list", checkLoggedUser, checkCompanyOrAdmin, (req, res) => {

    Invoice
        .find()
        .then(invoices => res.render("invoice/invoice-list", { invoices }))
        .catch(err => console.log(err))
})


router.get('/delete', checkLoggedUser, checkCompanyOrAdmin, (req, res) => {

    const { invoice_id } = req.query

    Invoice
        .findByIdAndRemove(invoice_id)
        .then(() => res.redirect("/company-services/business/invoice/list"))
        .catch(err => console.log(err))

})


router.get('/edit', checkLoggedUser, checkCompanyOrAdmin, (req, res) => {

    const { invoice_id } = req.query

    Invoice
        .findById(invoice_id)
        .then(theInvoice => res.render('invoice/invoice-edit', theInvoice))
        .catch(err => console.log(err))
})


router.post('/edit', checkLoggedUser, checkCompanyOrAdmin, (req, res) => {


    const { name, lastName, email, phone, street, buildingNumber, zipCode, city, country, productName, price, quantity, VAT, invoiceDate, paymentDate, accrualDate } = req.body

    const date = { invoiceDate, paymentDate, accrualDate }
    const products = [{ productName, price, quantity, VAT }]

    const address = { street, buildingNumber, zipCode, city, country }
    const client = { name, lastName, email, address, phone }


    Invoice
        .findByIdAndUpdate(invoice_id, { date, products, client })
        .then(() => { res.redirect("/company-services/business/invoice/list") })
        .catch(err => console.log(err))
})


router.get('/preview/:invoice_id', checkLoggedUser, checkCompanyOrAdmin, (req, res) => {

    const { invoice_id } = req.params

    Invoice
        .findById(invoice_id)
        .populate('user')
        .then((invoice) => {
            res.render("invoice/invoice-preview", invoice)
            console.log(invoice)
        })
        .catch(err => console.log(err))
})


module.exports = router