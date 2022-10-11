import { useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
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
import { PencilAlt as PencilAltIcon } from 'icons/pencil-alt'
import { getInitials } from 'utils/get-initials'
import Modal from 'components/shared/Modal'

function PatientTable({ customers, ...rest }) {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([])
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(0)

  const [selectedPatient, setSelectedPatient] = useState(null)
  const [userModalOpen, setUserModalOpen] = useState(false)

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

  const handlePatientEdit = (patient) => {
    setSelectedPatient(patient)
    toggleModal()
  }

  return (
    <>
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding='checkbox'>
                    {/* <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color='primary'
                    indeterminate={
                      selectedCustomerIds.length > 0 &&
                      selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  /> */}
                  </TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Information</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>DOB</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.slice(0, limit).map((customer) => (
                  <TableRow
                    hover
                    key={customer.id}
                    // selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#F2F1FD',
                      },
                    }}
                  >
                    <TableCell>
                      <IconButton onClick={() => handlePatientEdit(customer)}>
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
                        <Avatar
                          src={customer.avatarUrl}
                          sx={{ mr: 2, bgcolor: 'secondary.light' }}
                        >
                          {getInitials(customer.name)}
                        </Avatar>
                        <Box sx={{ ml: 1 }}>
                          <Typography color='textPrimary' variant='subtitle2'>
                            {customer.name}
                          </Typography>
                          <Typography color='textSecondary' variant='body2'>
                            {customer.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography color='textSecondary' variant='body2'>
                        Some clickable information here
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color='textSecondary' variant='body2'>
                        {`${customer.address.city}, ${customer.address.state}, ${customer.address.country}`}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color='textSecondary' variant='body2'>
                        {customer.phone}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color='textSecondary' variant='body2'>
                        {format(customer.createdAt, 'dd/MM/yyyy')}
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
          count={customers.length}
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
  customers: PropTypes.array.isRequired,
}
