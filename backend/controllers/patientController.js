const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Patient = require('../models/patientModel')

// @desc register a new patient
// @route POST /api/patients
// @access Private
const registerPatient = asyncHandler(async (req, res) => {
  const { name, email, dob, phoneNumber, patientDescription, address, office } =
    req.body

  if (!name) return

  // Get user from web token
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const patient = await Patient.create({
    name,
    email,
    phoneNumber,
    dob,
    patientDescription,
    address,
    office,
    addedBy: req.user.id,
  })

  res.status(201).json(patient)
})

// @desc get all patients
// @route GET /api/patients/
// @access Private
const getPatients = asyncHandler(async (req, res) => {
  const patients = await Patient.find({ office: req.params.officeId }).populate(
    'addedBy'
  )

  if (patients) {
    res.status(200).json(patients)
  } else {
    res.status(400)
    throw new Error(`Error fetching patients, please try again`)
  }
})

// @desc get all checked in patients
// @route GET /api/patients/
// @access Private
const getCheckedInPatients = asyncHandler(async (req, res) => {
  console.log('req.params.officeId :>> ', req.params.officeId)
  const patients = await Patient.find({
    office: req.params.officeId,
    patientCheckedIn: true,
  }).populate('addedBy')

  if (patients) {
    res.status(200).json(patients)
  } else {
    res.status(400)
    throw new Error('Error getting checked in patients')
  }
})

// @desc get a patient by id
// @route GET /api/patients/:id
// @access Private
const getPatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id)

  if (!patient) {
    res.status(404)
    throw new Error('Patient not found')
  }
  res.status(200).json(patient)
})

// @desc update a patient by id
// @route PUT /api/patients/:id
// @access Private
const updatePatient = asyncHandler(async (req, res) => {
  // Make sure patient exists
  const patient = await Patient.findById(req.params.id)

  if (!patient) {
    res.status(404)
    throw new Error('Patient not found')
  }
  // Update and return new patient
  const updatedPatient = await Patient.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  res.status(200).json(updatedPatient)
})

// @desc get a patient by id
// @route DELETE /api/patients/:id
// @access Private
const deletePatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id)

  // Make sure we have the patient
  if (!patient) {
    res.status(404)
    throw new Error('Patient Not found')
  }

  // If authorized and patient is found remove the patient
  await patient.remove()
  res.status(200).json({
    success: true,
    message: 'Patient deleted',
    patientId: req.params.id,
  })
})

// TODO - Create route to get all patients created by currently logged in user

module.exports = {
  registerPatient,
  getPatients,
  getCheckedInPatients,
  getPatient,
  updatePatient,
  deletePatient,
}
