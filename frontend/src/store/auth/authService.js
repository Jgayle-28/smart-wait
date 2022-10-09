import axios from 'axios'

const API_URL = `/api/users`

const createUser = async (userData) => {
  const res = await axios.post(API_URL, userData)

  if (res.data) {
    return res.data
  }
}

const loginUser = async (userData) => {
  const res = await axios.post(`${API_URL}/login`, userData)

  if (res.data) {
    localStorage.setItem('user', JSON.stringify(res.data))
    return res.data
  }
}

const logoutUser = () => localStorage.removeItem('user')

const authService = {
  createUser,
  loginUser,
  logoutUser,
}

export default authService
