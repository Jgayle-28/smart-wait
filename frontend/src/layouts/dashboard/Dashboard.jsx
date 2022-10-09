import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { DashboardNavbar } from 'components/dashboard/dashboard-navbar'
import { DashboardSidebar } from 'components/dashboard/dashboard-sidebar'
import styled from '@emotion/styled'
import { Box } from '@mui/material'

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280,
  },
}))

function Dashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(true)
  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <main>
            <Outlet />
          </main>
        </Box>
      </DashboardLayoutRoot>

      <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
      <DashboardSidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
      />
    </>
  )
}

export default Dashboard
