import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import { NotificationReducer } from './notification/notificationSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: NotificationReducer,
  },
})
