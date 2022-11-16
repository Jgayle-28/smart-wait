import axios from 'axios'
import { getAxiosConfig } from 'utils/get-axios-config'

const API_URL = `/api/appointments`

const createAppointment = async (token, appData) => {
  const config = getAxiosConfig(token)
  const res = await axios.post(API_URL, appData, config)

  if (res.data) return res.data
}

const getAppointments = async (token, officeId) => {
  const config = getAxiosConfig(token)
  const res = await axios.get(`${API_URL}/${officeId}`, config)

  if (res.data) return res.data
}

const getAppointmentsByDate = async (token, officeId, date) => {
  const config = getAxiosConfig(token)
  const res = await axios.get(`${API_URL}/${officeId}?date=${date}`, config)

  if (res.data) return res.data
}

const getAppointment = async (token, appId) => {
  const config = getAxiosConfig(token)
  const res = await axios.get(`${API_URL}/appointment/${appId}`, config)

  if (res.data) return res.data
}

const PatientGetAppointment = async (appId) => {
  const res = await axios.post(`${API_URL}/patient-appointment/${appId}`)

  if (res.data) return res.data
}

const updateAppointment = async (token, appointment) => {
  const config = getAxiosConfig(token)
  const res = await axios.put(
    `${API_URL}/${appointment._id}`,
    appointment,
    config
  )

  if (res.data) return res.data
}

const deleteAppointment = async (token, appId) => {
  const config = getAxiosConfig(token)
  const res = await axios.delete(`${API_URL}/${appId}`, config)

  if (res.data) return res.data
}

const appointmentService = {
  createAppointment,
  getAppointments,
  getAppointmentsByDate,
  getAppointment,
  PatientGetAppointment,
  updateAppointment,
  deleteAppointment,
}
export default appointmentService
