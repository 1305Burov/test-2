import { configureStore } from '@reduxjs/toolkit'
import stepReducer from './slices/stepsSlice';
import regionReducer from './slices/regionsSlice';
import serverReducer from './slices/serversSlice';
import dataReducer from './slices/dataSlice';

export const store = configureStore({
    reducer: {
        step: stepReducer,
        regions: regionReducer,
        servers: serverReducer,
        data: dataReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch