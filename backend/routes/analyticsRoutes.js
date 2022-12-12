const express = require('express')
const {
  generateAnalytics,
  getAnalytics,
} = require('../controllers/analyticsController')
const { protectRoute } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', protectRoute, generateAnalytics)
router.get('/:officeId', protectRoute, getAnalytics)

module.exports = router
