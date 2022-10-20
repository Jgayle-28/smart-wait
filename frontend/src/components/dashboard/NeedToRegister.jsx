import { Box, Typography } from '@mui/material'
import robot from 'assets/img/robot-stuff.svg'

function NeedToRegister() {
  return (
    <Box
      component='main'
      sx={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box component='img' sx={{ my: 3 }} alt='robot oops...' src={robot} />
      <Typography gutterBottom color='textPrimary' variant='h3'>
        Looks like you need to register your office
      </Typography>
      <Typography color='textSecondary' variant='body2'>
        Please hang tight while being redirected...
      </Typography>
    </Box>
  )
}

export default NeedToRegister
