import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from '@mui/material'

function Billing() {
  return (
    <>
      <Card>
        <CardHeader
          subheader='Current subscription and billing information'
          title='Subscription'
        />
        <Divider />
        <CardContent>
          <h1>User list table here</h1>
        </CardContent>
      </Card>
    </>
  )
}

export default Billing
