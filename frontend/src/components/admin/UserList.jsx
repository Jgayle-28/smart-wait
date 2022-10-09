import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from '@mui/material'

function UserList() {
  return (
    <>
      <Card>
        <CardHeader
          subheader='Manage application users'
          title='Application User'
        />
        <Divider />
        <CardContent>
          <h1>User list table here</h1>
        </CardContent>
      </Card>
    </>
  )
}

export default UserList
