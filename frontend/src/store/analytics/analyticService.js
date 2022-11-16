import axios from 'axios'
import { getAxiosConfig } from 'utils/get-axios-config'

const API_URL = `/api/analytics`

const generateAnalytics = async (token, analyticData) => {
  const config = getAxiosConfig(token)
  const res = await axios.post(API_URL, analyticData, config)

  if (res.data) return res.data
}

const analyticService = { generateAnalytics }

export default analyticService
