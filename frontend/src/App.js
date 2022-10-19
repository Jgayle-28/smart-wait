import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoute from 'components/auth/PrivateRoute'
// pages
import Login from 'pages/auth/Login'
import OfficeRegister from 'pages/office/OfficeRegister'
import DashboardLayout from 'layouts/dashboard/Dashboard'
// Sub page -> with in dashboard layout
import Dashboard from 'pages/dashboard/Dashboard.page'
import Admin from 'pages/admin/Admin.page'
import Appointments from 'pages/appointments/Appointment.page'
import Patients from 'pages/patients/Patients.page'
import Patient from 'pages/patients/Patient.page'
import Settings from 'pages/settings/Settings.page'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<PrivateRoute />}>
            {/* Dashboard layout wraps all nested route for main app views*/}
            <Route path='/' element={<DashboardLayout />}>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/patients' element={<Patients />} />
              <Route path='/patients/:id' element={<Patient />} />
              <Route path='/patients/:id/edit' element={<Patient />} />
              <Route path='/appointments' element={<Appointments />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/admin' element={<Admin />} />
            </Route>
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register-office' element={<OfficeRegister />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
