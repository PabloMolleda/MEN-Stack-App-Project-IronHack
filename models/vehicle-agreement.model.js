const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehicleAgreementSchema = new Schema({
  purchasePrice: { type: Number, required: true },
  vehicleInfo: {
    year: { type: Number, required: true },
    status: {
      type: String,
      enum: ['new', 'used', 'broken'],
      required: true
    },
    model: { type: String, required: true },
    plate: { type: String, required: true },
    conditions: { type: String, default: null, required: true }
  },
  subject: {
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
    personalId: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      buildingNumber: { type: String, default: null, required: true },
      zipCode: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true }
    }
  },
  agreementDate: { type: Date, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  typeOfAgreement: {
    type: String,
    enum: ['selling', 'buying'],
    required: true
  }
},
  { timestamps: true }
)

const VehicleAgreement = mongoose.model('VehicleAgreement', vehicleAgreementSchema)

module.exports = VehicleAgreement
