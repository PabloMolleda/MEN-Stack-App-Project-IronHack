const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sellingCarSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  purchasePrice: { type: Number, required: true },
  vehicleYear: { type: Date, required: true },
  vehicleStatus: {
    type: String,
    enum: ['new', 'used', 'broken'],
    required: true
  },
  vehicleModel: { type: String, required: true },
  vehiclePlate: { type: String, required: true },
  conditions: { type: String },
  buyer: {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    personalId: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      buildingNumber: { type: String },
      zipCode: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true }
    }
  },
  agrementDate: { type: Date, required: true },
  signDate: { type: Date, required: true }
},
  { timestamps: true }
)

const sellingCar = mongoose.model('sellingCar', sellingCarSchema)

module.exports = sellingCar
