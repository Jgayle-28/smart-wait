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
import { getInitials } from 'utils/get-initials'
import { styled } from '@mui/material/styles'
import { format } from 'date-fns'
import { PencilAlt as PencilAltIcon } from 'icons/pencil-alt'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import CheckIcon from '@mui/icons-material/Check'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.neutral[600],
  },
}))

function AppointmentsTable({ appointments, handleAppointmentClick, ...rest }) {
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(0)

  const handleLimitChange = (event) => {
    setLimit(event.target.value)
  }

  const handlePageChange = (_, newPage) => {
    setPage(newPage)
  }

  const getTypeIcon = (type) => {
    if (type === 'well-check')
      return <CheckIcon sx={{ color: 'success.main' }} fontSize='small' />
    if (type === 'sick-check')
      return <PriorityHighIcon sx={{ color: 'error.main' }} fontSize='small' />
    if (type === 'concern-check')
      return (
        <QuestionMarkIcon sx={{ color: 'warning.main' }} fontSize='small' />
      )
  }

  return (
    <>
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead sx={{ bgcolor: 'neutral.200' }}>
                <TableRow>
                  <StyledTableCell padding='checkbox'></StyledTableCell>
                  <StyledTableCell>Patient</StyledTableCell>
                  <StyledTableCell>Type</StyledTableCell>
                  <StyledTableCell>Details</StyledTableCell>
                  <StyledTableCell>Phone</StyledTableCell>
                  <StyledTableCell>Appointment Date</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.slice(0, limit).map((appointment) => (
                  <TableRow
                    hover
                    key={appointment._id}
                    sx={{
                      cursor: 'pointer',
                      '&.MuiTableRow-root:hover': {
                        backgroundColor: '#F2F1FD',
                      },
                    }}
                  >
                    <TableCell>
                      <IconButton
                        onClick={() => handleAppointmentClick(appointment)}
                      >
                        <PencilAltIcon
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
                          {getInitials(appointment.patient.name)}
                        </Avatar>
                        <Box sx={{ ml: 1 }}>
                          <Typography color='textPrimary' variant='subtitle2'>
                            {appointment.patient.name}
                          </Typography>
                          <Typography color='textSecondary' variant='body2'>
                            {appointment.patient.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          textTransform: 'capitalize',
                        }}
                        noWrap
                        color='textSecondary'
                        variant='body2'
                      >
                        {getTypeIcon(appointment.appointmentType)}{' '}
                        {appointment.appointmentType.split('-')[0]}
                      </Typography>
                    </TableCell>

                    <TableCell>{appointment.appointmentDetails}</TableCell>
                    <TableCell>{appointment.patient.phoneNumber}</TableCell>
                    <TableCell>
                      <Typography color='textSecondary' variant='body2'>
                        {format(
                          new Date(appointment.appointmentDate),
                          'MM/dd/yyyy'
                        )}
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
          count={appointments.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </>
  )
}

export default AppointmentsTable

AppointmentsTable.propTypes = {
  appointments: PropTypes.array.isRequired,
}
