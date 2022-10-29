import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import EmptyLayers from 'assets/img/empty-state.svg'

function EmptyState({ title = '', subTitle = '', containerProps }) {
  return (
    <Box
      sx={{
        height: '50vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
      {...containerProps}
    >
      <Box
        component='img'
        sx={{ my: 3, opacity: 0.25 }}
        alt='robot oops...'
        src={EmptyLayers}
      />
      <Typography sx={{ m: 1 }} variant='h6'>
        {title && title}
      </Typography>
      <Typography variant='p' color='secondary'>
        {subTitle && subTitle}
      </Typography>
    </Box>
  )
}

export default EmptyState
