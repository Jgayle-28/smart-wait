import { Box, Container, Typography, Grid } from '@mui/material'
import Billing from 'components/admin/Billing'
import UserList from 'components/admin/user-list/UserList'
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
            <Grid item xs={12} md={6}>
              <UserList />
            </Grid>

            <Grid item xs={12} md={6}>
              <Billing />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default Admin
