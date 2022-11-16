const asyncHandler = require('express-async-handler')
const endOfDay = require('date-fns/endOfDay')
const startOfDay = require('date-fns/startOfDay')

const Analytics = require('../models/analyticsModel')

// @desc create OR update analytics for the current office
// @route POST /api/analytics
// @access Private
const generateAnalytics = asyncHandler(async (req, res) => {
  const {
    date,
    patientsSeen,
    appointmentsCompleted,
    averageWaitTime,
    averageAppointmentTime,
    office,
  } = req.body

  if (!date || !office) {
    res.status(400)
    throw new Error(
      `Please make sure the date and office fields are being sent`
    )
  }

  // Create analytics obj
  const analyticObj = {}

  if (date) analyticObj.date = date
  if (patientsSeen) analyticObj.patientsSeen = patientsSeen
  if (appointmentsCompleted)
    analyticObj.appointmentsCompleted = appointmentsCompleted
  if (averageWaitTime) analyticObj.averageWaitTime = averageWaitTime
  if (averageAppointmentTime)
    analyticObj.averageAppointmentTime = averageAppointmentTime
  if (office) analyticObj.office = office

  // Check for that days analytics
  let analytic = await Analytics.findOne({
    office: office,
    date: {
      $gte: startOfDay(new Date(date)),
      $lte: endOfDay(new Date(date)),
    },
  })

  // If there is a analytic created for that current date UPDATE it
  if (analytic) {
    analytic = await Analytics.findOneAndUpdate(
      {
        office: office,
        date: {
          $gte: startOfDay(new Date(date)),
          $lte: endOfDay(new Date(date)),
        },
      },
      { $set: analyticObj },
      { $new: true }
    )
  } else {
    analytic = await Analytics.create(analyticObj)
  }

  res.status(201).json(analytic)
})

module.exports = {
  generateAnalytics,
}
