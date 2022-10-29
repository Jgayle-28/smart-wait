import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from 'store/store'
import App from './App'
import reportWebVitals from './reportWebVitals'
// Theme and styles
import { ThemeProvider } from '@mui/material/styles'
import { theme } from 'theme'
import 'react-calendar/dist/Calendar.css'
import './index.css'
import Notifications from 'components/shared/notifications/Notifications'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
        <Notifications />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
