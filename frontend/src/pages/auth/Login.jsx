import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser } from 'store/auth/authSlice'
import { useNavigate } from 'react-router-dom'
// MUI
import LoadingButton from '@mui/lab/LoadingButton'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Alert from '@mui/material/Alert'
import { Logo } from 'components/logo'

const initialFormValues = {
  email: '',
  password: '',
}

function Login() {
  const { user, isLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState(initialFormValues)
  const [formFeedback, setFormFeedback] = useState()

  const { email, password } = formData

  // If the user is logged in take them to dashboard
  useEffect(() => {
    if (user) navigate('/')
  }, [user])

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Reset the form feed back if any Errors
    if (formFeedback) setFormFeedback(null)

    const userData = { ...formData }

    dispatch(loginUser(userData))
      .unwrap()
      .then(() => {
        setFormData(initialFormValues)
        navigate('/')
      })
      .catch((error) =>
        setFormFeedback({
          type: 'error',
          message: error,
        })
      )
  }
  return (
    <div>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 12,
          }}
        >
          <Logo />
          <Typography component='h1' variant='h5'>
            Smart Wait
          </Typography>

          {formFeedback && (
            <Box mt={4} sx={{ width: '100%' }}>
              <Alert severity={formFeedback.type}>{formFeedback.message}</Alert>
            </Box>
          )}
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email'
              name='email'
              value={email}
              onChange={handleChange}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              value={password}
              onChange={handleChange}
            />
            <LoadingButton
              loading={isLoading}
              loadingPosition='start'
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </LoadingButton>
          </Box>
        </Box>
      </Container>
    </div>
  )
}

export default Login
