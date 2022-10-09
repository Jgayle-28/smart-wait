import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoute from 'components/auth/PrivateRoute'
// pages
import Login from 'pages/auth/Login'
import Dashboard from 'layouts/dashboard/Dashboard'
// Sub page -> with in dashboard layout
import Admin from 'pages/admin/Admin.page'
import Appointments from 'pages/appointments/Appointment.page'
import Patients from 'pages/patients/Patients.page'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<PrivateRoute />}>
            {/* Dashboard layout wraps all nested route for main app views*/}
            <Route path='/' element={<Dashboard />}>
              <Route path='/admin' element={<Admin />} />
              <Route path='/appointments' element={<Appointments />} />
              <Route path='/patients' element={<Patients />} />
            </Route>
          </Route>
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
