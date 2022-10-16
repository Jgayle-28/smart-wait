import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  open: false,
  type: 'info',
  message: '',
  timeout: 5000,
}

export const NotificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (_state, action) => ({
      ...initialState,
      ...action.payload,
      open: true,
    }),
    clearNotification: (state) => ({ ...state, open: false }),
  },
})

export const NotificationActions = NotificationSlice.actions
export const NotificationReducer = NotificationSlice.reducer
