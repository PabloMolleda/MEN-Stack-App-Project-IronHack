const mongoose = require('mongoose')
const Schema = mongoose.Schema

const companySchema = new Schema({
  name: {
    type: String,
    minLegth: 1,
    maxLength: 50,
    required: true,
    set: value => value.charAt(0).toUpperCase() + value.substring(1)
  },
  companyId: { type: String, required: true },            // que acabe con letra
  phone: { type: String, required: true },                // prefijo del pais
  email: {
    type: String,
    minLegth: 5,
    maxLength: 100,
    required: true,
  },
  address: {
    street: { type: String, required: true },
    buildingNumber: { type: String, default: null, required: true },
    zipCode: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true }
  }

},
  { timestamps: true }
)

const Company = mongoose.model('Company', companySchema)

module.exports = Company

