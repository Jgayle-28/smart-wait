import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import { NotificationReducer } from './notification/notificationSlice'
import adminReducer from './admin/adminSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: NotificationReducer,
    admin: adminReducer,
  },
})
