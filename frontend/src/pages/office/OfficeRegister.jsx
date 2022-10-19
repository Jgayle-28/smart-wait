import { useEffect, useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material'
import { Check as CheckIcon } from 'icons/check'
import StepIcon from 'components/office/registration/StepIcon'
// Steps
import SubscriptionLevel from 'components/office/registration/SubscriptionLevel'
import OfficeDetails from 'components/office/registration/OfficeDetails'
import BillingInfo from 'components/office/registration/BillingInfo'
import { initialFormState } from 'constants/office'
import { Stack } from '@mui/system'
import { Logo } from 'components/logo'
import main from 'assets/img/registration/main.jpg'

function OfficeRegister() {
  const [formData, setFormData] = useState(initialFormState)
  const [activeStep, setActiveStep] = useState(0)
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    console.log('formData ::>>', formData)
  }, [formData])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleComplete = () => {
    setComplete(true)
  }

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
    } else if (
      name === 'cardNumber' ||
      name === 'expirationDate' ||
      name === 'cvv'
    ) {
      setFormData((prevState) => ({
        ...prevState,
        billing: { ...prevState.billing, [name]: value },
      }))
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }))
    }
  }

  const getBgImg = () => {
    return main
  }

  const steps = [
    {
      label: 'Subscription Level',
      content: (
        <SubscriptionLevel
          onBack={handleBack}
          onNext={handleNext}
          formData={formData}
          setFormData={setFormData}
        />
      ),
    },
    {
      label: 'Office Details',
      content: (
        <OfficeDetails
          onBack={handleBack}
          onNext={handleNext}
          formData={formData}
          handleChange={handleChange}
        />
      ),
    },
    {
      label: 'Billing Information',
      content: (
        <BillingInfo
          onBack={handleBack}
          onNext={handleComplete}
          formData={formData}
          handleChange={handleChange}
        />
      ),
    },
  ]

  return (
    <>
      <Box component='main' sx={{ display: 'flex', flexGrow: 1 }}>
        <Grid container sx={{ flexGrow: 1 }}>
          {/* Image */}
          <Grid
            item
            sm={4}
            xs={12}
            sx={{
              height: '100vh',
              width: '100%',
              backgroundImage: `url(${getBgImg()})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              display: {
                xs: 'none',
                md: 'block',
              },
            }}
          ></Grid>
          {/* Form */}
          <Grid
            item
            zeroMinWidth
            xs={12}
            md={8}
            sx={{
              pl: {
                xs: 4,
                sm: 6,
                md: 8,
              },
              pt: {
                xs: 4,
                sm: 6,
                md: 8,
              },
              overflowY: 'auto',
            }}
          >
            <Box maxWidth='sm' sx={{ maxHeight: '100%', overflowY: 'auto' }}>
              {!complete && (
                <Typography sx={{ mb: 3 }} variant='h4'>
                  Register Office
                </Typography>
              )}
              {!complete ? (
                <Box component='div'>
                  <Stepper
                    activeStep={activeStep}
                    orientation='vertical'
                    sx={{
                      '& .MuiStepConnector-line': {
                        ml: 1,
                        borderLeftColor: 'divider',
                        borderLeftWidth: 2,
                      },
                    }}
                  >
                    {steps.map((step, index) => (
                      <Step key={step.label}>
                        <StepLabel StepIconComponent={StepIcon}>
                          <Typography sx={{ ml: 2 }} variant='overline'>
                            {step.label}
                          </Typography>
                        </StepLabel>
                        <StepContent
                          sx={{
                            overflowY: 'auto',
                            ml: '20px',
                            borderLeftColor: 'divider',
                            borderLeftWidth: 2,
                            ...(activeStep === index && {
                              py: 4,
                            }),
                          }}
                        >
                          {step.content}
                        </StepContent>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              ) : (
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
                      <Typography variant='subtitle1'>
                        {formData.name}
                      </Typography>
                      <Typography color='textSecondary' variant='caption'>
                        Email: {formData.email}
                      </Typography>
                      <Typography
                        color='textSecondary'
                        noWrap
                        variant='caption'
                      >
                        Phone: {formData.phoneNumber}
                      </Typography>
                      <Typography
                        color='textSecondary'
                        noWrap
                        variant='caption'
                      >
                        Rooms: {formData.numOfRooms}
                      </Typography>
                    </Stack>
                    <div>
                      <Stack spacing={1}>
                        <Typography color='textSecondary' variant='caption'>
                          Street: {formData.address.street}
                        </Typography>
                        <Typography
                          color='textSecondary'
                          noWrap
                          variant='caption'
                        >
                          City: {formData.address.city}
                        </Typography>
                        <Typography
                          color='textSecondary'
                          noWrap
                          variant='caption'
                        >
                          Zip Code: {formData.address.zip}
                        </Typography>
                        <Typography
                          color='textSecondary'
                          noWrap
                          variant='caption'
                        >
                          state: {formData.address.state}
                        </Typography>
                      </Stack>
                    </div>
                  </Card>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default OfficeRegister
