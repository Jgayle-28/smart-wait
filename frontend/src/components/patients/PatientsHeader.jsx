import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
} from '@mui/material'
import { Search as SearchIcon } from '../../icons/search'
import { Upload as UploadIcon } from '../../icons/upload'
import { Download as DownloadIcon } from '../../icons/download'

function PatientsHeader({ toggleModal, setSearchText, ...rest }) {
  return (
    <Box {...rest}>
      <Box sx={{ m: -1 }}>
        <Typography sx={{ m: 1 }} variant='h4'>
          Patients
        </Typography>
      </Box>
      <Box
        sx={{
          mt: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <TextField
          sx={{ width: { sm: '100%', md: 500 } }}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SvgIcon color='action' fontSize='small'>
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>
            ),
          }}
          placeholder='Search patients'
          variant='outlined'
          onChange={(e) => setSearchText(e.target.value.toLowerCase())}
        />

        <Box sx={{ m: 1 }}>
          {/* <Button startIcon={<UploadIcon fontSize='small' />} sx={{ mr: 1 }}>
            Import
          </Button>
          <Button startIcon={<DownloadIcon fontSize='small' />} sx={{ mr: 1 }}>
            Export
          </Button> */}
          <Button color='primary' variant='contained' onClick={toggleModal}>
            Add Patient
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
export default PatientsHeader
