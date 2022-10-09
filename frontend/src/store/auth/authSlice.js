import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import authService from './authService'
import { extractErrorMessage } from 'utils/auth'

// Get user from localstorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  createdUser: null,
  isLoading: false,
}

export const createUser = createAsyncThunk(
  'auth/createUser',
  async (user, thunkAPI) => {
    try {
      return await authService.createUser(user)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (user, thunkAPI) => {
    try {
      return await authService.loginUser(user)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const logoutUser = createAction('auth/logout', () => {
  authService.logoutUser()
  return {}
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.createdUser = action.payload
        state.isLoading = false
      })
      .addCase(createUser.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = false
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoading = false
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export default authSlice.reducer
