import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import officeService from './officeService'
import { extractErrorMessage } from 'utils/auth'

// Get office from local storage
const office = JSON.parse(localStorage.getItem('sm-office'))

const initialState = {
  offices: null,
  office: office ? office : null,
  isLoading: false,
}

export const registerOffice = createAsyncThunk(
  'offices/registerOffice',
  async (officeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await officeService.registerOffice(token, officeData)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const getOffice = createAsyncThunk(
  'offices/getOffice',
  async (officeId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await officeService.getOffice(token, officeId)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const updateOffice = createAsyncThunk(
  'offices/updateOffice',
  async (officeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await officeService.updateOffice(token, officeData)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const deleteOffice = createAsyncThunk(
  'offices/deleteOffice',
  async (officeId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await officeService.deleteOffice(token, officeId)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const officeSlice = createSlice({
  name: 'offices',
  initialState,
  reducers: {
    clearOffices(state) {
      state.office = null
    },
    clearOffice(state) {
      state.office = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerOffice.pending, (state) => {
        state.office = null
      })
      .addCase(registerOffice.fulfilled, (state, action) => {
        state.office = action.payload
      })
      .addCase(getOffice.pending, (state) => {
        state.office = null
      })
      .addCase(getOffice.fulfilled, (state, action) => {
        state.office = action.payload
      })
      .addCase(updateOffice.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateOffice.fulfilled, (state, action) => {
        state.office = action.payload
        state.isLoading = false
      })
      .addCase(deleteOffice.fulfilled, (state, action) => {
        state.office = null
      })
  },
})

export const { clearOffices, clearOffice } = officeSlice.actions
export default officeSlice.reducer
