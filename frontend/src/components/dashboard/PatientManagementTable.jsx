import { useState, useEffect } from 'react'
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  TextField,
  Badge,
} from '@mui/material'
import { tableCellClasses } from '@mui/material/TableCell'
import { styled } from '@mui/material/styles'
import PerfectScrollbar from 'react-perfect-scrollbar'
import LaunchIcon from '@mui/icons-material/Launch'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import { getInitials } from 'utils/get-initials'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  getCheckedInPatients,
  updateCheckedInPatient,
} from 'store/patients/patientsSlice'
import { useNotification } from 'hooks/useNotification'
import { generateAnalytics } from 'store/analytics/analyticSlice'
import { updateAppointment } from 'store/appointments/appointmentSlice'
import useSocket from 'hooks/useSocket'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.neutral[600],
  },
}))

const InRoomBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}))

const WaitingBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#f73378',
    color: '#f73378',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}))

function PatientManagementTable() {
  const [assignedRooms, setAssignedRooms] = useState([])
  const [roomOptions, setRoomOptions] = useState([])

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { analytic } = useSelector((state) => state.analytics)
  const { checkedInPatients } = useSelector((state) => state.patients)
  const { office } = useSelector((state) => state.offices)
  const { officeAppointments } = useSelector((state) => state.appointments)
  const { displayNotification } = useNotification()

  const { socket } = useSocket(office)

  useEffect(() => {
    if (socket) {
      console.log('---- IN DASHBOARD CHECK ----')
      socket.on('OFFICE_PATIENT_CHECK_IN', (patientData) => {
        console.log('Got OFFICE_PATIENT_CHECK_IN message')
        displayNotification({
          message: `New patient ${patientData.name} has checked in.`,
          type: 'info',
        })
        dispatch(getCheckedInPatients(office._id))
      })
    }
  }, [socket])

  // Create available rooms from room number in office
  useEffect(() => {
    if (office) {
      const availableRooms = [...Array(parseInt(office.numOfRooms)).keys()].map(
        (_, i) => {
          return { label: `${i + 1}`, value: `${i + 1}` }
        }
      )
      setRoomOptions(availableRooms)
    }
  }, [office])

  // Check if patients have been assigned to a room already
  useEffect(() => {
    if (checkedInPatients !== null) {
      checkedInPatients.forEach((patient) => {
        if (patient.patientRoom.length) {
          if (!assignedRooms.includes(patient.patientRoom)) {
            handleAssignRoom(patient.patientRoom)
          }
        }
      })
    }
  }, [checkedInPatients, assignedRooms])

  const handlePatientClick = (patient) => {
    navigate(`/patients/${patient._id}`)
  }

  const assignPatientToRoom = (patient, roomNumber) => {
    handleAssignRoom(roomNumber)

    const patientData = { ...patient }
    patientData.patientRoom = roomNumber

    dispatch(updateCheckedInPatient(patientData))
      .unwrap()
      .then(() => {
        displayNotification({
          message: `Patient has been successfully assigned to room.`,
          type: 'success',
        })
        socket.emit('OFFICE_ASSIGN_PATIENT_ROOM', patientData)
      })
      .catch((error) => {
        displayNotification({
          type: 'error',
          message: error,
        })
      })
  }

  const handlePatientComplete = (patient) => {
    // create updated patient data
    const patientData = { ...patient, office: office._id }
    patientData.patientRoom = ''
    patientData.patientCheckedIn = false
    patientData.currentAppointment = null

    // Get the appointment that was just completed by matching the patient with the appointment for the day
    const appointment = officeAppointments.filter(
      (app) => app.patient._id === patient._id
    )

    // create updated analytics data
    // TODO -> Need to create Utils to generate averageWaitTime & averageAppointmentTime
    const analyticData = {
      ...analytic,
      patientsSeen: [patient._id, ...analytic.patientsSeen],
      appointmentsCompleted: [
        appointment[0]._id,
        ...analytic.appointmentsCompleted,
      ],
    }

    dispatch(updateCheckedInPatient(patientData))
      .unwrap()
      .then(() => {
        dispatch(generateAnalytics(analyticData))
        dispatch(
          updateAppointment({
            _id: patient.currentAppointment,
            checkOutTime: new Date(),
          })
        )
        dispatch(getCheckedInPatients(office._id))
        displayNotification({
          message: `Patient has visit has been successfully closed`,
          type: 'success',
        })
      })
      .catch((error) => {
        displayNotification({
          type: 'error',
          message: error,
        })
      })
  }

  const handleAssignRoom = (roomNumber) => {
    const tempRooms = [...assignedRooms]
    tempRooms.push(roomNumber)
    setAssignedRooms(tempRooms)
  }

  return (
    <>
      <Card sx={{ mt: 3 }}>
        <CardHeader
          title='Checked In Patients'
          subtitle='Manage patients and their status'
        />
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              {checkedInPatients.length ? (
                <>
                  <TableHead sx={{ bgcolor: 'neutral.200' }}>
                    <TableRow>
                      <StyledTableCell padding='checkbox'></StyledTableCell>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell>Room #</StyledTableCell>
                      <StyledTableCell>Visit Type</StyledTableCell>
                      <StyledTableCell>Phone</StyledTableCell>
                      <StyledTableCell>Visit Complete</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {checkedInPatients.map((patient) => (
                      <TableRow
                        hover
                        key={patient._id}
                        sx={{
                          cursor: 'pointer',
                          '&.MuiTableRow-root:hover': {
                            backgroundColor: '#F2F1FD',
                          },
                        }}
                      >
                        <TableCell>
                          <IconButton
                            onClick={() => handlePatientClick(patient)}
                          >
                            <LaunchIcon
                              sx={{ color: 'text.disabled' }}
                              fontSize='small'
                            />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              alignItems: 'center',
                              display: 'flex',
                            }}
                          >
                            {patient.patientRoom ? (
                              <InRoomBadge
                                overlap='circular'
                                anchorOrigin={{
                                  vertical: 'bottom',
                                  horizontal: 'right',
                                }}
                                variant='dot'
                              >
                                <Avatar sx={{ bgcolor: 'primary.light' }}>
                                  {getInitials(patient.name)}
                                </Avatar>
                              </InRoomBadge>
                            ) : (
                              <WaitingBadge
                                overlap='circular'
                                anchorOrigin={{
                                  vertical: 'bottom',
                                  horizontal: 'right',
                                }}
                                variant='dot'
                              >
                                <Avatar sx={{ bgcolor: 'primary.light' }}>
                                  {getInitials(patient.name)}
                                </Avatar>
                              </WaitingBadge>
                            )}

                            <Box sx={{ ml: 2 }}>
                              <Typography
                                color='textPrimary'
                                variant='subtitle2'
                              >
                                {patient.name}
                              </Typography>
                              <Typography color='textSecondary' variant='body2'>
                                {patient.email}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <TextField
                            label=''
                            name='room'
                            onChange={(e) =>
                              assignPatientToRoom(patient, e.target.value)
                            }
                            select
                            SelectProps={{ native: true }}
                            value={patient.patientRoom}
                            size='small'
                          >
                            <option value=''>Assign</option>
                            {roomOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </TextField>
                        </TableCell>
                        <TableCell>
                          <Typography color='textSecondary' variant='body2'>
                            {patient.address.formattedAddress &&
                              patient.address.formattedAddress}
                          </Typography>
                        </TableCell>
                        <TableCell>{patient.phoneNumber}</TableCell>
                        <TableCell>
                          <Tooltip title='Complete patients visit'>
                            <IconButton
                              onClick={() => handlePatientComplete(patient)}
                            >
                              <TaskAltIcon
                                sx={{ color: 'success.main' }}
                                fontSize='small'
                              />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </>
              ) : (
                <h1>No Checked In Patients</h1>
              )}
            </Table>
          </Box>
        </PerfectScrollbar>
      </Card>
    </>
  )
}

export default PatientManagementTable
