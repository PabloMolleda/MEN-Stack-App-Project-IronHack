const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
  mail: {
    type: String,
    required: true,
    validate: {
      validator: function (email) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
      },
      message: 'Please, enter a valid email'
    }
  },
  password: { type: String, required: true },      // exigir mayusculas numeros etc 
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
  role: {
    type: String,
    enum: ['client', 'company', 'admin'],
    default: 'client'
  },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }
},
  { timestamps: true }
)

const User = mongoose.model('User', userSchema);

module.exports = User;

