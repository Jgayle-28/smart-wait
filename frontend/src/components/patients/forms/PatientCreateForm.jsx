import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Alert,
  Grid,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingButton } from '@mui/lab'
import { createPatient } from 'store/patients/patientsSlice'
import { useNotification } from 'hooks/useNotification'
import { initialFormState } from 'constants/patients'

function PatientCreateForm({ toggleModal, callBack }) {
  const [formData, setFormData] = useState(initialFormState)
  const [formFeedback, setFormFeedback] = useState(null)

  const { name, email, phoneNumber, patientDescription, address, dob } =
    formData

  const { isLoading } = useSelector((state) => state.patients)
  const { displayNotification } = useNotification()
  const dispatch = useDispatch()

  useEffect(() => {
    // Reset the form feed back if any Errors
    if (formFeedback !== null) {
      setTimeout(() => {
        setFormFeedback(null)
      }, 7000)
    }
  }, [formFeedback])

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'street' || name === 'state' || name === 'zip') {
      setFormData((prevState) => ({
        ...prevState,
        address: { ...prevState.address, [name]: value },
      }))
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // if (!name.trim().indexOf(' ') != -1) {
    //   return setFormFeedback({
    //     type: 'error',
    //     message: 'Patient must have a first & last name',
    //   })
    // }
    const newPatient = { ...formData }
    newPatient.address = {
      formattedAddress: `${address.street} ${address.state}`,
      ...address,
    }

    dispatch(createPatient(newPatient))
      .unwrap()
      .then(() => {
        setFormData(initialFormState)
        callBack()
        displayNotification({
          message: 'Patient has been successfully added.',
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

  return (
    <>
      <Card>
        <CardHeader
          title='Add Patient'
          subheader='Add a new patient to the office directory'
        />
        <Divider />
        <CardContent>
          {formFeedback && (
            <Box mb={3} sx={{ width: '100%' }}>
              <Alert severity={formFeedback.type}>{formFeedback.message}</Alert>
            </Box>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label='Full name'
              name='name'
              onChange={handleChange}
              value={name}
              required
            />
            <TextField
              fullWidth
              label='Email address'
              name='email'
              onChange={handleChange}
              required
              type='email'
              value={email}
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              label='Phone Number'
              name='phoneNumber'
              onChange={handleChange}
              value={phoneNumber}
              sx={{ mt: 2 }}
              required
            />
            <TextField
              fullWidth
              label='Date Of Birth'
              name='dob'
              onChange={handleChange}
              value={dob}
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              label='Street Address'
              name='street'
              onChange={handleChange}
              value={address.street}
              sx={{ mt: 2 }}
            />
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  label='State'
                  name='state'
                  onChange={handleChange}
                  value={address.state}
                  sx={{ mt: 2 }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label='Zip Code'
                  name='zip'
                  onChange={handleChange}
                  value={address.zip}
                  sx={{ mt: 2 }}
                />
              </Grid>
            </Grid>
            <TextField
              fullWidth
              label='Patient Description'
              helperText='Any important information about the patient you would like to keep track of'
              name='patientDescription'
              multiline
              rows={4}
              onChange={handleChange}
              value={patientDescription}
              sx={{ mt: 2 }}
            />
            <Box flex>
              <LoadingButton
                loadingPosition='start'
                loading={isLoading}
                startIcon={<></>}
                type='submit'
                sx={{ mr: 1, mt: 3 }}
                variant='contained'
              >
                Add Patient
              </LoadingButton>
              <Button
                disabled={isLoading}
                variant='outlined'
                onClick={toggleModal}
                sx={{ mt: 3 }}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </>
  )
}

export default PatientCreateForm
