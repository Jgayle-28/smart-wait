import axios from 'axios'
import { getAxiosConfig } from 'utils/get-axios-config'

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
    localStorage.setItem('sm-user', JSON.stringify(res.data))
    return res.data
  }
}

const updateUserOffice = async (token, userData) => {
  const config = getAxiosConfig(token)
  const res = await axios.put(
    `/api/users/${userData._id}/update-office`,
    userData,
    config
  )

  if (res.data) {
    localStorage.setItem('sm-user', JSON.stringify(res.data))
    return res.data
  }
}

const logoutUser = () => {
  localStorage.removeItem('sm-user')
  localStorage.removeItem('sm-office')
}

const authService = {
  createUser,
  loginUser,
  updateUserOffice,
  logoutUser,
}

export default authService
