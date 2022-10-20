import axios from 'axios'
import { getAxiosConfig } from 'utils/get-axios-config'

const API_URL = `/api/patients`

const getPatients = async (token, officeId) => {
  const config = getAxiosConfig(token)
  const res = await axios.get(`${API_URL}/${officeId}`, config)

  if (res.data) return res.data
}

const getCheckedInPatients = async (token, officeId) => {
  const config = getAxiosConfig(token)
  const res = await axios.get(`${API_URL}/${officeId}/checked-in`, config)

  if (res.data) return res.data
}

const getPatient = async (token, patientId) => {
  const config = getAxiosConfig(token)
  const res = await axios.get(`${API_URL}/${patientId}`, config)

  if (res.data) return res.data
}

const createPatient = async (token, patientData) => {
  const config = getAxiosConfig(token)
  const res = await axios.post(API_URL, patientData, config)

  if (res.data) return res.data
}

const updatePatient = async (token, patientData) => {
  const config = getAxiosConfig(token)
  const res = await axios.put(
    `${API_URL}/${patientData._id}`,
    patientData,
    config
  )

  if (res.data) return res.data
}

const deletePatient = async (token, patientId) => {
  const config = getAxiosConfig(token)
  const res = await axios.delete(`${API_URL}/${patientId}`, config)

  if (res.data) return res.data.patientId
}

const patientService = {
  getPatients,
  getCheckedInPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
}

export default patientService
