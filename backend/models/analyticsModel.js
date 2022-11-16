const mongoose = require('mongoose')

const analyticsModel = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  patientsSeen: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }],
    default: [],
    required: true,
  },
  appointmentsCompleted: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
    default: [],
    required: true,
  },
  averageWaitTime: {
    type: Number,
    default: 0,
  },
  averageAppointmentTime: {
    type: Number,
    default: 0,
  },
  office: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Office',
    required: true,
  },
})

module.exports = mongoose.model('Analytics', analyticsModel)
