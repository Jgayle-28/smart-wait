import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoute from 'components/auth/PrivateRoute'
// pages
import Login from 'pages/auth/Login'
import Dashboard from 'pages/dashboard/Dashboard.page'
// Sub page -> with in dashboard layout
import CreateUser from 'pages/admin/CreateUser.page'
import Patients from 'pages/patients/Patients.page'
import Admin from 'pages/admin/Admin.page'
import Appointments from 'pages/appointments/Appointment.page'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<PrivateRoute />}>
            {/* Dashboard wraps all nested route */}
            <Route path='/' element={<Dashboard />}>
              <Route path='/create-user' element={<CreateUser />} />
              <Route path='/patients' element={<Patients />} />
              <Route path='/admin' element={<Admin />} />
              <Route path='/appointments' element={<Appointments />} />
            </Route>
          </Route>
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
