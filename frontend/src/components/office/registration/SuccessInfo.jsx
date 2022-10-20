import { Avatar, Box, Card, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { Logo } from 'components/logo'
import { Check as CheckIcon } from 'icons/check'

function SuccessInfo({ formData, registerStepInfo }) {
  return (
    <Box sx={{ marginTop: 12, height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          my: 4,
        }}
      >
        <Logo />
        <Typography component='h1' variant='h5'>
          Smart Wait
        </Typography>
      </Box>

      <Box display='flex' alignItems='center'>
        <Avatar
          sx={{
            backgroundColor: 'success.main',
            color: 'success.contrastText',
            height: 40,
            width: 40,
          }}
        >
          <CheckIcon />
        </Avatar>

        <Box sx={{ ml: 2 }}>
          <Typography variant='h6'>All done!</Typography>
          <Typography color='textSecondary' variant='body2'>
            Hang tight while we configure Smart Wait for you...
          </Typography>
        </Box>
      </Box>
      {/* Office details */}
      <Card
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          mt: 2,
          px: 2,
          py: 1.5,
        }}
        variant='outlined'
      >
        <Stack spacing={1} sx={{ mr: { xs: 0, md: 5 } }}>
          <Typography variant='subtitle1'>{formData.name}</Typography>
          <Typography color='textSecondary' variant='caption'>
            Email: {formData.email}
          </Typography>
          <Typography color='textSecondary' noWrap variant='caption'>
            Phone: {formData.phoneNumber}
          </Typography>
          <Typography color='textSecondary' noWrap variant='caption'>
            Rooms: {formData.numOfRooms}
          </Typography>
        </Stack>
        <div>
          <Stack spacing={1}>
            <Typography color='textSecondary' variant='caption'>
              Street: {formData.address.street}
            </Typography>
            <Typography color='textSecondary' noWrap variant='caption'>
              City: {formData.address.city}
            </Typography>
            <Typography color='textSecondary' noWrap variant='caption'>
              Zip Code: {formData.address.zip}
            </Typography>
            <Typography color='textSecondary' noWrap variant='caption'>
              state: {formData.address.state}
            </Typography>
          </Stack>
        </div>
      </Card>
      <Box sx={{ mt: 3 }}>
        <Typography
          align='center'
          color={
            registerStepInfo.includes('Good') ? 'success.main' : 'primary.main'
          }
          variant='h5'
        >
          {registerStepInfo}
        </Typography>
      </Box>
    </Box>
  )
}

export default SuccessInfo
