import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoute from 'components/auth/PrivateRoute'
// pages
import Login from 'pages/auth/Login'
import Dashboard from 'layouts/dashboard/Dashboard'
// Sub page -> with in dashboard layout
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
            <Route path='/' element={<Dashboard />}>
              <Route path='/patients' element={<Patients />} />
              <Route path='/patients/:id' element={<Patient />} />
              <Route path='/patients/:id/edit' element={<Patient />} />
              <Route path='/appointments' element={<Appointments />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/admin' element={<Admin />} />
            </Route>
          </Route>
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
