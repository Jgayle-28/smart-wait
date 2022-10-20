const express = require('express')
const { protectRoute } = require('../middleware/authMiddleware')

const {
  registerUser,
  loginUser,
  getCurrentUser,
  deleteUser,
  getUsers,
  updateUser,
  updateUserOffice,
} = require('../controllers/userController')

const router = express.Router()

router.post('/', registerUser)
router.get('/:officeId', protectRoute, getUsers)
router.post('/login', loginUser)
router.get('/current-user', protectRoute, getCurrentUser)
router.put('/:id', protectRoute, updateUser)
router.put('/:id/update-office', protectRoute, updateUserOffice) // updates office for user on office register
router.delete('/:id', protectRoute, deleteUser)

module.exports = router
