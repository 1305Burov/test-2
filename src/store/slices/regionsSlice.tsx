import { createSlice } from '@reduxjs/toolkit'

export interface Region {
    region: string, usersCount: number
}

export interface RegionsState {
  value: Array<Region>;
}


const initialState: RegionsState = {
  value: [
    {region: 'NorthAmerica', usersCount: 0 },
    {region: 'SouthAmerica', usersCount: 0 },
    {region: 'Europe', usersCount: 0 },
    {region: 'Asia', usersCount: 0 },
    {region: 'Oceania', usersCount: 0 },
  ],
}

export const regionsSlice = createSlice({
  name: 'regions',
  initialState,
  reducers: {
    updateCount: (state, action) => {
        const regionIdx = state.value.findIndex( region => region.region === action.payload.region)
        state.value[regionIdx].usersCount = action.payload.usersCount
    },

  },
})

export const { updateCount } = regionsSlice.actions

export default regionsSlice.reducer