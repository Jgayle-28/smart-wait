import { Box, Container, Typography, Grid } from '@mui/material'
import OfficeInfo from 'components/admin/OfficeInfo'
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
