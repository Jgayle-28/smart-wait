import { Box, Container, Grid } from '@mui/material'
import PatientManagementTable from 'components/dashboard/PatientManagementTable'
import StatCards from 'components/dashboard/StatCards'
import Spinner from 'components/shared/Spinner'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAppointmentsByDate } from 'store/appointments/appointmentSlice'
import { getOffice } from 'store/offices/officeSlice'
import { getCheckedInPatients } from 'store/patients/patientsSlice'

function Dashboard() {
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { office } = useSelector((state) => state.offices)
  const { dailyOfficeAppointments } = useSelector((state) => state.appointments)
  const { checkedInPatients } = useSelector((state) => state.patients)

  useEffect(() => {
    if (user) {
      dispatch(getOffice(user.office))
      dispatch(getCheckedInPatients(user.office))
    }
  }, [user])

  useEffect(() => {
    if (office && dailyOfficeAppointments === null) {
      dispatch(
        getAppointmentsByDate({ officeId: office._id, date: new Date() })
      )
    }
  }, [office, dailyOfficeAppointments])

  if (checkedInPatients === null || office === null) return <Spinner />
  return (
    <>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <StatCards />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <PatientManagementTable />
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default Dashboard
