import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material'
import { PencilAlt as PencilAltIcon } from 'icons/pencil-alt'
import { Home as HomeIcon } from 'icons/home'
import { Mail as MailIcon } from 'icons/mail'
import { ClipboardList as ClipboardListIcon } from 'icons/clipboard-list'
import { CreditCard as CreditCardIcon } from 'icons/credit-card'
import { useEffect, useState } from 'react'

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

function Billing() {
  const [officeInfo, setOfficeInfo] = useState(profile)
  const { officeEmail, officeLocation, officeSubscription, paymentMethod } =
    profile

  useEffect(() => {
    setOfficeInfo(profile)
  }, [])

  return (
    <>
      <Card>
        <CardHeader
          subheader='Current subscription, office information and billing information'
          title='Account Information'
        />
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
          <List>
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
                    {officeLocation}
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
                    {officeEmail}
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
                    {officeSubscription}
                  </Typography>
                }
              />
            </ListItem>

            <ListItem disableGutters sx={{ paddingLeft: 3 }}>
              <ListItemAvatar sx={{ color: 'action.active' }}>
                <CreditCardIcon fontSize='small' />
              </ListItemAvatar>
              <ListItemText
                disableTypography
                primary={
                  <Typography variant='subtitle2'>
                    Payment Information:
                  </Typography>
                }
                secondary={
                  <Typography color='textSecondary' variant='body2'>
                    <b>Card Number: </b>
                    {paymentMethod.cardNumber}
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
        // onClick={toggleModal}
      >
        Edit account information
      </Button>
    </>
  )
}

export default Billing
