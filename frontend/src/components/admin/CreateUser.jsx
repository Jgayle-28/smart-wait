import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createUser } from 'store/auth/authSlice'
// MUI
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Alert from '@mui/material/Alert'
import { useNotification } from 'hooks/useNotification'
import { deleteUser, updateUser } from 'store/admin/adminSlice'
import { initialFormValues } from 'constants/users'

function CreateUser({ user = null, callBack }) {
  const { isLoading } = useSelector((state) => state.auth)
  const { office } = useSelector((state) => state.offices)
  const dispatch = useDispatch()
  const { displayNotification } = useNotification()

  const [formData, setFormData] = useState(initialFormValues)
  const [formFeedback, setFormFeedback] = useState(null)

  const { name, email, role, password, confirmPassword } = formData

  useEffect(() => {
    if (user !== null) {
      const tempUser = { ...user }
      delete tempUser.password
      setFormData(tempUser)
    }
    return () => setFormData(initialFormValues)
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

    if (!user && password !== confirmPassword) {
      return setFormFeedback({
        type: 'error',
        message: 'Passwords do not match.',
      })
    }

    delete userData.confirmPassword
    userData.isAdmin = userData.role === 'admin' ? true : false
    userData.office = office._id

    if (user) {
      dispatch(updateUser(userData))
        .unwrap()
        .then(() => {
          setFormData(initialFormValues)
          callBack()
          displayNotification({
            message: 'User has been updated',
            type: 'success',
          })
        })
        .catch((error) =>
          setFormFeedback({
            type: 'error',
            message: error,
          })
        )
    } else {
      dispatch(createUser(userData))
        .unwrap()
        .then(() => {
          setFormData(initialFormValues)
          callBack()
          displayNotification({
            message: 'New user has been created',
            type: 'success',
          })
        })
        .catch((error) =>
          setFormFeedback({
            type: 'error',
            message: error,
          })
        )
    }
  }

  const handleUserDelete = () => {
    // The user comes from passed in user
    dispatch(deleteUser(user._id))
      .unwrap()
      .then(() => {
        setFormData(initialFormValues)
        callBack()
        displayNotification({
          message: 'User has been deleted',
          type: 'info',
        })
      })
      .catch((error) =>
        setFormFeedback({
          type: 'error',
          message: error,
        })
      )
  }

  return (
    <>
      <Card>
        <CardHeader
          subheader={user ? '' : 'Add office personnel to Smart Wait'}
          title={user ? 'Edit User' : 'Create User'}
          action={
            user && (
              <Button variant='text' color='error' onClick={handleUserDelete}>
                Delete user
              </Button>
            )
          }
        />
        <Divider />
        <CardContent>
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
            <Box mt={2}>
              <FormControl fullWidth>
                <InputLabel>User Role</InputLabel>
                <Select
                  name='role'
                  value={role}
                  label='User Role'
                  onChange={handleChange}
                >
                  <MenuItem value='user'>Application User</MenuItem>
                  <MenuItem value='admin'>Application Admin</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {user === null && (
              <>
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
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='confirmPassword'
                  label='Confirm Password'
                  type='password'
                  id='confirmPassword'
                  value={confirmPassword}
                  onChange={handleChange}
                />
              </>
            )}

            <LoadingButton
              loading={isLoading}
              startIcon={<></>}
              loadingPosition='start'
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              {user !== null ? 'Update User' : 'Create New User'}
            </LoadingButton>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default CreateUser
