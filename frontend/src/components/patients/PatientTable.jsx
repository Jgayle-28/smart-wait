import { useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import PropTypes from 'prop-types'
import {
  Avatar,
  Box,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material'
import { tableCellClasses } from '@mui/material/TableCell'
import LaunchIcon from '@mui/icons-material/Launch'
import { getInitials } from 'utils/get-initials'
import Modal from 'components/shared/Modal'
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import CustomTooltip from 'components/shared/CustomTooltip'
import { format } from 'date-fns'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
  },
}))

function PatientTable({ patients, ...rest }) {
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(0)

  const [selectedPatient, setSelectedPatient] = useState(null)
  const [userModalOpen, setUserModalOpen] = useState(false)

  const navigate = useNavigate()

  const toggleModal = () => {
    // This clears a user if the modal is closed
    if (selectedPatient !== null) setSelectedPatient(null)
    setUserModalOpen((prevState) => !prevState)
  }

  const handleLimitChange = (event) => {
    setLimit(event.target.value)
  }

  const handlePageChange = (event, newPage) => {
    setPage(newPage)
  }

  const handlePatientClick = (patient) => {
    navigate(`/patients/${patient._id}`)
  }

  const getPatientDescription = (desc) => {
    if (desc.length > 30) {
      const tempText = `${desc.slice(0, 30)}...`
      return (
        <CustomTooltip
          sx={{
            cursor: 'pointer',
          }}
          title={desc}
        >
          <Typography color='textSecondary' variant='body2'>
            {tempText}
          </Typography>
        </CustomTooltip>
      )
    } else {
      return (
        <Typography color='textSecondary' variant='body2'>
          {desc}
        </Typography>
      )
    }
  }

  return (
    <>
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead sx={{ bgcolor: 'primary.light' }}>
                <TableRow>
                  <StyledTableCell padding='checkbox'></StyledTableCell>
                  <StyledTableCell sx={{ color: '#fff' }}>Name</StyledTableCell>
                  <StyledTableCell>Information</StyledTableCell>
                  <StyledTableCell>Address</StyledTableCell>
                  <StyledTableCell>Phone</StyledTableCell>
                  <StyledTableCell>DOB</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patients.slice(0, limit).map((patient) => (
                  <TableRow
                    hover
                    key={patient._id}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: '#F2F1FD',
                      },
                    }}
                  >
                    <TableCell>
                      <IconButton onClick={() => handlePatientClick(patient)}>
                        <LaunchIcon
                          sx={{ color: 'text.disabled' }}
                          fontSize='small'
                        />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex',
                        }}
                      >
                        <Avatar sx={{ mr: 2, bgcolor: 'secondary.light' }}>
                          {getInitials(patient.name)}
                        </Avatar>
                        <Box sx={{ ml: 1 }}>
                          <Typography color='textPrimary' variant='subtitle2'>
                            {patient.name}
                          </Typography>
                          <Typography color='textSecondary' variant='body2'>
                            {patient.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography noWrap color='textSecondary' variant='body2'>
                        {getPatientDescription(patient.patientDescription)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color='textSecondary' variant='body2'>
                        {patient.address.formattedAddress &&
                          patient.address.formattedAddress}
                      </Typography>
                    </TableCell>
                    <TableCell>{patient.phoneNumber}</TableCell>
                    <TableCell>
                      <Typography color='textSecondary' variant='body2'>
                        {format(new Date(patient.dob), 'MM/dd/yyyy')}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component='div'
          count={patients.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
      <Modal
        title=''
        isOpen={userModalOpen}
        toggleModal={toggleModal}
        noPadding
      >
        <h1>Edit Patient Form</h1>
      </Modal>
    </>
  )
}

export default PatientTable

PatientTable.propTypes = {
  patients: PropTypes.array.isRequired,
}
