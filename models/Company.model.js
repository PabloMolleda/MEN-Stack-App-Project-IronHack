const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    minLegth: 5,
    maxLength: 100,
    required: true
  },
  password: { type: String, required: true },      // exigir mayusculas numeros etc 
  name: {
    type: String,
    minLegth: 1,
    maxLength: 50,
    required: true,
    set: value => value.charAt(0).toUpperCase() + value.substring(1)
  },
  surname: {
    type: String,
    minLegth: 1,
    maxLength: 50,
    required: true,
    set: value => value.charAt(0).toUpperCase() + value.substring(1)
  },
  personalId: { type: String, required: true },    // que acabe con letra 
  phone: { type: String, required: true },    // prefijo del pais
  address: {
    street: { type: String, required: true },
    buildingNumber: { type: String, default: null },
    zipCode: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true }
  },
  company: {
    name: {
      type: String,
      minLegth: 1,
      maxLength: 50,
      required: true,
      set: value => value.charAt(0).toUpperCase() + value.substring(1)
    },
    companyId: { type: String, required: true },            // que acabe con letra
    companyPhone: { type: String, required: true },                // prefijo del pais
    companyEmail: {
      type: String,
      minLegth: 5,
      maxLength: 100,
      required: true
    },
  }, 
  role: {
    type: String,
    enum: ['CLIENT', 'ADMIN'],
    default: 'CLIENT'
  }
  companyAddress: {
    companyStreet: { type: String, required: true },
    companyBuildingNumber: { type: String, default: null },
    companyZipCode: { type: String, required: true },
    companyCity: { type: String, required: true },
    companyCountry: { type: String, required: true }
  }
},
  { timestamps: true }
)

const User = mongoose.model('User', userSchema);

module.exports = User;

