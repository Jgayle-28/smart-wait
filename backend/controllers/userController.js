const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const { generateToken } = require("../helpers/auth")

const User = require("../models/userModel")

/**
 * This is the controller for the APP USERS NOT PATIENTS
 */

// @desc register a new user
// @route /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error(
      `Please include -> ${!name ? "name" : ""} ${!email ? "email" : ""} ${
        !password ? "password" : ""
      }`
    )
  }

  // Find out if user already exists
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error("User already exists")
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
    throw new Error("Invalid user data")
  }
})

// @desc login user
// @route /api/users/login
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
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error("Invalid credentials")
  }
})

// @desc get current user
// @route /api/users/currentUser
// @access Private
const getCurrentUser = asyncHandler(async (req, res) => {
  const { user } = req
  if (user) {
    res.status(200).json(user)
  } else {
    res.status(401)
    throw new Error("Problem verifying token")
  }
})

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
}
