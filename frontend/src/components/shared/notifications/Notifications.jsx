import { Snackbar, Alert } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNotification } from 'hooks/useNotification'

function Notifications() {
  const notification = useSelector((state) => state.notification)
  const { clearNotification } = useNotification()

  const handleClose = (_, reason) =>
    reason !== 'clickaway' && clearNotification()

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={notification.open}
      autoHideDuration={notification.timeout}
      onClose={handleClose}
    >
      <Alert
        variant='filled'
        onClose={handleClose}
        severity={notification.type}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  )
}
export default Notifications
