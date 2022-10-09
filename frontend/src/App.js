import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// pages
import CreateUser from "pages/admin/CreateUser"
import Login from "pages/auth/Login"
import Dashboard from "pages/dashboard/Dashboard"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create-user' element={<CreateUser />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
