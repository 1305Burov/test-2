import { createSlice } from '@reduxjs/toolkit'

export interface Data {
    region: string, latency: number
}

export interface dataState {
  value: Array<Data | undefined | any>;
}


const initialState: dataState = {
  value: [],
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    updateData: (state, action) => {
        state.value = [...state.value, action.payload]
    },

  },
})

export const { updateData } = dataSlice.actions

export default dataSlice.reducer