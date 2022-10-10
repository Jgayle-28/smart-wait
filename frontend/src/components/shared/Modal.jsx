import { useState, forwardRef } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />
})

export default function Modal({
  isOpen,
  toggleModal,
  title,
  noPadding,
  children,
  ...rest
}) {
  return (
    <div>
      <Dialog
        open={isOpen}
        // TransitionComponent={Transition}
        keepMounted
        onClose={toggleModal}
        aria-describedby='alert-dialog-slide-description'
        {...rest}
      >
        {/* {title.length > 0 && (
          <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        )} */}
        <DialogContent sx={{ padding: noPadding && 0 }}>
          {children}
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={toggleModal}>Disagree</Button>
          <Button onClick={toggleModal}>Agree</Button>
        </DialogActions> */}
      </Dialog>
    </div>
  )
}
