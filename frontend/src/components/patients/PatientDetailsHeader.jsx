import { Avatar, Box, Button, Chip, Grid, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { PencilAlt as PencilAltIcon } from 'icons/pencil-alt'
import { getInitials } from 'utils/get-initials'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deletePatient } from 'store/patients/patientsSlice'
import { useNotification } from 'hooks/useNotification'

function PatientDetailsHeader({ isEditing }) {
  const { patient } = useSelector((state) => state.patients)
  const { name, email } = patient

  const { id } = useParams()
  const { displayNotification } = useNotification()
  const dispatch = useDispatch()

  const handlePatientDelete = () => {
    dispatch(deletePatient(id))
      .unwrap()
      .then(() => {
        navigate('/patients')
        displayNotification({
          message: 'Patient has been deleted',
          type: 'info',
        })
      })
      .catch((error) =>
        displayNotification({
          message: 'Error deleting patient.',
          type: 'error',
        })
      )
  }

  const navigate = useNavigate()

  return (
    <Box sx={{ mb: 4 }}>
      {!isEditing && (
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon fontSize='small' />}
            variant='text'
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </Box>
      )}

      <Grid container justifyContent='space-between' spacing={3}>
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex',
            overflow: 'hidden',
          }}
        >
          <Avatar
            sx={{
              bgcolor: 'secondary.light',
              height: 64,
              mr: 2,
              width: 64,
            }}
          >
            {getInitials(name)}
          </Avatar>
          <div>
            <Typography variant='h4'>{email}</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography variant='subtitle2'>Patient Name:</Typography>
              <Chip label={name} size='small' sx={{ ml: 1 }} />
            </Box>
          </div>
        </Grid>
        {!isEditing && (
          <Grid item sx={{ m: -1 }}>
            <Button
              onClick={() =>
                navigate(`/patients/${id}/edit`, { replace: true })
              }
              endIcon={<PencilAltIcon fontSize='small' />}
              sx={{ m: 1 }}
              variant='outlined'
            >
              Edit
            </Button>

            <Button
              color='error'
              sx={{ m: 1 }}
              variant='text'
              onClick={handlePatientDelete}
            >
              Delete Patient
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}

export default PatientDetailsHeader
