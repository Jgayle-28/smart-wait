import { useState } from 'react'
import { Box, Button, Card, Radio, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { ArrowRight as ArrowRightIcon } from '../../../icons/arrow-right'

const typeOptions = [
  {
    description:
      'Best for small offices that just need standard Smart Wait features.',
    title: 'Standard',
    value: 'Standard',
  },
  {
    description:
      'Comes with all Standard Smart Wait options plus the ability to chat 1 on 1 with your patients.',
    title: 'Business',
    value: 'Business',
  },
  {
    description:
      'Best for those who really want to understand their office and harness the full power of Smart Wait.',
    title: 'Elite',
    value: 'Elite',
  },
]
function SubscriptionLevel(props) {
  const { onBack, onNext, formData, setFormData, ...other } = props
  const [type, setType] = useState(formData.subscription)

  const handleLevelSelect = (newType) => {
    // Handles initial select -> if the user leaves the section and comes bac
    // The value will be the selection in formData
    setType(newType)
    setFormData((prevState) => ({
      ...prevState,
      subscription: newType,
    }))
  }

  return (
    <div {...other}>
      <Typography variant='h6'>
        Choose the plan that best fits your needs...
      </Typography>
      <Box sx={{ mt: 3 }}>
        {typeOptions.map((typeOption) => (
          <Box key={typeOption.value} sx={{ mb: 2 }}>
            <Card
              key={typeOption.value}
              sx={{
                alignItems: 'center',
                cursor: 'pointer',
                display: 'flex',
                p: 2,
                ...(type === typeOption.value && {
                  borderColor: 'primary.main',
                  borderWidth: 2,
                  backgroundColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.08),
                  m: '-1px',
                }),
              }}
              onClick={() => handleLevelSelect(typeOption.value)}
              variant='outlined'
            >
              <Radio checked={type === typeOption.value} color='primary' />
              <Box sx={{ ml: 2 }}>
                <Typography variant='subtitle1'>{typeOption.title}</Typography>
                <Typography color='textSecondary' variant='body2'>
                  {typeOption.description}
                </Typography>
              </Box>
            </Card>
          </Box>
        ))}
      </Box>
      <Button
        disabled={!formData.subscription}
        endIcon={<ArrowRightIcon fontSize='small' />}
        onClick={onNext}
        variant='contained'
      >
        Continue
      </Button>
    </div>
  )
}

export default SubscriptionLevel
