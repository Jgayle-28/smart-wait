const express = require('express')
const connectDB = require('./config/db')
const dotenv = require('dotenv').config()
const colors = require('colors')

const { errorHandler } = require('./middleware/errorMiddleware')

const PORT = process.env.PORT || 8000

// Connect to database
connectDB()

const app = express()

// Allow the server to accept JSON
app.use(express.json())
// Allow the server to accept form-urlencoded data
app.use(express.urlencoded({ extended: false }))

/**
 * ROUTES
 */
app.get('/', (req, res) => res.status(200).send('Hola Amigo'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/patients', require('./routes/patientRoutes'))
app.use('/api/offices', require('./routes/officeRoutes'))
app.use('/api/appointments', require('./routes/appointmentRoutes'))
app.use('/api/analytics', require('./routes/analyticsRoutes'))

/**
 * Middleware
 */
app.use(errorHandler)

const server = app.listen(PORT, () =>
  console.log(`Server started on ${PORT}`.brightMagenta)
)

/**
 * Sockets
 */

const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3000',
  },
})

io.on('connection', (socket) => {
  console.log('connected to socket.io 🔗'.brightMagenta)

  socket.on('SET_UP', (userData) => {
    // userData = checkedInPatient OR office
    console.log(`socket connection established ✅`.bgGreen, userData)
    socket.join(userData._id)
    socket.emit('CONNECTED')
  })

  // Patient checking in
  socket.on('PATIENT_CHECK_IN', (patientData) => {
    //  patientData = checkedInPatient
    console.log('I am in the emit check in socket 🚀'.bgCyan, patientData)
    socket.to(patientData.office).emit('OFFICE_PATIENT_CHECK_IN', patientData)
  })

  // Office assigning a room to a patient
  socket.on('OFFICE_ASSIGN_PATIENT_ROOM', (patientData) => {
    console.log('I am in the assign room  socket 🏢'.bgMagenta, patientData)
    socket.to(patientData._id).emit('OFFICE_ASSIGN_ROOM', patientData)
  })

  socket.off('SET_UP', () => {
    console.log('USER DISCONNECTED')
    socket.leave(userData._id)
  })
})
