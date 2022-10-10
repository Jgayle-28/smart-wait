const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const { generateToken, userHasPermissions } = require('../helpers/auth')

const User = require('../models/userModel')

/**
 * This is the controller for the APP USERS NOT PATIENTS
 */

// @desc register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error(
      `Please include -> ${!name ? 'name' : ''} ${!email ? 'email' : ''} ${
        !password ? 'password' : ''
      }`
    )
  }

  // Find out if user already exists
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User with that email already exists')
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create new app user
  const user = await User.create({ name, email, password: hashedPassword })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc login user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  // If there is a user and the passwords match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid credentials')
  }
})

// @desc get current user
// @route GET /api/users/currentUser
// @access Private
const getCurrentUser = asyncHandler(async (req, res) => {
  const { user } = req
  if (user) {
    res.status(200).json(user)
  } else {
    res.status(401)
    throw new Error('Problem verifying token')
  }
})

// @desc get all APPLICATION users
// @route GET /api/users/
// @access Private
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  if (users) {
    res.status(200).json(users)
  } else {
    res.status(400).json({ message: `Error fetching users, please try again` })
  }
})

// @desc update a patient by id
// @route PUT /api/patients/:id
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  // Make sure user exists
  const user = await User.findById(req.params.id)

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }
  // Update and return new patient
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  res.status(200).json(updatedUser)
})

// @desc delete user by id
// @route DELETE /api/users/:id
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  const canDelete = userHasPermissions(req.user.role)

  if (!user) {
    res.status(404)
    throw new Error('User Not found')
  }
  // Make sure user is super-admin OR admin
  if (!canDelete) {
    res.status(404)
    throw new Error('Not authorized to perform this action')
  }

  // If authorized and user is found remove the user
  await user.remove()
  res
    .status(200)
    .json({ success: true, message: 'User deleted', userId: req.params.id })
})

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getCurrentUser,
  updateUser,
  deleteUser,
}
