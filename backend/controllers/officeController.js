const asyncHandler = require('express-async-handler')

const Office = require('../models/officeModel')

// @desc register a new office
// @route POST /api/offices
// @access Private
const registerOffice = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    phoneNumber,
    address,
    numOfRooms,
    subscription,
    billing,
  } = req.body

  if (!name || !email || !phoneNumber || !address || !numOfRooms || !billing) {
    res.status(400)
    throw new Error(
      `Please include -> ${!name ? 'name' : ''} ${!email ? 'email' : ''} ${
        !phoneNumber ? 'phone number' : ''
      } ${!address ? 'address' : ''} ${!numOfRooms ? 'Number of rooms' : ''} 
        ${!billing ? 'billing information' : ''}
        `
    )
  }

  const office = await Office.create({
    ...req.body,
    staff: [req.user.id],
    owner: req.user.id,
  })

  res.status(201).json(office)
})

// @desc get all offices
// @route GET /api/offices/
// @access Private
const getOffices = asyncHandler(async (req, res) => {
  const offices = await Office.find({}).populate('owner').populate('staff')

  if (offices) {
    res.status(200).json(offices)
  } else {
    res.status(400)
    throw new Error(`Error fetching offices, please try again`)
  }
})

// @desc get a office by id
// @route GET /api/offices/:id
// @access Private
const getOffice = asyncHandler(async (req, res) => {
  const office = await Office.findById(req.params.id)
    .populate('owner')
    .populate('staff')

  if (!office) {
    res.status(404)
    throw new Error('Office not found')
  }
  res.status(200).json(office)
})

// @desc update a office by id
// @route PUT /api/offices/:id
// @access Private
const updateOffice = asyncHandler(async (req, res) => {
  // Make sure patient exists
  const office = await Office.findById(req.params.id)

  if (!office) {
    res.status(404)
    throw new Error('Office not found')
  }
  // Update and return new patient
  const updatedOffice = await Office.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  res.status(200).json(updatedOffice)
})

// @desc get a office by id
// @route DELETE /api/offices/:id
// @access Private
const deleteOffice = asyncHandler(async (req, res) => {
  const office = await Office.findById(req.params.id)

  // Make sure we have the office
  if (!office) {
    res.status(404)
    throw new Error('Patient Not found')
  }

  // If authorized and office is found remove the patient
  await office.remove()
  res.status(200).json({
    success: true,
    message: 'Office deleted',
    officeId: req.params.id,
  })
})

module.exports = {
  registerOffice,
  getOffices,
  getOffice,
  updateOffice,
  deleteOffice,
}
