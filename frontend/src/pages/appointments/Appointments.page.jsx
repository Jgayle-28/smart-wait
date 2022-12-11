import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  SvgIcon,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material'
import FilterListOffIcon from '@mui/icons-material/FilterListOff'
import { Search as SearchIcon } from 'icons/search'
import { useEffect, useState } from 'react'
import AppointmentForm from 'components/appointments/forms/AppointmentForm'
import Modal from 'components/shared/Modal'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAppointments,
  getAppointmentsByDate,
} from 'store/appointments/appointmentSlice'
import Spinner from 'components/shared/Spinner'
import AppointmentsTable from 'components/appointments/AppointmentsTable'
import EmptyState from 'components/shared/EmptyState'
import DateDropdown from 'components/shared/DateDropdown'

function Appointment() {
  const dispatch = useDispatch()
  const { office } = useSelector((state) => state.offices)
  const { officeAppointments } = useSelector((state) => state.appointments)

  const [appointments, setAppointments] = useState(null)
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [appointmentDate, setAppointmentDate] = useState(new Date())
  const [hasFiltered, setHasFiltered] = useState(false)
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    dispatch(getAppointments(office._id))
  }, [office])

  useEffect(() => {
    if (officeAppointments) {
      setAppointments(officeAppointments)
    }
  }, [officeAppointments])

  useEffect(() => {
    handlePatientSearch()
  }, [searchText])

  const toggleModal = () => setAppointmentModalOpen((prevState) => !prevState)

  const handelAppointmentCreateCallback = () => {
    dispatch(getAppointments(office._id))
    toggleModal()
  }

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment)
    toggleModal()
  }

  const handleDateChange = (e) => {
    setAppointmentDate(e)
    dispatch(getAppointmentsByDate({ officeId: office._id, date: e }))
    setHasFiltered(true)
  }

  const handlePatientSearch = () => {
    if (searchText.length === 0) setAppointments(officeAppointments)
    else {
      const tempPatients = officeAppointments.filter((app) => {
        return app.patient.name.toLowerCase().includes(searchText)
      })

      setAppointments(tempPatients)
    }
  }

  const handleClearFilters = () => {
    setHasFiltered(false)
    setSearchText('')
    dispatch(getAppointments(office._id))
  }

  if (appointments === null) return <Spinner />
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
          <Box>
            <Box sx={{ m: -1 }}>
              <Typography sx={{ m: 1 }} variant='h4'>
                Appointments
              </Typography>
            </Box>
            <Box
              sx={{
                mt: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box display='flex' alignItems='center'>
                <TextField
                  sx={{ width: { sm: '100%', md: 500 } }}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <SvgIcon color='action' fontSize='small'>
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder='Search patients'
                  variant='outlined'
                  onChange={(e) => setSearchText(e.target.value.toLowerCase())}
                />
                <DateDropdown
                  label='Filter By Date'
                  onChange={handleDateChange}
                  value={appointmentDate}
                  btnStyles={{ ml: 2 }}
                  btnVariant='outlined'
                />
                {hasFiltered && (
                  <Tooltip title='Clear Filters'>
                    <IconButton
                      aria-label='delete'
                      color='error'
                      variant='outlined'
                      onClick={handleClearFilters}
                      sx={{ ml: 2 }}
                    >
                      <FilterListOffIcon fontSize='small' />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>

              <Box sx={{ m: 1 }}>
                <Button
                  size='large'
                  color='primary'
                  variant='contained'
                  onClick={toggleModal}
                >
                  Add Appointment
                </Button>
              </Box>
            </Box>
          </Box>

          <Box sx={{ mt: 3 }}>
            {appointments.length ? (
              <AppointmentsTable
                appointments={appointments}
                handleAppointmentClick={handleAppointmentClick}
              />
            ) : (
              <>
                <EmptyState
                  title='Looks like you do not have any appointments...'
                  subTitle='Use the button to add an appointment.'
                />
              </>
            )}
          </Box>
        </Container>
      </Box>
      <Modal
        title=''
        isOpen={appointmentModalOpen}
        toggleModal={toggleModal}
        noPadding
      >
        <AppointmentForm
          appointment={selectedAppointment}
          callback={handelAppointmentCreateCallback}
          appointmentModalOpen={appointmentModalOpen}
          toggleModal={toggleModal}
        />
      </Modal>
    </>
  )
}

export default Appointment
