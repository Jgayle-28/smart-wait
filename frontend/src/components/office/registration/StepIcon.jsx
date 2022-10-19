import { Avatar } from '@mui/material'
import { Check as CheckIcon } from 'icons/check'

function StepIcon(props) {
  const { active, completed, icon } = props

  const highlight = active || completed

  return (
    <Avatar
      sx={{
        height: 40,
        width: 40,
        ...(highlight && {
          backgroundColor: 'success.main',
          color: 'success.contrastText',
        }),
      }}
      variant='rounded'
    >
      {completed ? <CheckIcon fontSize='small' /> : icon}
    </Avatar>
  )
}

export default StepIcon
