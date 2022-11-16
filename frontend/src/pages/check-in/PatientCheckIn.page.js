import { Box, Container, Grid, Typography } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// MUI

import Alert from '@mui/material/Alert'
import { Logo } from 'components/logo'
import {
  getCheckedInPatient,
  checkInPatient,
} from 'store/patients/patientsSlice'
import { getOffice } from 'store/offices/officeSlice'
import Spinner from 'components/shared/Spinner'
import {
  PatientGetAppointment,
  updateAppointmentCheckIn,
} from 'store/appointments/appointmentSlice'
import useSocket from 'hooks/useSocket'
import { useNotification } from 'hooks/useNotification'

function PatientCheckIn() {
  const { appId, uniquePatientId } = useParams()
  const dispatch = useDispatch()
  const { checkedInPatient, isLoading } = useSelector((state) => state.patients)
  const { office } = useSelector((state) => state.offices)
  const { appointment } = useSelector((state) => state.appointments)
  const { displayNotification } = useNotification()
  const { socket } = useSocket(checkedInPatient)

  const [pageLoading, setPageLoading] = useState(true)
  const [checkInStatus, setCheckInStatus] = useState(null)

  useEffect(() => {
    if (socket) {
      console.log('---- IN PATIENT CHECK ----')
      socket.on('OFFICE_ASSIGN_ROOM', (patientData) => {
        console.log('Got OFFICE_ASSIGN_ROOM message')
        displayNotification({
          message: `You have been assigned to a room.`,
          type: 'info',
        })
        setCheckInStatus({
          type: 'info',
          message: `You have been assigned to room ${patientData.patientRoom}.`,
        })
      })
    }
  }, [socket])

  // Get the checked in patient by uniquePatientId
  useEffect(() => {
    if (uniquePatientId && checkedInPatient === null) {
      dispatch(getCheckedInPatient(uniquePatientId))
    }
  }, [uniquePatientId, checkedInPatient])

  // Get the office from checked in patient
  useEffect(() => {
    if (checkedInPatient !== null && office === null) {
      dispatch(getOffice(checkedInPatient.office))
    }
  }, [checkedInPatient, office])

  // Get the appointment from checked in patient
  useEffect(() => {
    if (appId && appointment === null) {
      console.log('in office check')
      dispatch(PatientGetAppointment(appId))
    }
  }, [appId, appointment])

  // Page Loading state
  useEffect(() => {
    if (checkedInPatient !== null && office !== null && appointment !== null) {
      setPageLoading(false)
    }
  }, [checkedInPatient, office, appointment])

  useEffect(() => {
    if (checkedInPatient?.patientCheckedIn) {
      setCheckInStatus({
        type: 'success',
        message: `You have been successfully checked in. Please hang tight while our office prepares your room.`,
      })
    }
  }, [checkedInPatient])

  const handlePatientCheckIn = () => {
    const patientData = { ...checkedInPatient }
    patientData.patientCheckedIn = true
    patientData.currentAppointment = appId

    const appointmentData = { ...appointment }
    appointmentData.checkInTime = new Date()

    dispatch(checkInPatient(patientData))
      .unwrap()
      .then(() => {
        setCheckInStatus({
          type: 'success',
          message: `You have been successfully checked in. Please hang tight while our office prepares your room.`,
        })
        dispatch(updateAppointmentCheckIn(appointmentData))
        // Notify the office
        socket.emit('PATIENT_CHECK_IN', patientData)
      })
      .catch((error) =>
        setCheckInStatus({
          type: 'error',
          message: 'There was a problem checking you in please try again',
        })
      )
  }

  if (pageLoading) return <Spinner />

  return (
    <>
      <Container maxWidth='xs'>
        <Box
          component='main'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 12,
          }}
        >
          <Logo />
          {checkedInPatient?.patientCheckedIn ? (
            <>
              {checkInStatus && (
                <Box mt={4} sx={{ width: '100%' }}>
                  <Alert severity={checkInStatus.type}>
                    {checkInStatus.message}
                  </Alert>
                </Box>
              )}
              <Typography
                component='h6'
                mt={6}
                text='secondary'
                sx={{ textAlign: 'center' }}
              >
                Please ensure you have all required documents ready when
                entering the office
              </Typography>
            </>
          ) : (
            <>
              <Typography
                component='h1'
                variant='h5'
                mt={6}
                sx={{ textAlign: 'center' }}
              >
                Welcome to {office.name} patient check in
              </Typography>
              <Typography component='p' text='secondary' mt={4}>
                Please check in by clicking the button below
              </Typography>

              <LoadingButton
                loading={isLoading}
                loadingPosition='start'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                onClick={handlePatientCheckIn}
              >
                Check In Now
              </LoadingButton>
            </>
          )}
        </Box>
      </Container>
    </>
  )
}

export default PatientCheckIn
