import { Box, Container, Grid } from '@mui/material'
import PatientManagementTable from 'components/dashboard/PatientManagementTable'
import StatCards from 'components/dashboard/StatCards'
import Spinner from 'components/shared/Spinner'
import { format } from 'date-fns'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { generateAnalytics } from 'store/analytics/analyticSlice'
import { getAppointmentsByDate } from 'store/appointments/appointmentSlice'
import { getOffice } from 'store/offices/officeSlice'
import { getCheckedInPatients } from 'store/patients/patientsSlice'

function Dashboard() {
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { office } = useSelector((state) => state.offices)
  const { dailyOfficeAppointments } = useSelector((state) => state.appointments)
  const { checkedInPatients } = useSelector((state) => state.patients)
  const { analytic } = useSelector((state) => state.analytics)

  const today = format(new Date(), 'MM/dd/yyyy')

  // Check for the days analytics
  // This is done on the dashboard because the stat card uses the data
  useEffect(() => {
    if (
      analytic === null ||
      format(new Date(analytic.date), 'MM/dd/yyyy') !== today
    ) {
      dispatch(generateAnalytics({ date: new Date(), office: user.office }))
    }
  }, [analytic, office, user])

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
