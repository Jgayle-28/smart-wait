import React from 'react'
import { Box, Container } from '@mui/material'
import PatientHeader from 'components/patients/PatientHeader'
import PatientTable from 'components/patients/PatientTable'
import { customers } from 'constants/fakeData'

function Patients() {
  return (
    <>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <PatientHeader />
          <Box sx={{ mt: 3 }}>
            <PatientTable customers={customers} />
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default Patients
