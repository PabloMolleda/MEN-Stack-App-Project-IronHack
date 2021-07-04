const mongoose = require('mongoose')
const Schema = mongoose.Schema

const invoiceSchema = new Schema(
  {
    user: {

      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    date: {
      invoiceDate: { type: Date, require: true },
      paymentDate: { type: Date, require: true },
      accrualDate: { type: Date, require: true },
    },
    productName: { type: String, require: true },
    productPrice: { type: Number, require: true },
    productQuantity: { type: Number, require: true },
    VAT: { type: Number, require: true },
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
        set: value => value.charAt(0).toUpperCase() + value.substring(1)
      },
      email: {
        type: String,
        minLegth: 5,
        maxLength: 100,
      },
      Address: {
        // set: value => value.charAt(0).toUpperCase() + value.substring(1)
        street: String,
        buildingNumber: String,
        zipCode: String,
        city: String,
        country: String
      },
      phone: String, // prefijo del pais
    }

  },
  {
    timestamps: true
  }
)

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice

