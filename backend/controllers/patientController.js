const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const { generateToken, userHasPermissions } = require("../helpers/auth")

const User = require("../models/userModel")
const Patient = require("../models/patientModel")

// @desc register a new patient
// @route POST /api/patients
// @access Private
const registerPatient = asyncHandler(async (req, res) => {
  res.send(`I work`)
})

// @desc get all patients
// @route GET /api/patients/
// @access Private
const getPatients = asyncHandler(async (req, res) => {
  res.send(`I work`)
})

// @desc get a patient by id
// @route GET /api/patients/:id
// @access Private
const getPatient = asyncHandler(async (req, res) => {
  res.send(`I work`)
})

// @desc update a patient by id
// @route PUT /api/patients/:id
// @access Private
const updatePatient = asyncHandler(async (req, res) => {
  res.send(`I work`)
})

// @desc get a patient by id
// @route DELETE /api/patients/:id
// @access Private
const deletePatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id)
  const canDelete = userHasPermissions(req.user.role)

  // Make sure we have the patient
  if (!patient) {
    res.status(404)
    throw new Error("Patient Not found")
  }
  // Make sure user is super-admin OR admin
  if (canDelete) {
    res.status(404)
    throw new Error("Not authorized to perform this action")
  }

  // If authorized and patient is found remove the patient
  await patient.remove()
  res.status(200).json({ success: true, message: "Patient deleted" })
})

module.exports = {
  registerPatient,
  getPatients,
  getPatient,
  updatePatient,
  deletePatient,
}
