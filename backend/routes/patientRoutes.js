const express = require('express')
const { protectRoute } = require('../middleware/authMiddleware')

const {
  registerPatient,
  getPatients,
  getPatient,
  updatePatient,
  deletePatient,
  getCheckedInPatients,
} = require('../controllers/patientController')

const router = express.Router()

router.post('/', protectRoute, registerPatient)
router.get('/:officeId', protectRoute, getPatients)
router.get('/:officeId/checked-in', protectRoute, getCheckedInPatients)
router.get('/patient/:id', protectRoute, getPatient)
router.put('/patient/:id', protectRoute, updatePatient)
router.delete('/:id', protectRoute, deletePatient)

module.exports = router
