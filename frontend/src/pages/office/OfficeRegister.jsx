import { useEffect, useState } from 'react'
import {
  Avatar,
  Box,
  Card,
  Grid,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material'

import StepIcon from 'components/office/registration/StepIcon'
// Steps
import SubscriptionLevel from 'components/office/registration/SubscriptionLevel'
import OfficeDetails from 'components/office/registration/OfficeDetails'
import BillingInfo from 'components/office/registration/BillingInfo'
import { initialFormState } from 'constants/office'
import main from 'assets/img/registration/main.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { registerOffice } from 'store/offices/officeSlice'
import { useNotification } from 'hooks/useNotification'
import { useNavigate } from 'react-router-dom'
import { updateUserOffice } from 'store/auth/authSlice'
import SuccessInfo from 'components/office/registration/SuccessInfo'

function OfficeRegister() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { displayNotification } = useNotification()
  const { user } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState(initialFormState)
  const [activeStep, setActiveStep] = useState(0)
  const [complete, setComplete] = useState(false)
  const [registerStepInfo, setRegisterStepInfo] = useState('')

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }
  const handleSubmit = () => {
    setRegisterStepInfo('Registering office...')
    const officeData = { ...formData }
    const userData = { ...user }

    officeData.address.formattedAddress = `${formData.address.street}, ${formData.address.city}, ${formData.address.zip}`

    // Need to create and process stripe payment
    setRegisterStepInfo('Processing your payment securely using Stripe...')

    // time out for realistic feel of registration
    setTimeout(() => {
      dispatch(registerOffice(officeData))
        .unwrap()
        .then((res) => {
          console.log('res :>> ', res)
          // Update the user with the office id
          setRegisterStepInfo('Updating your profile...')
          dispatch(updateUserOffice({ ...userData, office: res._id }))
            .unwrap()
            .then(() => {
              setRegisterStepInfo('Your Good to go...')
              displayNotification({
                message: 'Office successfully registered.',
                type: 'success',
              })
              setTimeout(() => {
                setFormData(initialFormState)
                navigate(`/dashboard`)
              }, 800)
            })
        })
        .catch((error) =>
          displayNotification({
            message: `Oops, something went wrong please try again. ${error}`,
            type: 'error',
          })
        )
    }, 800)
  }

  const handleComplete = () => {
    setComplete(true)
    // time out for loader
    setTimeout(() => {
      handleSubmit()
    }, 1000)
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
                <SuccessInfo
                  formData={formData}
                  registerStepInfo={registerStepInfo}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default OfficeRegister
