
const router = require("express").Router()
const Invoice = require('./../models/Invoice.model')


// new invoice
router.get("/create", (req, res) => res.render("invoice/invoice-create"))
router.post("/create", (req, res) => {

    const {
        invoiceDate,
        paymentDate,
        accrualDate,
        productName,
        price,
        quantity,
        VAT,
        name,
        surname,
        email,
        street,
        buildingNumber,
        zipCode,
        city,
        country,
        phone
    } = req.body

    console.log(req.body)

    const date = {
        invoiceDate,
        paymentDate,
        accrualDate

    }

    const products = [{
        productName,
        price,
        quantity,
        VAT
    }]
    const client = {
        name,
        surname,
        email,
        street,
        buildingNumber,
        zipCode,
        city,
        country,
        phone
    }
    Invoice
        .create({ date, products, client })
        // .populate('user')
        .then(NewInvoice => {
            res.redirect('/services/business/invoice/list')
            console.log(NewInvoice)
        })
        .catch(err => console.log(err))

})

// invoices list
router.get("/list", (req, res) => {

    Invoice
        .find()
        .then(invoices => res.render("invoice/invoice-list", { invoices }))
        .catch(err => console.log(err))
})

// see invoice details

// delete invoice

// edit invoice

module.exports = router