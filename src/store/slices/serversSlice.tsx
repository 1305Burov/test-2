import { createSlice } from '@reduxjs/toolkit'

export interface Servers {
    region: string, isMain: boolean, isActive: boolean,
}

export interface ServersState {
  value: Array<Servers>;
}

const initialState: ServersState = {
  value: [
        {region: 'westUsa', isMain: false, isActive: false},
        {region: 'eastUsa', isMain: false, isActive: false},
        {region: 'germany', isMain: false, isActive: false},
        {region: 'singapore', isMain: false, isActive: false},
    ]
}

export const serversSlice = createSlice({
  name: 'servers',
  initialState,
  reducers: {
    updateServerInfo: (state, action) => {
        const serverIdx = state.value.findIndex( region => region.region === action.payload.region)
        state.value[serverIdx] = action.payload
    },

  },
})

export const { updateServerInfo } = serversSlice.actions

export default serversSlice.reducer