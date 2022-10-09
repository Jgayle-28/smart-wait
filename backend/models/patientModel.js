const mongoose = require('mongoose')

const patientSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a patient name'],
    },
    email: {
      type: String,
      required: false,
      default: '',
    },
    phoneNumber: {
      type: Number,
      required: false,
      default: '',
    },
    patientDescription: {
      type: String,
      required: false,
      default: '',
    },
    patientCheckedIn: {
      type: Boolean,
      required: true,
      default: false,
    },
    patientRoom: {
      type: Number,
      required: false,
      default: null,
    },
    appointments: {
      type: Array,
      required: false,
      default: [],
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Patient', patientSchema)
