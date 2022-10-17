import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import dashboardService from './dashboardService'
import { extractErrorMessage } from 'utils/auth'

const initialState = {
  stats: null,
  isLoading: false,
}

export const getStats = createAsyncThunk(
  'dashboard/getStats',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await dashboardService.getStats(token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStats.pending, (state) => {
        state.stats = null
      })
      .addCase(getStats.fulfilled, (state, action) => {
        state.stats = action.payload
      })
  },
})

export default dashboardSlice.reducer
