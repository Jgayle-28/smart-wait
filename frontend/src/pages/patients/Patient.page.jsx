import { useEffect, useState } from 'react'
import { Grid, Box, Container } from '@mui/material'
import PatientAppointments from 'components/patients/PatientAppointments'
import PatientDetails from 'components/patients/PatientDetails'
import PatientDetailsHeader from 'components/patients/PatientDetailsHeader'
import PatientEditForm from 'components/patients/forms/PatientEditForm'
import { useLocation, useParams } from 'react-router-dom'
import Spinner from 'components/shared/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { clearPatient, getPatient } from 'store/patients/patientsSlice'

function Patient() {
  const location = useLocation()
  const dispatch = useDispatch()
  const { id } = useParams()
  const { patient } = useSelector((state) => state.patients)

  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    dispatch(getPatient(id))
    // return () => dispatch(clearPatient())
  }, [])

  // Catches the edit in the route to toggle edit
  useEffect(() => {
    if (location.pathname.includes('edit')) {
      setIsEditing(true)
    } else setIsEditing(false)
  }, [location])

  if (patient === null) return <Spinner />
  return (
    <>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth='lg'>
          <Grid container sx={{ justifyContent: 'center' }}>
            <Grid item xs={12} md={10}>
              <PatientDetailsHeader isEditing={isEditing} />
              {isEditing ? (
                <PatientEditForm />
              ) : (
                <>
                  <PatientDetails />
                  <PatientAppointments />
                </>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default Patient
