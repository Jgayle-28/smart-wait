import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import patientReducer from './patients/patientsSlice'
import adminReducer from './admin/adminSlice'
import { NotificationReducer } from './notification/notificationSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    patients: patientReducer,
    notification: NotificationReducer,
    admin: adminReducer,
  },
})
