const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const payrollSchema = new Schema(
  {
    user: {

      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
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
        // set: value => value.charAt(0).toUpperCase() + value.substring(1)
        street: String,
        buildingNumber: String,
        zipCode: String,
        city: String,
        country: String
      },
      phone: String, // prefijo del pais

      employeeId: { type: String, require: true }, // que acabe con letra

      NIN: { type: String, require: true },

      profesionalTitle: {
        type: String,
        minLegth: 1,
        maxLength: 50,
        require: true,
        set: value => value.charAt(0).toUpperCase() + value.substring(1)
      },
    },
    seniorityDate: Date,

    date: {
      payrollStartDate: { type: Date, require: true },

      payrollEndDate: { type: Date, require: true },

      payrollDate: {
        type: Date,
        require: true,
        default: Date.now
      }
    },
    weeklyHours: { type: Number, require: true },

    hoursWage: { type: Number, require: true },

    yearlyBonus: Number,

    percentage: {
      NIN: {
        type: Number,
        require: true,
        min: 0,
        max: 100
      },
      TAX: {
        type: Number,
        require: true,
        min: 0,
        max: 100
      },
      VAT: {
        type: Number,
        require: true,
        min: 0,
        max: 100
      }
    }

  },
  {
    timestamps: true
  }
);

const Payroll = mongoose.model('Payroll', payrollSchema);

module.exports = Payroll;


