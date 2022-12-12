import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import analyticService from './analyticService'
import { extractErrorMessage } from 'utils/auth'

const initialState = {
  analytic: null,
  officeAnalytics: null,
  isLoading: false,
}

export const generateAnalytics = createAsyncThunk(
  'generateAnalytics',
  async (analyticData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await analyticService.generateAnalytics(token, analyticData)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const getAnalytics = createAsyncThunk(
  'getAnalytics',
  async (data, thunkAPI) => {
    console.log('data', data)
    try {
      const token = thunkAPI.getState().auth.user.token
      return await analyticService.getAnalytics(token, data)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const analyticSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    clearAnalytic(state) {
      state.analytic = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateAnalytics.pending, (state) => {
        state.analytic = null
      })
      .addCase(generateAnalytics.fulfilled, (state, action) => {
        state.analytic = action.payload
      })
      .addCase(getAnalytics.pending, (state) => {
        state.officeAnalytics = null
      })
      .addCase(getAnalytics.fulfilled, (state, action) => {
        state.officeAnalytics = action.payload
      })
  },
})

export const { clearAnalytic } = analyticSlice.actions
export default analyticSlice.reducer
