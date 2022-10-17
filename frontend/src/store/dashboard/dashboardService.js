import axios from 'axios'
import { getAxiosConfig } from 'utils/get-axios-config'

const API_URL = `/api/dashboard`

const getStats = async (token) => {
  const config = getAxiosConfig(token)
  const res = await axios.get(API_URL, config)

  if (res.data) return res.data
}

const dashboardService = {
  getStats,
}

export default dashboardService
