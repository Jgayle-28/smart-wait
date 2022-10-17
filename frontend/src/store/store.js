import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import dashboardReducer from './dashboard/dashboardSlice'
import patientReducer from './patients/patientsSlice'
import { NotificationReducer } from './notification/notificationSlice'
import adminReducer from './admin/adminSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    patients: patientReducer,
    notification: NotificationReducer,
    admin: adminReducer,
  },
})
