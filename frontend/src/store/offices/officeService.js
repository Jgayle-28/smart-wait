import axios from 'axios'
import { getAxiosConfig } from 'utils/get-axios-config'

const API_URL = `/api/offices`

const registerOffice = async (token, officeData) => {
  const config = getAxiosConfig(token)
  const res = await axios.post(API_URL, officeData, config)

  if (res.data) {
    localStorage.setItem('sm-office', JSON.stringify(res.data))
    return res.data
  }
}

const getOffices = async (token) => {
  const config = getAxiosConfig(token)
  const res = await axios.get(`${API_URL}`, config)

  if (res.data) return res.data
}

const getOffice = async (token, officeId) => {
  const config = getAxiosConfig(token)
  const res = await axios.get(`${API_URL}/${officeId}`, config)

  if (res.data) {
    localStorage.setItem('sm-office', JSON.stringify(res.data))
    return res.data
  }
}

const updateOffice = async (token, officeData) => {
  const config = getAxiosConfig(token)
  const res = await axios.put(
    `${API_URL}/${officeData._id}`,
    officeData,
    config
  )

  if (res.data) return res.data
}

const deleteOffice = async (token, officeId) => {
  const config = getAxiosConfig(token)
  const res = await axios.delete(`${API_URL}/${officeId}`, config)

  if (res.data) return res.data.officeId
}

const officeService = {
  registerOffice,
  getOffices,
  getOffice,
  updateOffice,
  deleteOffice,
}

export default officeService
