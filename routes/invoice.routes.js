const router = require("express").Router()
const Invoice = require('./../models/Invoice.model')


router.get('/', (req, res) => res.render('invoice/index'))
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
        lastName,
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
        lastName,
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


// delete invoice

router.get('/delete', (req, res) => {

    const { invoice_id } = req.query

    Invoice

        .findByIdAndRemove(invoice_id)
        .then(() => res.redirect("/services/business/invoice/list"))
        .catch(err => console.log(err))

})
// see invoice details

router.get("/preview/:invoice_id", (req, res) => {

    const { invoice_id } = req.params
    console.log(req.params)
    Invoice
        .findById(invoice_id)
        .then(invoice => {
            res.render("invoice/invoice-preview", invoice)
            console.log(invoice)
        })
        .catch(err => console.log(err))
})






// edit invoice

module.exports = router