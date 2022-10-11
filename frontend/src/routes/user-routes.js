import { ChartBar as ChartBarIcon } from 'icons/chart-bar'
import { Cog as CogIcon } from 'icons/cog'
import { Users as UsersIcon } from 'icons/users'

export const routes = [
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
    href: '/settings',
    icon: <CogIcon fontSize='small' />,
    title: 'Settings',
  },
]
