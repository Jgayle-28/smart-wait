import PropTypes from 'prop-types'
import {
  List,
  Card,
  CardHeader,
  Divider,
  useMediaQuery,
  Box,
} from '@mui/material'
import InfoListItem from 'components/shared/InfoListItem'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'

function PatientDetails() {
  const { patient } = useSelector((state) => state.patients)
  const { email, phoneNumber, patientDescription, address, dob } = patient

  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'))

  const align = mdUp ? 'horizontal' : 'vertical'

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Card>
          <CardHeader title='Patient Details' />
          <Divider />
          <List disablePadding>
            <InfoListItem align={align} divider label='Email' value={email} />
            <InfoListItem
              align={align}
              divider
              label='Phone Number'
              value={phoneNumber}
            />
            <InfoListItem
              align={align}
              divider
              label='Patient Information'
              value={patientDescription}
            />
            <InfoListItem
              align={align}
              divider
              label='Street'
              value={address.street}
            />
            <InfoListItem
              align={align}
              divider
              label='State'
              value={address.state}
            />
            <InfoListItem
              align={align}
              divider
              label='Zip Code'
              value={address.zip}
            />
            <InfoListItem
              align={align}
              label='DOB'
              value={format(new Date(patient.dob), 'MM/dd/yyyy')}
            />
          </List>
        </Card>
      </Box>
    </>
  )
}

export default PatientDetails
