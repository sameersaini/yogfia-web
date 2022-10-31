import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface AppLoaderState {
    show: boolean;
    text: string;
}

const initialState: AppLoaderState = {
    show: false,
    text: '',
};

const appLoaderSlice = createSlice({
    name: 'appLoader',
    initialState,
    reducers: {
        showLoader: (state, action: PayloadAction<{ text?: string } | undefined>) => {
            return {
                ...state,
                show: true,
                ...action.payload
            }
        },
        hideLoader: (state, action: PayloadAction<{ text?: string } | undefined>) => {
            return {
                ...state,
                show: false,
                ...action.payload
            }
        }
    },
})

export const { showLoader, hideLoader } = appLoaderSlice.actions
export default appLoaderSlice.reducer