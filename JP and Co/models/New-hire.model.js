const mongoose = require('mongoose');
const Schema = mongoose.Schema

const NewHireSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    contract: {
      contractType: {
        type: String,
        enum: ['permanent', 'fixed-term', 'casual', 'zero-hour'],
        required: true
      },
      duration: { type: String, default: null },
      positionTitle: { type: String, required: true }
    },
    employee: {
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
      address: {
        street: { type: String, required: true },
        buildingNumber: { type: String },
        zipCode: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true }
      },
      phone: { type: String, default: null },
      personalId: { type: String, required: true },
      NIN: { type: String, required: true }
    },
    agreementDetails: {
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
      weeklyHours: { type: Number, required: true },
      yearlyBonus: { type: Number, required: true },
      functions: { type: String, default: null },
      trialPeriodDuration: { type: Number, default: null },
      location: { type: String, default: 'Remote' },
      signDate: { type: Date, default: Date.now, required: true }
    }
  },
  { timestamps: true }
)

const NewHire = mongoose.model('NewHire', NewHireSchema);

module.exports = NewHire;
