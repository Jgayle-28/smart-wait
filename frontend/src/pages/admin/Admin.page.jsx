import { useEffect } from 'react'
import { Box, Container, Typography, Grid } from '@mui/material'
import OfficeInfo from 'components/admin/OfficeInfo'
import UserList from 'components/admin/UserList'
import Spinner from 'components/shared/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { clearUsers, getUsers } from 'store/admin/adminSlice'

function Admin() {
  const dispatch = useDispatch()

  const { office } = useSelector((state) => state.offices)
  const { users } = useSelector((state) => state.admin)
  const { user } = useSelector((state) => state.auth)

  // Only need to dispatch to get users because office is set on initial dashboard load
  useEffect(() => {
    if (user) dispatch(getUsers(user.office))

    return () => dispatch(clearUsers())
  }, [user])

  if (users === null || office === null) return <Spinner />
  return (
    <>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth='lg'>
          <Typography sx={{ mb: 3 }} variant='h4'>
            Admin Panel
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <UserList />
            </Grid>
            <Grid item xs={12} md={6}>
              <OfficeInfo />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default Admin
