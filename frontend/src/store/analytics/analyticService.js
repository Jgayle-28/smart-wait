import axios from 'axios'
import { getAxiosConfig } from 'utils/get-axios-config'

const API_URL = `/api/analytics`

const generateAnalytics = async (token, analyticData) => {
  const config = getAxiosConfig(token)
  const res = await axios.post(API_URL, analyticData, config)

  if (res.data) return res.data
}

const getAnalytics = async (token, data) => {
  const { officeId, dateParams } = data
  const config = getAxiosConfig(token)
  const res = await axios.get(
    `${API_URL}/${officeId}?startDate=${dateParams.startDate}&endDate=${dateParams.endDate}`,
    config
  )

  if (res.data) return res.data
}

const analyticService = { generateAnalytics, getAnalytics }

export default analyticService
