// import { useState } from 'react'
import { Box, Button, TextField, Typography, Grid } from '@mui/material'
import { ArrowRight as ArrowRightIcon } from 'icons/arrow-right'
import { formatPhoneNumber } from 'utils/formatPhoneNumber'

function OfficeDetails(props) {
  const { onBack, onNext, formData, handleChange, ...other } = props

  return (
    <div {...other}>
      <Typography variant='h6'>Tell us about your office...</Typography>
      <Box sx={{ mt: 3 }}>
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
        </Grid>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Button
          disabled={
            !formData.name.length ||
            !formData.email.length ||
            !formData.phoneNumber.length ||
            !formData.address.street.length ||
            !formData.address.city.length ||
            !formData.address.state.length ||
            !formData.address.zip.length ||
            !formData.numOfRooms.length
          }
          endIcon={<ArrowRightIcon fontSize='small' />}
          onClick={onNext}
          variant='contained'
        >
          Continue
        </Button>
        <Button onClick={onBack} sx={{ ml: 2 }}>
          Back
        </Button>
      </Box>
    </div>
  )
}

export default OfficeDetails
