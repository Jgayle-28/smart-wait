import { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Box, Divider, Drawer, Typography, useMediaQuery } from '@mui/material'

import { NavItem } from 'components/dashboard/NavItem'
// Icons
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'

import { Selector as SelectorIcon } from 'icons/selector'

import { Logo } from 'components/logo'
import { routes } from 'routes/user-routes'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

export const DashboardSidebar = (props) => {
  const { open, onClose } = props
  const { user } = useSelector((state) => state.auth)

  const [userRoutes, setUserRoutes] = useState(routes)

  useEffect(() => {
    if (user.isAdmin) {
      let tempRoutes = [...userRoutes]
      tempRoutes.push({
        href: '/admin',
        icon: <AdminPanelSettingsIcon fontSize='small' />,
        title: 'Admin',
      })
      setUserRoutes(tempRoutes)
    }
  }, [user])

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
          <Box
            sx={{
              p: 3,
              display: 'flex',
              justifyItems: 'center',
              justifyContent: 'center',
            }}
          >
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
                  Pinal County Health
                </Typography>
                <Typography color='neutral.400' variant='body2'>
                  Office : 1
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
          {userRoutes.map((item) => (
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
