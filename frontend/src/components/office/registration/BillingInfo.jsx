import { useState } from 'react'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { ArrowRight as ArrowRightIcon } from 'icons/arrow-right'

function BillingInfo(props) {
  const { onBack, onNext, formData, handleChange, ...other } = props

  return (
    <div {...other}>
      <Typography variant='h6'>Your billing information...</Typography>
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              label='Card Number'
              name='cardNumber'
              value={formData.billing.cardNumber}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label='Expiration Date'
              name='expirationDate'
              value={formData.billing.expirationDate}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type='number'
              label='Card Security Code'
              name='cvv'
              value={formData.billing.cvv}
              onChange={handleChange}
              inputProps={{ maxLength: 3 }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Button
          disabled={
            !formData.billing.cardNumber.length ||
            !formData.billing.expirationDate.length ||
            !formData.billing.cvv.length
          }
          endIcon={<ArrowRightIcon fontSize='small' />}
          onClick={onNext}
          variant='contained'
        >
          Register office and begin using smart wait
        </Button>
        <Button onClick={onBack} sx={{ ml: 2 }}>
          Back
        </Button>
      </Box>
    </div>
  )
}

export default BillingInfo
