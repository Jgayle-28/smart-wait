const asyncHandler = require('express-async-handler')

const Appointment = require('../models/appointmentModel')

// @desc create a new appointment
// @route POST /api/appointments
// @access Private
const createAppointment = asyncHandler(async (req, res) => {
  const { appointmentDate, appointmentType, office, patient } = req.body

  if (!appointmentDate || !appointmentDate || !office || !patient) return

  const appointment = await Appointment.create({
    appointmentDate,
    appointmentType,
    office,
    patient,
    addedBy: req.user.id,
  })

  res.status(201).json(appointment)
})

// @desc get all appointments for an office
// @route GET /api/appointments/:officeId
// @access Private
const getAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({ office: req.params.officeId })

  if (appointments) {
    res.status(200).json(appointments)
  } else {
    res.status(400)
    throw new Error(`Error fetching appointments, please try again`)
  }
})

// @desc get a appointment by id
// @route GET /api/appointments/:id
// @access Private
const getAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id)

  if (!appointment) {
    res.status(404)
    throw new Error('Appointment not found')
  }
  res.status(200).json(appointment)
})

// @desc update a appointment by id
// @route PUT /api/appointments/:id
// @access Private
const updateAppointment = asyncHandler(async (req, res) => {
  // Make sure patient exists
  const appointment = await Appointment.findById(req.params.id)

  if (!appointment) {
    res.status(404)
    throw new Error('Appointment not found')
  }
  // Update and return new appointment
  const updatedAppointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  res.status(200).json(updatedAppointment)
})

// @desc get a appointment by id
// @route DELETE /api/appointments/:id
// @access Private
const deleteAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id)

  // Make sure we have the appointment
  if (!appointment) {
    res.status(404)
    throw new Error('Appointment Not found')
  }

  // If authorized and appointment is found remove the appointment
  await Appointment.remove()
  res.status(200).json({
    success: true,
    message: 'Appointment deleted',
    appointmentId: req.params.id,
  })
})

module.exports = {
  createAppointment,
  getAppointments,
  getAppointment,
  updateAppointment,
  deleteAppointment,
}
