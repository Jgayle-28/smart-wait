const mongoose = require('mongoose')

const appointmentModel = mongoose.Schema({
  appointmentDate: {
    type: Date,
    required: true,
  },
  appointmentType: {
    type: String,
    enum: ['well-check', 'sick-check', 'concern-check'],
    required: true,
  },
  office: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Office',
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

module.exports = mongoose.model('Appointment', appointmentModel)
