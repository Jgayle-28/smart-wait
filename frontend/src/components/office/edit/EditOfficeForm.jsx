import { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Divider,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useDispatch, useSelector } from 'react-redux'
import { updateOffice } from 'store/offices/officeSlice'
import { useNotification } from 'hooks/useNotification'
import { initialFormState, subscriptionLevels } from 'constants/office'
import { formatPhoneNumber } from 'utils/formatPhoneNumber'
import Spinner from 'components/shared/Spinner'

function EditOfficeForm({ toggleModal }) {
  const dispatch = useDispatch()
  const { office, isLoading } = useSelector((state) => state.offices)
  const { displayNotification } = useNotification()

  const [formData, setFormData] = useState(null)

  useEffect(() => {
    if (office) setFormData(office)

    return () => setFormData(initialFormState)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target

    if (
      name === 'street' ||
      name === 'state' ||
      name === 'zip' ||
      name === 'city'
    ) {
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

  const handleSubmit = () => {
    let officeData = { ...formData }

    officeData.address = {
      ...officeData.address,
      formattedAddress: `${formData.address.street}, ${formData.address.city}, ${formData.address.zip}`,
    }

    dispatch(updateOffice(officeData))
      .unwrap()
      .then(() => {
        displayNotification({
          type: 'success',
          message: 'Office Information successfully updated.',
        })
        toggleModal()
      })
      .catch((error) => {
        displayNotification({
          type: 'error',
          message: `Oops, something went wrong, please try agin. ${error}`,
        })
      })
  }

  if (formData === null) return <Spinner />
  return (
    <>
      <Card>
        <CardHeader title='Edit Office Information' />
        <Divider />
        <CardContent
          sx={{
            paddingBottom: 0,
            '&:last-child': {
              paddingBottom: 0,
            },
          }}
        >
          <Box sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  label='Name of your office'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  type='email'
                  label='Office Email'
                  placeholder='Best contact email for your office'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  label='Office Phone Number'
                  placeholder='Best contact phone number for your office'
                  name='phoneNumber'
                  value={formatPhoneNumber(formData.phoneNumber)}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  label='Street'
                  placeholder='Street name and number of your office'
                  name='street'
                  value={formData.address.street}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  label='City'
                  placeholder='City where your office is located'
                  name='city'
                  value={formData.address.city}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='State'
                  placeholder='Two letter state abbreviation'
                  name='state'
                  value={formData.address.state}
                  onChange={handleChange}
                  inputProps={{ maxLength: 2 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='State'
                  placeholder='State where your office is located'
                  name='zip'
                  value={formData.address.zip}
                  onChange={handleChange}
                  inputProps={{ maxLength: 5 }}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  type='number'
                  label='Office Rooms'
                  placeholder='Number of rooms you plan on using Smart Wait to manage'
                  helperText='This will help us configure Smart Wait for your office'
                  name='numOfRooms'
                  value={formData.numOfRooms}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl fullWidth>
                  <InputLabel>Subscription Level</InputLabel>
                  <Select
                    name='subscription'
                    value={formData.subscription}
                    label='Subscription Level'
                    onChange={handleChange}
                  >
                    {subscriptionLevels.map((level) => (
                      <MenuItem key={level.value} value={level.value}>
                        {level.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <LoadingButton
              loading={isLoading}
              startIcon={<></>}
              loadingPosition='start'
              fullWidth
              variant='contained'
              onClick={handleSubmit}
              sx={{ my: 2 }}
            >
              Update Information
            </LoadingButton>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default EditOfficeForm
