import { Box, Container, Typography, Grid } from '@mui/material'
import CreateUser from 'components/admin/CreateUser.page'
import UserList from 'components/admin/UserList'
function Admin() {
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
            <Grid item xs={12} md={12}>
              <UserList />
            </Grid>
            <Grid item xs={12} md={6}>
              <CreateUser />
            </Grid>
            <Grid item xs={12} md={6}>
              <UserList />
            </Grid>
          </Grid>
          {/* <Box sx={{ pt: 3 }}>
            <SettingsPassword />
          </Box> */}
        </Container>
      </Box>
    </>
  )
}

export default Admin
