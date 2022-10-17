import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material'

function StatCard({ label, icon, iconColor, stat, ...rest }) {
  return (
    <Card sx={{ height: '100%' }} {...rest}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color='textSecondary' gutterBottom variant='overline'>
              {label}
            </Typography>
            <Typography color='textPrimary' variant='h4'>
              {stat}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: iconColor,
                height: 56,
                width: 56,
              }}
            >
              {icon}
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StatCard
