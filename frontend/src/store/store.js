import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import dashboardReducer from './dashboard/dashboardSlice'
import patientReducer from './patients/patientsSlice'
import appointmentReducer from './appointments/appointmentSlice'
import officeReducer from './offices/officeSlice'
import { NotificationReducer } from './notification/notificationSlice'
import adminReducer from './admin/adminSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    patients: patientReducer,
    appointments: appointmentReducer,
    notification: NotificationReducer,
    offices: officeReducer,
    admin: adminReducer,
  },
})
