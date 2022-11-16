import {
  Container,
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material'
import PeopleIcon from '@mui/icons-material/PeopleOutlined'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import MoneyIcon from '@mui/icons-material/Money'
import VerifiedIcon from '@mui/icons-material/Verified'
import StatCard from './StatCard'
import { useSelector } from 'react-redux'

function StatCards() {
  const { checkedInPatients } = useSelector((state) => state.patients)
  const { dailyOfficeAppointments } = useSelector((state) => state.appointments)
  const { analytic } = useSelector((state) => state.analytics)

  // Calculate totals
  const patientsNotInRoom =
    checkedInPatients.length && checkedInPatients
      ? checkedInPatients.reduce((acc, patient) => {
          patient.patientRoom.length === 0 && acc++
          return acc
        }, 0)
      : 0

  const patientsInRoom =
    checkedInPatients.length && checkedInPatients
      ? checkedInPatients.reduce((acc, patient) => {
          patient.patientRoom.length > 0 && acc++
          return acc
        }, 0)
      : 0

  const totalAppointments = dailyOfficeAppointments?.length || [].length

  const totalPatientsSeen = analytic?.patientsSeen.length

  return (
    <>
      <Grid item lg={3} sm={6} xl={3} xs={12}>
        <StatCard
          label='Patients Waiting'
          icon={<PeopleIcon />}
          iconColor='warning.main'
          stat={patientsNotInRoom}
        />
      </Grid>
      <Grid item xl={3} lg={3} sm={6} xs={12}>
        <StatCard
          label='Patients In Rooms'
          icon={<HowToRegIcon />}
          iconColor='secondary.light'
          stat={patientsInRoom}
        />
      </Grid>
      <Grid item xl={3} lg={3} sm={6} xs={12}>
        <StatCard
          label='Appointments Today'
          icon={<MoneyIcon />}
          iconColor='primary.main'
          stat={totalAppointments}
        />
      </Grid>
      <Grid item xl={3} lg={3} sm={6} xs={12}>
        <StatCard
          label='Patients Seen'
          icon={<VerifiedIcon />}
          iconColor='info.main'
          stat={totalPatientsSeen}
        />
      </Grid>
    </>
  )
}

export default StatCards
