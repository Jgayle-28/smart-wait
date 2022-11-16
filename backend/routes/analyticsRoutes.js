const express = require('express')
const { generateAnalytics } = require('../controllers/analyticsController')
const { protectRoute } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', protectRoute, generateAnalytics)

module.exports = router
