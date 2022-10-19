const mongoose = require('mongoose')

const patientSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a patient name'],
    },
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    dob: {
      type: String,
      required: false,
      default: null,
    },
    phoneNumber: {
      type: String,
      required: false,
      maxlength: [20, 'Phone number can not be longer than 20 characters'],
      default: '',
    },
    address: {
      formattedAddress: String,
      street: String,
      state: String,
      zip: String,
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
      type: String,
      required: false,
      default: '',
    },
    office: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Office',
      required: true,
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
