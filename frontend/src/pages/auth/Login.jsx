import { useState } from "react"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import Alert from "@mui/material/Alert"
import { Logo } from "components/logo"

const initialFormValues = {
  name: "",
  email: "",
}

function Login() {
  const [formData, setFormData] = useState(initialFormValues)
  const [formFeedback, setFormFeedback] = useState({
    type: "error",
    message: "This is an error alert — check it out YO!",
  })

  const { name, email, role, password, confirmPassword } = formData

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Reset the form feed back if any
    if (formFeedback) setFormFeedback(null)

    const tempData = { ...formData }

    if (password !== confirmPassword) {
      return setFormFeedback({
        type: "error",
        message: "Passwords do not match.",
      })
    }

    delete tempData.confirmPassword
    tempData.isAdmin = tempData.role === "admin" ? true : false

    try {
      // Call api
      setFormData(initialFormValues)
    } catch (error) {
      setFormFeedback({
        type: "error",
        message: "Error creating user, please try again.",
      })
    }

    console.log("tempData :>> ", tempData)
  }
  return (
    <div>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 12,
          }}
        >
          <Logo />
          <Typography component='h1' variant='h5'>
            Create User
          </Typography>
          {formFeedback && (
            <Box mt={4} sx={{ width: "100%" }}>
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
              id='name'
              label='Name'
              name='name'
              value={name}
              onChange={handleChange}
            />
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
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Create New User
            </Button>
          </Box>
        </Box>
        {/* <Copyright /> */}
      </Container>
    </div>
  )
}

export default Login
