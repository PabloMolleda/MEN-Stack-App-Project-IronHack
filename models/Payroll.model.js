const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const payrollSchema = new Schema(
  {
    employee: {
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
      address: {
        // set: value => value.charAt(0).toUpperCase() + value.substring(1)
        street: { type: String, default: null, required: true },
        buildingNumber: { type: String, default: null, required: true },
        zipCode: { type: String, default: null, required: true },
        city: { type: String, default: null, required: true },
        country: { type: String, default: null, required: true }
      },
      phone: { type: String, default: null, required: true }, // prefijo del pais
      employeeId: { type: String, required: true }, // que acabe con letra
      NIN: { type: String, required: true },
      profesionalTitle: {
        type: String,
        minLegth: 1,
        maxLength: 50,
        required: true,
        set: value => value.charAt(0).toUpperCase() + value.substring(1)
      },
    },
    payrollDetails: {
      seniorityDate: { type: Date, required: true },
      payrollDates: {
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        signDate: { type: Date, required: true, default: Date.now }
      },
      weeklyHours: { type: Number, required: true },
      hoursWage: { type: Number, required: true },
      yearlyBonus: { type: Number, default: null, required: true },
      percentage: {
        NIN: { type: Number, required: true, min: 0, max: 100 },
        TAX: { type: Number, required: true, min: 0, max: 100 },
        VAT: { type: Number, required: true, min: 0, max: 100 }
      },
    },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
)

const Payroll = mongoose.model('Payroll', payrollSchema)

module.exports = Payroll;


