const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
      require: true,
      set: value => value.charAt(0).toUpperCase() + value.substring(1)
    },
    password: { type: String, require: true },      // exigir mayusculas numeros etc 
    personalId: { type: String, require: true },    // que acabe con letra 
    email: {
      type: String,
      minLegth: 5,
      maxLength: 100,
      require: true
    },
    phone: { type: String, require: true },    // prefijo del pais
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
        require: true,
        set: value => value.charAt(0).toUpperCase() + value.substring(1)
      },
      address: {
        street: { type: String, required: true },
        buildingNumber: { type: String, default: null },
        zipCode: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true }
      },
      companyId: { type: String, required: true },            // que acabe con letra
      phone: { type: String, required: true },                // prefijo del pais
      email: {
        type: String,
        minLegth: 5,
        maxLength: 100,
        require: true
      },
      role: {
        type: String,
        enum: ['CLIENT', 'ADMIN'],
        default: 'CLIENT'
      }
    }
  },
    { timestamps: true }
  )

const User = mongoose.model('User', userSchema);

module.exports = User;

