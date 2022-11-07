import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AppModalState {
    show: boolean;
    heading: string;
    body: string;
    actonButtonText: string;
    action: () => void;
}

const initialState: AppModalState = {
    show: false,
    heading: '',
    body: '',
    actonButtonText: '',
    action: () => null,
};

const appModalSlice = createSlice({
    name: 'appLoader',
    initialState,
    reducers: {
        showModal: (state, action: PayloadAction<Partial<AppModalState>>) => {
            return {
                ...state,
                show: true,
                ...action.payload
            }
        },
        hideModal: (state, action: PayloadAction<{ text?: string } | undefined>) => {
            return {
                ...initialState,
            }
        }
    },
})

export const { showModal, hideModal } = appModalSlice.actions
export default appModalSlice.reducer