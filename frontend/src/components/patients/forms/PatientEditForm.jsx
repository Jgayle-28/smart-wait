import { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNotification } from 'hooks/useNotification'
import { deletePatient, updatePatient } from 'store/patients/patientsSlice'
import { initialFormState } from 'constants/patients'
import { formatPhoneNumber } from 'utils/formatPhoneNumber'

function PatientForm() {
  const [hasNotEdited, setHasNotEdited] = useState(true)
  const [formData, setFormData] = useState(initialFormState)
  const { name, email, phoneNumber, patientDescription, address, dob } =
    formData

  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { displayNotification } = useNotification()
  const { patient, isLoading } = useSelector((state) => state.patients)

  useEffect(() => {
    if (patient) {
      setFormData(patient)
    }
  }, [patient])

  useEffect(() => {
    if (formData !== patient) {
      setHasNotEdited(false)
    }
    if (formData === patient) {
      setHasNotEdited(true)
    }
  }, [patient, formData])

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

    const newPatient = { ...formData }
    newPatient.address = {
      formattedAddress: `${address.street} ${address.state}`,
      ...address,
    }

    dispatch(updatePatient(newPatient))
      .unwrap()
      .then(() => {
        setFormData(initialFormState)
        handleNavigateBack()
        displayNotification({
          message: 'Patient has been successfully updated.',
          type: 'success',
        })
      })
      .catch((error) =>
        displayNotification({
          type: 'error',
          message: error,
        })
      )
  }

  const handlePatientDelete = () => {
    dispatch(deletePatient(id))
      .unwrap()
      .then(() => {
        navigate('/patients')
        displayNotification({
          message: 'Patient has been deleted',
          type: 'info',
        })
      })
      .catch((error) =>
        displayNotification({
          message: 'Error deleting patient.',
          type: 'error',
        })
      )
  }

  const handleNavigateBack = () => {
    navigate(`/patients/${id}`, { replace: true })
  }
  return (
    <>
      <Box
        component='main'
        sx={{
          backgroundColor: 'background.default',
          flexGrow: 1,
        }}
      >
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader title='Edit Patient' />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label='Full name'
                    name='name'
                    onChange={handleChange}
                    value={name}
                    required
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label='Email address'
                    name='email'
                    onChange={handleChange}
                    required
                    value={email}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label='Phone Number'
                    name='phoneNumber'
                    onChange={handleChange}
                    value={formatPhoneNumber(phoneNumber)}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label='Date Of Birth'
                    name='dob'
                    onChange={handleChange}
                    value={dob}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label='Street Address'
                    name='street'
                    onChange={handleChange}
                    value={address.street}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label='State'
                    name='state'
                    onChange={handleChange}
                    value={address.state}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label='Zip Code'
                    name='zip'
                    onChange={handleChange}
                    value={address.zip}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label='Patient Description'
                    helperText='Any important information about the patient you would like to keep track of'
                    name='patientDescription'
                    multiline
                    rows={4}
                    onChange={handleChange}
                    value={patientDescription}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions
              sx={{
                flexWrap: 'wrap',
                m: -1,
              }}
            >
              <Button
                disabled={hasNotEdited}
                type='submit'
                sx={{ m: 1 }}
                variant='contained'
              >
                Update Patient
              </Button>

              <Button
                disabled={isLoading}
                sx={{
                  m: 1,
                  mr: 'auto',
                }}
                variant='outlined'
                onClick={handleNavigateBack}
              >
                Cancel
              </Button>

              <Button
                color='error'
                disabled={isLoading}
                onClick={handlePatientDelete}
              >
                Delete user
              </Button>
            </CardActions>
          </form>
        </Card>
      </Box>
    </>
  )
}

export default PatientForm
