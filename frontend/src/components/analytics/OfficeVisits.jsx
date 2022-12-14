import { Bar } from 'react-chartjs-2'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
} from '@mui/material'
import {
  monthFilterLabels,
  weekFilterLabels,
  yearFilterLabels,
} from 'constants/analytics'

function OfficeVisits(props) {
  const { selectedFilterOption } = props
  const theme = useTheme()

  const getLabel = () => {
    if (selectedFilterOption === 'THIS_WEEK') return 'This Week'
    if (selectedFilterOption === 'THIS_MONTH') return 'This Month'
    if (selectedFilterOption === 'THIS_YEAR') return 'This Year'
  }

  const data = {
    datasets: [
      {
        backgroundColor: '#3F51B5',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: [18, 5, 19, 27, 29, 19, 20],
        label: getLabel(),
        maxBarThickness: 10,
      },
      // {
      //   backgroundColor: '#EEEEEE',
      //   barPercentage: 0.5,
      //   barThickness: 12,
      //   borderRadius: 4,
      //   categoryPercentage: 0.5,
      //   data: [11, 20, 12, 29, 30, 25, 13],
      //   label: 'Last year',
      //   maxBarThickness: 10,
      // },
    ],
    labels: yearFilterLabels,
  }

  const options = {
    animation: true,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          min: 0,
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider,
        },
      },
    ],
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

  return (
    <Card {...props}>
      <CardHeader title='Office Visits' />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative',
          }}
        >
          <Bar data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  )
}

export default OfficeVisits
