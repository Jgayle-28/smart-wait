import { ChartBar as ChartBarIcon } from 'icons/chart-bar'
import { Cog as CogIcon } from 'icons/cog'
import { Users as UsersIcon } from 'icons/users'
import { ChatAlt2 as ChatAlt2Icon } from 'icons/chat-alt2'
import { ClipboardList as ClipboardListIcon } from 'icons/clipboard-list'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import QueryStatsIcon from '@mui/icons-material/QueryStats'

export const routes = [
  {
    href: '/dashboard',
    icon: <AnalyticsIcon fontSize='small' />,
    title: 'Dashboard',
  },
  {
    href: '/patients',
    icon: <UsersIcon fontSize='small' />,
    title: 'Patients',
  },
  {
    href: '/appointments',
    icon: <ClipboardListIcon fontSize='small' />,
    title: 'Appointments',
  },
  {
    href: '/analytics',
    icon: <QueryStatsIcon fontSize='small' />,
    title: 'Analytics',
  },
  // {
  //   href: '/chat',
  //   icon: <ChatAlt2Icon fontSize='small' />,
  //   title: 'Chat',
  // },
  // {
  //   href: '/settings',
  //   icon: <CogIcon fontSize='small' />,
  //   title: 'Settings',
  // },
]
