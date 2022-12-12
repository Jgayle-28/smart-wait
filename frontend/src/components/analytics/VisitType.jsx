import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
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
import SpaIcon from '@mui/icons-material/Spa'
import SickIcon from '@mui/icons-material/Sick'
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert'
import EmptyState from 'components/shared/EmptyState'

function VisitType(props) {
  const theme = useTheme()
  const { officeAnalytics } = useSelector((state) => state.analytics)

  const [analyticData, setAnalyticData] = useState([1, 1, 1])
  const [initialLoad, setInitialLoad] = useState(true)

  useEffect(() => {
    generateAnalyticData()
  }, [officeAnalytics])

  const generateAnalyticData = () => {
    let well = 0
    let sick = 0
    let concern = 0
    if (officeAnalytics !== null) {
      officeAnalytics.forEach((analytic) => {
        if (analytic.appointmentsCompleted.length) {
          analytic.appointmentsCompleted.forEach((app) => {
            if (app.appointmentType === 'well-check') well++
            if (app.appointmentType === 'sick-check') sick++
            if (app.appointmentType === 'concern-check') sick++
          })
        }
      })
    }
    setAnalyticData([well, sick, concern])
    console.log('{well, sick, concern} :>> ', { well, sick, concern })
  }

  const data = {
    datasets: [
      {
        data: analyticData,
        backgroundColor: ['#14B8A6', '#e53935', '#FB8C00'],
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF',
      },
    ],
    labels: ['Well', 'Sick', 'Concern'],
  }

  const options = {
    animation: true,
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

  const visitTypeData = [
    {
      title: 'Well',
      value: analyticData[0],
      icon: SpaIcon,
      color: '#14B8A6',
    },
    {
      title: 'Sick',
      value: analyticData[1],
      icon: SickIcon,
      color: '#E53935',
    },
    {
      title: 'Concern',
      value: analyticData[2],
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
          {visitTypeData.map(({ color, icon: Icon, title, value }) => (
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
