import axios from 'axios'
import { getAxiosConfig } from 'utils/get-axios-config'

const API_URL = `/api/users`

const getUsers = async (token) => {
  const config = getAxiosConfig(token)
  const res = await axios.get(API_URL, config)

  if (res.data) {
    return res.data
  }
}

const updateUser = async (token, userData) => {
  const config = getAxiosConfig(token)
  console.log('config :>> ', config)
  const res = await axios.put(`${API_URL}/${userData._id}`, userData, config)

  if (res.data) {
    return res.data
  }
}

const deleteUser = async (token, userId) => {
  const config = getAxiosConfig(token)
  const res = await axios.delete(`${API_URL}/${userId}`, config)

  if (res.data) {
    return res.data.userId
  }
}

const adminService = {
  getUsers,
  updateUser,
  deleteUser,
}

export default adminService
