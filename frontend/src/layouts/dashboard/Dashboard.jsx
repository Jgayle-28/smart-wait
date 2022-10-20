import { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { DashboardNavbar } from 'components/dashboard/layout/DashboardNavbar'
import { DashboardSidebar } from 'components/dashboard/layout/DashboardSidebar'
import styled from '@emotion/styled'
import { Box } from '@mui/material'
import AuthGuard from 'components/auth/AuthGuard'
import { useSelector } from 'react-redux'
import NeedToRegister from 'components/dashboard/NeedToRegister'

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
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const [isSidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    // Check for an office ID -> redirect if none
    if (!user.office.length) {
      setTimeout(() => {
        navigate(`/register-office`)
      }, 5500)
    }
  }, [user])

  //  If the user has not registered their office
  if (!user.office.length) return <NeedToRegister />
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
            <AuthGuard>
              <Outlet />
            </AuthGuard>
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
