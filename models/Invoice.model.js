const mongoose = require('mongoose')
const Schema = mongoose.Schema

const invoiceSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: {
      invoiceDate: { type: Date, required: true },
      paymentDate: { type: Date, required: true },
      accrualDate: { type: Date, required: true },
    },
    products: [{
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      VAT: { type: Number, required: true },
    }],
    client: {
      name: {
        type: String,
        minLegth: 1,
        maxLength: 50,
        required: true,
        set: value => value.charAt(0).toUpperCase() + value.substring(1)
      },
      lastName: {
        type: String,
        minLegth: 1,
        maxLength: 50,
        default: null,
        required: true,
        set: value => value.charAt(0).toUpperCase() + value.substring(1)
      },
      email: { type: String, minLegth: 5, maxLength: 100, default: null },
      address: {
        // set: value => value.charAt(0).toUpperCase() + value.substring(1)
        street: { type: String, default: null, required: true },
        buildingNumber: { type: String, default: null, required: true },
        zipCode: { type: String, default: null, required: true },
        city: { type: String, default: null, required: true },
        country: { type: String, default: null, required: true }
      },
      phone: { type: String, default: null, required: true } // prefijo del pais
    }
  },
  { timestamps: true }
)

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice

