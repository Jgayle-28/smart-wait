import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// MUI
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Alert from '@mui/material/Alert'
import { useNotification } from 'hooks/useNotification'
import { initialFormValues, appointmentTypes } from 'constants/appointments'
import {
  clearAppointment,
  createAppointment,
  deleteAppointment,
  updateAppointment,
} from 'store/appointments/appointmentSlice'
import PatientSearchSelect from 'components/patients/PatientSearchSelect'
import DateDropdown from 'components/shared/DateDropdown'
import { format } from 'date-fns'

function AppointmentForm({
  appointment = null,
  appointmentModalOpen,
  callback,
}) {
  const { isLoading } = useSelector((state) => state.auth)
  const { office } = useSelector((state) => state.offices)
  const dispatch = useDispatch()
  const { displayNotification } = useNotification()

  const [formData, setFormData] = useState(initialFormValues)
  const [formFeedback, setFormFeedback] = useState(null)

  const { appointmentDate, appointmentType, appointmentDetails, patient } =
    formData

  // Clears redux and local stat on modal close
  useEffect(() => {
    if (!appointmentModalOpen) {
      setFormData(initialFormValues)
      if (appointment) dispatch(clearAppointment())
    }
  }, [appointmentModalOpen, appointment])

  useEffect(() => {
    if (appointment !== null) {
      setFormData(appointment)
    }
    return () => {
      dispatch(clearAppointment())
    }
  }, [appointment])

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleDateChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      appointmentDate: e,
    }))
  }

  const handlePatientSelect = (patient, e) => {
    setFormData((prevState) => ({
      ...prevState,
      patient: patient.id,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Reset the form feed back if any Errors
    if (formFeedback) setFormFeedback(null)

    const appointmentData = { ...formData }

    if (!patient || !appointmentDate || !appointmentType) {
      return setFormFeedback({
        type: 'error',
        message: 'Please ensure all fields are filled out.',
      })
    }

    appointmentData.office = office._id

    if (appointment) {
      dispatch(updateAppointment(appointmentData))
        .unwrap()
        .then(() => {
          setFormData(initialFormValues)
          callback()
          displayNotification({
            message: 'Appointment has been updated',
            type: 'success',
          })
        })
        .catch((error) =>
          setFormFeedback({
            type: 'error',
            message: error,
          })
        )
    } else {
      dispatch(createAppointment(appointmentData))
        .unwrap()
        .then(() => {
          setFormData(initialFormValues)
          callback()
          displayNotification({
            message: 'New appointment has been created',
            type: 'success',
          })
        })
        .catch((error) =>
          setFormFeedback({
            type: 'error',
            message: error,
          })
        )
    }
  }

  const handleAppointmentDelete = () => {
    // The appointment comes from passed in user
    dispatch(deleteAppointment(appointment._id))
      .unwrap()
      .then(() => {
        setFormData(initialFormValues)
        callback()
        displayNotification({
          message: 'Appointment has been deleted',
          type: 'info',
        })
      })
      .catch((error) =>
        setFormFeedback({
          type: 'error',
          message: error,
        })
      )
  }

  return (
    <>
      <Card>
        <CardHeader
          // subheader='Create Appointment'
          title={
            appointment !== null ? 'Update Appointment' : 'Create Appointment'
          }
          action={
            appointment && (
              <Button
                variant='text'
                color='error'
                onClick={handleAppointmentDelete}
              >
                Delete Appointment
              </Button>
            )
          }
        />
        <Divider />
        <CardContent>
          {formFeedback && (
            <Box mb={3} sx={{ width: '100%' }}>
              <Alert severity={formFeedback.type}>{formFeedback.message}</Alert>
            </Box>
          )}

          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <PatientSearchSelect
              handleSelect={handlePatientSelect}
              value={patient}
            />
            <Box display='flex' alignItems='center' flexWrap='wrap'>
              <DateDropdown
                label='Select Appointment Date'
                value={appointmentDate}
                onChange={handleDateChange}
                name='appointmentDate'
                btnStyles={{ mt: 2, mr: 2 }}
              />
              <TextField
                size='small'
                margin='normal'
                sx={{ width: 150, mb: 0 }}
                disabled
                fullWidth
                label='Appointment Date'
                value={format(new Date(appointmentDate), 'MM/dd/yyyy')}
              />
            </Box>

            <Box mt={2}>
              <FormControl fullWidth required>
                <InputLabel>Appointment Type</InputLabel>
                <Select
                  required
                  name='appointmentType'
                  value={appointmentType}
                  label='Appointment Type'
                  onChange={handleChange}
                >
                  {appointmentTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <TextField
              margin='normal'
              required
              fullWidth
              id='appointmentDetails'
              label='Appointment Details'
              multiline
              rows={4}
              name='appointmentDetails'
              value={appointmentDetails}
              onChange={handleChange}
            />

            <LoadingButton
              loading={isLoading}
              startIcon={<></>}
              loadingPosition='start'
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              {appointment !== null
                ? 'Update Appointment'
                : 'Create Appointment'}
            </LoadingButton>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default AppointmentForm
