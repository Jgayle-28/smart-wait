import { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
  IconButton,
  Button,
  Badge,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from 'store/admin/adminSlice'
import { Plus as PlusIcon } from 'icons/plus'
import { PencilAlt as PencilAltIcon } from 'icons/pencil-alt'
import ShieldIcon from '@mui/icons-material/Shield'
import Modal from 'components/shared/Modal'
import CreateUser from '../CreateUser'

function UserList() {
  const dispatch = useDispatch()
  const { users } = useSelector((state) => state.admin)

  const [selectedUser, setSelectedUser] = useState(null)
  const [applicationUsers, setApplicationUsers] = useState([])
  const [userModalOpen, setUserModalOpen] = useState(false)

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  useEffect(() => {
    if (users) setApplicationUsers(users)
  }, [users])

  const toggleModal = () => {
    setUserModalOpen((prevState) => !prevState)
  }

  const userModalCallback = () => {
    dispatch(getUsers())
    if (selectedUser !== null) setSelectedUser(null)
    toggleModal()
  }

  const handleEditClick = (user) => {
    setSelectedUser(user)
    toggleModal()
  }

  return (
    <>
      <Card>
        <CardHeader
          subheader='Manage application users'
          title='Application Users'
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
          <List disablePadding>
            {applicationUsers.map((user, index) => (
              <ListItem
                sx={{
                  '&:hover': {
                    backgroundColor: '#F2F1FD',
                  },
                }}
                divider={index + 1 < applicationUsers.length}
                key={user._id}
              >
                <ListItemAvatar>
                  <Badge
                    overlap='circular'
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    badgeContent={
                      user.role.includes('admin') && (
                        <ShieldIcon
                          fontSize='small'
                          sx={{ color: 'warning.light' }}
                        />
                      )
                    }
                  >
                    <Avatar
                      sx={{
                        bgcolor: 'secondary.light',
                      }}
                    />
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  disableTypography
                  primary={
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                      }}
                    >
                      <Typography variant='subtitle2'>{user.name}</Typography>
                    </Box>
                  }
                  secondary={
                    <Typography color='textSecondary' variant='body2'>
                      {user.email}
                    </Typography>
                  }
                  sx={{ pr: 2 }}
                />
                <Typography
                  color='textSecondary'
                  sx={{ whiteSpace: 'nowrap' }}
                  variant='caption'
                >
                  <IconButton onClick={() => handleEditClick(user)}>
                    <PencilAltIcon fontSize='small' />
                  </IconButton>
                </Typography>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      <Button
        startIcon={<PlusIcon fontSize='small' />}
        sx={{ mt: 2 }}
        variant='outlined'
        onClick={toggleModal}
      >
        Add new user
      </Button>
      <Modal
        title=''
        isOpen={userModalOpen}
        toggleModal={toggleModal}
        noPadding
      >
        <CreateUser user={selectedUser} callBack={userModalCallback} />
      </Modal>
    </>
  )
}

export default UserList
