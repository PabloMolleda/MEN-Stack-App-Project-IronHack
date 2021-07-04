const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    contract: {
      type: {
        type: String,
        enum: ['permanent', 'fixed-term', 'casual', 'zero-hour'],
        required: true
      },
      duration: { type: String },
      positionTitle: { type: String, required: true }
    },
    employee: {
      name: { type: String, required: true },
      surname: { type: String, required: true },
      address: {
        street: { type: String, required: true },
        buildingNumber: { type: String },
        zipCode: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true }
      },
      phone: { type: String },
      personalId: { type: String, required: true },
      NIN: { type: String, required: true }
    },
    agreementDetails: {
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
      weeklyHours: { type: Number, required: true },
      yearlyBonus: { type: Number, required: true },
      functions: { type: String },
      trialPeriodDuration: { type: Number },
      location: { type: String, default: 'remote' },
      signDate: { type: Date, default: Date.now, required: true }
    }
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema);

module.exports = User;
