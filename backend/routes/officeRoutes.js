const express = require('express')
const {
  registerOffice,
  getOffices,
  getOffice,
  updateOffice,
  deleteOffice,
} = require('../controllers/officeController')
const { protectRoute } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', protectRoute, registerOffice)
router.get('/', protectRoute, getOffices)
router.get('/:id', protectRoute, getOffice)
router.put('/:id', protectRoute, updateOffice)
router.delete('/:id', protectRoute, deleteOffice)

module.exports = router
