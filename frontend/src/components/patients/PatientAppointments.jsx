import { useState } from 'react'
import {
  Box,
  Card,
  CardHeader,
  Divider,
  CardContent,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from '@mui/material'
import { format } from 'date-fns'
import { subDays, subHours, subMinutes } from 'date-fns'
import EventIcon from '@mui/icons-material/Event'

const now = new Date()

const appointments = [
  {
    id: '5ece2ce3613486d95ffaea58',
    createdAt: subDays(subHours(subMinutes(now, 34), 5), 3).getTime(),
    type: 'Well Check',
  },
  {
    id: '5ece2ce8cebf7ad1d100c0cd',
    createdAt: subDays(subHours(subMinutes(now, 49), 11), 4).getTime(),
    type: 'Sick Check',
  },
]

const descendingComparator = (a, b, sortBy) => {
  // When compared to something undefined, always returns false.
  // This means that if a field does not exist from either element ('a' or 'b') the return will be 0.

  if (b[sortBy] < a[sortBy]) {
    return -1
  }

  if (b[sortBy] > a[sortBy]) {
    return 1
  }

  return 0
}

const getComparator = (sortDir, sortBy) =>
  sortDir === 'desc'
    ? (a, b) => descendingComparator(a, b, sortBy)
    : (a, b) => -descendingComparator(a, b, sortBy)

const sortOptions = [
  {
    label: 'Newest appointment (newest)',
    value: 'updatedAt|desc',
  },
  {
    label: 'Last appointment (oldest)',
    value: 'updatedAt|asc',
  },
]

function PatientAppointments() {
  const [sort, setSort] = useState(sortOptions[0].value)

  const handleSortChange = (event) => {
    setSort(event.target.value)
  }
  return (
    <>
      <Card>
        <CardHeader title='Patient Appointments' />
        <Divider />
        <CardContent>
          <Box display='flex'>
            <TextField
              label='Sort By'
              name='sort'
              onChange={handleSortChange}
              select
              SelectProps={{ native: true }}
              value={sort}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>

            <Button
              endIcon={<EventIcon fontSize='small' />}
              variant='contained'
              sx={{ marginLeft: 'auto' }}
            >
              Add Appointment
            </Button>
          </Box>
        </CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Appointment Type</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((app) => (
              <TableRow
                key={app.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <Typography variant='subtitle2'>{app.type}</Typography>
                </TableCell>
                <TableCell>
                  {format(app.createdAt, 'dd/MM/yyyy | HH:mm')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  )
}

export default PatientAppointments
