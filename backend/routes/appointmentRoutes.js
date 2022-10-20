const express = require('express')
const {
  createAppointment,
  getAppointments,
  getAppointment,
  updateAppointment,
  deleteAppointment,
} = require('../controllers/appointmentController')
const { protectRoute } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', protectRoute, createAppointment)
router.get('/:officeId', protectRoute, getAppointments)
router.get('/:id', protectRoute, getAppointment)
router.put('/:id', protectRoute, updateAppointment)
router.delete('/:id', protectRoute, deleteAppointment)

module.exports = router
