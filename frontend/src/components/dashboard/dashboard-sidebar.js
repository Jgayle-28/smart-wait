import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Box, Divider, Drawer, Typography, useMediaQuery } from '@mui/material'
import { ChartBar as ChartBarIcon } from 'icons/chart-bar'
import { Cog as CogIcon } from 'icons/cog'
import { Selector as SelectorIcon } from 'icons/selector'
import { Users as UsersIcon } from 'icons/users'
import { Logo } from 'components/logo'
import { NavItem } from 'components/dashboard/nav-item'

const items = [
  {
    href: '/',
    icon: <ChartBarIcon fontSize='small' />,
    title: 'Dashboard',
  },
  {
    href: '/patients',
    icon: <UsersIcon fontSize='small' />,
    title: 'Patients',
  },
  {
    href: '/admin',
    icon: <CogIcon fontSize='small' />,
    title: 'Admin',
  },
]

export const DashboardSidebar = (props) => {
  const { open, onClose } = props

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false,
  })

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <Link to='/'>
              <Logo
                sx={{
                  height: 42,
                  width: 42,
                }}
              />
            </Link>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                px: 3,
                py: '11px',
                borderRadius: 1,
              }}
            >
              <div>
                <Typography color='inherit' variant='subtitle1'>
                  Acme Inc
                </Typography>
                <Typography color='neutral.400' variant='body2'>
                  Your tier : Premium
                </Typography>
              </div>
              <SelectorIcon
                sx={{
                  color: 'neutral.500',
                  width: 14,
                  height: 14,
                }}
              />
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
      </Box>
    </>
  )

  if (lgUp) {
    return (
      <Drawer
        anchor='left'
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280,
          },
        }}
        variant='permanent'
      >
        {content}
      </Drawer>
    )
  }

  return (
    <Drawer
      anchor='left'
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant='temporary'
    >
      {content}
    </Drawer>
  )
}

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
}
