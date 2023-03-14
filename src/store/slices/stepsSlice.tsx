import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

export const stepSlice = createSlice({
  name: 'step',
  initialState,
  reducers: {
    increase: (state, actions) => {
      state.value = actions.payload
    },

  },
})

export const { increase } = stepSlice.actions

export default stepSlice.reducer