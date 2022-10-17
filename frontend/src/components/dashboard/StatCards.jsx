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

  // Calculate totals
  const patientsNotInRoom = checkedInPatients
    ? checkedInPatients.reduce((acc, patient) => {
        patient.patientRoom.length === 0 && acc++
        return acc
      }, 0)
    : 0

  const patientsInRoom = checkedInPatients
    ? checkedInPatients.reduce((acc, patient) => {
        patient.patientRoom.length > 0 && acc++
        return acc
      }, 0)
    : 0

  return (
    <>
      <Grid item lg={3} sm={6} xl={3} xs={12}>
        <StatCard
          label='Patients Waiting'
          icon={<PeopleIcon />}
          iconColor='error.main'
          stat={patientsNotInRoom}
        />
      </Grid>
      <Grid item xl={3} lg={3} sm={6} xs={12}>
        <StatCard
          label='Patients In Rooms'
          icon={<HowToRegIcon />}
          iconColor='success.main'
          stat={patientsInRoom}
        />
      </Grid>
      <Grid item xl={3} lg={3} sm={6} xs={12}>
        <StatCard
          label='Appointments Today'
          icon={<MoneyIcon />}
          iconColor='primary.main'
          stat='30'
        />
      </Grid>
      <Grid item xl={3} lg={3} sm={6} xs={12}>
        <StatCard
          label='Patients Seen'
          icon={<VerifiedIcon />}
          iconColor='warning.main'
          stat='26' // appointmentTotal -
        />
      </Grid>
    </>
  )
}

export default StatCards
