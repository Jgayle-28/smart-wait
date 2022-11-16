import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import appointmentService from './appointmentService'
import { extractErrorMessage } from 'utils/auth'

const initialState = {
  officeAppointments: null,
  userAppointments: null,
  dailyOfficeAppointments: null,
  appointment: null,
  isLoading: false,
}

export const createAppointment = createAsyncThunk(
  'appointments/createAppointment',
  async (appData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await appointmentService.createAppointment(token, appData)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const getAppointments = createAsyncThunk(
  'appointments/getAppointments',
  async (officeId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await appointmentService.getAppointments(token, officeId)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const getAppointmentsByDate = createAsyncThunk(
  'appointments/getAppointmentsByDate',
  async (data, thunkAPI) => {
    const { officeId, date } = data
    try {
      const token = thunkAPI.getState().auth.user.token
      return await appointmentService.getAppointmentsByDate(
        token,
        officeId,
        date
      )
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const getAppointment = createAsyncThunk(
  'appointments/getAppointment',
  async (appId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await appointmentService.getAppointment(token, appId)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Public facing -> used to get appointment on patient check-in
export const PatientGetAppointment = createAsyncThunk(
  'appointments/getAppointment',
  async (appId, thunkAPI) => {
    try {
      return await appointmentService.PatientGetAppointment(appId)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const updateAppointment = createAsyncThunk(
  'appointments/updateAppointment',
  async (appointment, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await appointmentService.updateAppointment(token, appointment)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const updateAppointmentCheckIn = createAsyncThunk(
  'appointments/updateAppointmentCheckIn',
  async (appointment, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await appointmentService.updateAppointment(token, appointment)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const deleteAppointment = createAsyncThunk(
  'appointments/deleteAppointment',
  async (appId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await appointmentService.deleteAppointment(token, appId)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    clearAppointment(state) {
      state.appointment = null
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(getAppointments.pending, (state) => {
      //   state.officeAppointments = null
      // })
      .addCase(getAppointmentsByDate.fulfilled, (state, action) => {
        state.officeAppointments = action.payload
        state.dailyOfficeAppointments = action.payload
      })
      .addCase(getAppointments.fulfilled, (state, action) => {
        state.officeAppointments = action.payload
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.officeAppointments = [action.payload, ...state.officeAppointments]
      })
      .addCase(getAppointment.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(getAppointment.fulfilled, (state, action) => {
        state.appointment = action.payload
        state.isLoading = false
      })
      .addCase(updateAppointment.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        state.officeAppointments = state.officeAppointments.map((appointment) =>
          appointment._id === action.payload._id ? action.payload : appointment
        )
        state.isLoading = false
      })
      .addCase(updateAppointmentCheckIn.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(updateAppointmentCheckIn.fulfilled, (state, action) => {
        state.officeAppointments = action.payload
        state.isLoading = false
      })
    // .addCase(deleteAppointment.fulfilled, (state, action) => {
    //   state.officeAppointments = state.officeAppointments.map((appointment) =>
    //     appointment._id !== action.payload._id ? action.payload : appointment
    //   )
    //   state.isLoading = false
    // })
  },
})

export const { clearAppointment } = appointmentSlice.actions
export default appointmentSlice.reducer
