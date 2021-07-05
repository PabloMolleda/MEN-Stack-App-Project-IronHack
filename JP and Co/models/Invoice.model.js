const mongoose = require('mongoose')
const Schema = mongoose.Schema

const invoiceSchema = new Schema(
  {
    // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: {
      invoiceDate: { type: Date, require: true },
      paymentDate: { type: Date, require: true },
      accrualDate: { type: Date, require: true },
    },
    products: [{
      productName: { type: String, require: true },
      price: { type: Number, require: true },
      quantity: { type: Number, require: true },
      VAT: { type: Number, require: true }
    }],
    client: {
      name: {
        type: String,
        minLegth: 1,
        maxLength: 50,
        require: true,
        set: value => value.charAt(0).toUpperCase() + value.substring(1)
      },
      surname: {
        type: String,
        minLegth: 1,
        maxLength: 50,
        default: null,
        set: value => value.charAt(0).toUpperCase() + value.substring(1)
      },
      email: { type: String, minLegth: 5, maxLength: 100, default: null },
      address: {
        // set: value => value.charAt(0).toUpperCase() + value.substring(1)
        street: { type: String, default: null },
        buildingNumber: { type: String, default: null },
        zipCode: { type: String, default: null },
        city: { type: String, default: null },
        country: { type: String, default: null }
      },
      phone: { type: String, default: null } // prefijo del pais
    }
  },
  { timestamps: true }
)

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice

