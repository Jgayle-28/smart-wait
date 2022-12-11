import { Doughnut } from 'react-chartjs-2'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  useTheme,
} from '@mui/material'
import LaptopMacIcon from '@mui/icons-material/LaptopMac'
import PhoneIcon from '@mui/icons-material/Phone'
import TabletIcon from '@mui/icons-material/Tablet'
import SpaIcon from '@mui/icons-material/Spa'
import SickIcon from '@mui/icons-material/Sick'
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert'

function VisitType(props) {
  const theme = useTheme()

  const data = {
    datasets: [
      {
        data: [63, 15, 22],
        backgroundColor: ['#14B8A6', '#e53935', '#FB8C00'],
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF',
      },
    ],
    labels: ['Well', 'Sick', 'Concern'],
  }

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary,
    },
  }

  const devices = [
    {
      title: 'Well',
      value: 63,
      icon: SpaIcon,
      color: '#14B8A6',
    },
    {
      title: 'Sick',
      value: 15,
      icon: SickIcon,
      color: '#E53935',
    },
    {
      title: 'Concern',
      value: 23,
      icon: CrisisAlertIcon,
      color: '#FB8C00',
    },
  ]

  return (
    <Card {...props}>
      <CardHeader title='Visit Types' />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative',
          }}
        >
          <Doughnut data={data} options={options} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2,
          }}
        >
          {devices.map(({ color, icon: Icon, title, value }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center',
              }}
            >
              <Icon color='action' />
              <Typography color='textPrimary' variant='body1'>
                {title}
              </Typography>
              <Typography style={{ color }} variant='h4'>
                {value}%
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}

export default VisitType
