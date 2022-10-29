import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import patientService from './patientService'
import { extractErrorMessage } from 'utils/auth'

const initialState = {
  patients: null,
  patient: null,
  checkedInPatients: null,
  isLoading: false,
}

export const getPatients = createAsyncThunk(
  'patients/getPatients',
  async (officeId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await patientService.getPatients(token, officeId)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const getCheckedInPatients = createAsyncThunk(
  'patients/getCheckedInPatients',
  async (officeId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await patientService.getCheckedInPatients(token, officeId)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const getPatient = createAsyncThunk(
  'patients/getPatient',
  async (patientId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await patientService.getPatient(token, patientId)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const createPatient = createAsyncThunk(
  'patients/createPatient',
  async (patientData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await patientService.createPatient(token, patientData)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const updatePatient = createAsyncThunk(
  'patients/updatePatient',
  async (patientData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await patientService.updatePatient(token, patientData)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const updateCheckedInPatient = createAsyncThunk(
  'patients/updateCheckedInPatient',
  async (patientData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await patientService.updatePatient(token, patientData)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const deletePatient = createAsyncThunk(
  'patients/deletePatient',
  async (patientId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await patientService.deletePatient(token, patientId)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    clearPatient(state) {
      state.patient = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPatients.pending, (state) => {
        state.patients = null
      })
      .addCase(getPatients.fulfilled, (state, action) => {
        state.patients = action.payload
      })

      .addCase(getCheckedInPatients.fulfilled, (state, action) => {
        state.checkedInPatients = action.payload
      })
      .addCase(getPatient.pending, (state) => {
        state.patient = null
      })
      .addCase(getPatient.fulfilled, (state, action) => {
        state.patient = action.payload
      })
      .addCase(createPatient.fulfilled, (state, action) => {
        state.patients = [...state.patients, action.payload]
      })
      .addCase(deletePatient.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updatePatient.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        state.patients = state.patients.map((patient) =>
          patient._id === action.payload._id ? action.payload : patient
        )
        state.patient = action.payload
        state.isLoading = false
      })
      .addCase(updateCheckedInPatient.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateCheckedInPatient.fulfilled, (state, action) => {
        state.checkedInPatients = state.checkedInPatients.map((patient) =>
          patient._id === action.payload._id ? action.payload : patient
        )
        state.patient = action.payload
        state.isLoading = false
      })
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.patients = state.patients.filter(
          (patient) => patient._id !== action.payload
        )
        state.isLoading = false
      })
  },
})

export const { clearPatient } = patientSlice.actions
export default patientSlice.reducer
