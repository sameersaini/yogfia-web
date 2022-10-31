import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export enum ToastStates {
    primary = 'primary',
    secondary = 'secondary',
    danger = 'danger',
    warning = 'warning',
    info = 'info',
    light = 'light'

}

interface ToastState {
    show: boolean;
    status: string;
    delay: number;
    heading: string;
    text: string
}


const initialState: ToastState = {
    show: false,
    status: ToastStates.light,
    delay: 5000,
    heading: '',
    text: '',
};

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        showToast: (state, action: PayloadAction<Partial<ToastState>>) => {
            return {
                ...state,
                show: true,
                ...action.payload
            }
        },
        hideToast: (state) => {
            return {
                ...state,
                show: false,
            }
        }
    },
})

export const { showToast, hideToast } = toastSlice.actions
export default toastSlice.reducer