import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material'
import { PencilAlt as PencilAltIcon } from 'icons/pencil-alt'
import { Home as HomeIcon } from 'icons/home'
import { Mail as MailIcon } from 'icons/mail'
import { ClipboardList as ClipboardListIcon } from 'icons/clipboard-list'
import { useState } from 'react'
import Modal from 'components/shared/Modal'
import Spinner from 'components/shared/Spinner'
import { useSelector } from 'react-redux'
import EditOfficeForm from 'components/office/edit/EditOfficeForm'

const profile = {
  officeLocation: '127 E Main St Ste D Payson, AZ 85541',
  officeEmail: 'jerehme.gayle@smartwait.io',
  officeSubscription: 'Elite',
  paymentMethod: {
    cardNumber: '1111-1111-1111-1111',
    cardExpiration: '11/26',
    cardCvv: '111',
  },
}

function OfficeInfo() {
  const { office } = useSelector((state) => state.offices)

  const [officeModalOpen, setBillingModalOpen] = useState(false)
  const { name, email, address, subscription } = office

  const toggleModal = () => {
    setBillingModalOpen((prevState) => !prevState)
  }

  if (office === null) <Spinner />
  return (
    <>
      <Card>
        <CardHeader subheader={name} title='Account Information' />
        <Divider />
        <CardContent
          sx={{
            padding: 0,
            paddingBottom: 0,
            '&:last-child': {
              paddingBottom: 0,
            },
          }}
        >
          <List disablePadding>
            <ListItem disableGutters divider sx={{ paddingLeft: 3 }}>
              <ListItemAvatar sx={{ color: 'action.active' }}>
                <HomeIcon fontSize='small' />
              </ListItemAvatar>
              <ListItemText
                disableTypography
                primary={
                  <Typography variant='subtitle2'>Office Location:</Typography>
                }
                secondary={
                  <Typography color='textSecondary' variant='body2'>
                    {address.formattedAddress}
                  </Typography>
                }
              />
            </ListItem>
            <ListItem disableGutters divider sx={{ paddingLeft: 3 }}>
              <ListItemAvatar sx={{ color: 'action.active' }}>
                <MailIcon fontSize='small' />
              </ListItemAvatar>
              <ListItemText
                disableTypography
                primary={
                  <Typography variant='subtitle2'>Office Email:</Typography>
                }
                secondary={
                  <Typography color='textSecondary' variant='body2'>
                    {email}
                  </Typography>
                }
              />
            </ListItem>
            <ListItem disableGutters divider sx={{ paddingLeft: 3 }}>
              <ListItemAvatar sx={{ color: 'action.active' }}>
                <ClipboardListIcon fontSize='small' />
              </ListItemAvatar>
              <ListItemText
                disableTypography
                primary={
                  <Typography variant='subtitle2'>Subscription:</Typography>
                }
                secondary={
                  <Typography color='textSecondary' variant='body2'>
                    {subscription}
                  </Typography>
                }
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
      <Button
        startIcon={<PencilAltIcon fontSize='small' />}
        sx={{ mt: 2 }}
        variant='outlined'
        onClick={toggleModal}
      >
        Edit account information
      </Button>
      <Modal
        title=''
        isOpen={officeModalOpen}
        toggleModal={toggleModal}
        noPadding
      >
        <EditOfficeForm toggleModal={toggleModal} />
      </Modal>
    </>
  )
}

export default OfficeInfo
