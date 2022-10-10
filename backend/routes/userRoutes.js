const express = require('express')
const { protectRoute } = require('../middleware/authMiddleware')

const {
  registerUser,
  loginUser,
  getCurrentUser,
  deleteUser,
  getUsers,
  updateUser,
} = require('../controllers/userController')

const router = express.Router()

router.post('/', registerUser)
router.get('/', protectRoute, getUsers)
router.post('/login', loginUser)
router.get('/current-user', protectRoute, getCurrentUser)
router.put('/:id', protectRoute, updateUser)
router.delete('/:id', protectRoute, deleteUser)

module.exports = router
