import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
    getLoggedInUserInformation,
    resetUserRequest,
    userSignIn,
    userSignUp,
    resetUserPasswordRequest,
    updateUserDetails
} from "../../api/account-manangement";
import {showToast, ToastStates} from "./ToastSlice";
import {getUserSubscriptions} from "./subscriptionSlice";

export enum UserSignUpStates {
    idle = 'idle',
    pending = 'pending',
    successful = 'successful',
    failed = 'failed',
    loggedOut = 'loggedOut'
}
export enum UserGender {
    MALE= 'Male',
    FEMALE='Female',
    OTHER='Other',
}

interface UserState {
    signUp: {
        email: string | null;
        status: UserSignUpStates;
    },
    signIn: {
        email: string;
        phone: string;
        name: string;
        gender: UserGender | undefined;
        status: UserSignUpStates;
        resetPasswordCompleted: boolean
    }
}

export const standardSignUp = createAsyncThunk(
    'users/standardSignUp',
    async ({ email, password, name, phoneNo }: Record<string, string>, thunkAPI) => {
        try {
            const response = await userSignUp(email, password, name, phoneNo);
            thunkAPI.dispatch(showToast({ heading: 'Sign Up Successful.', text: 'You have been successfully signed up for YogFia.'}))
            return response.data
        } catch (e: any) {
            thunkAPI.dispatch(showToast({ heading: 'Sign Up Failed.', text: e, status: ToastStates.warning }))
            throw e
        }
    }
)

export const standardSignIn = createAsyncThunk(
    'users/standardSignIn',
    async ({ email, password }: Record<string, string>, thunkAPI) => {
        try {
            const response = await userSignIn(email, password);
            if (response.email) {
                thunkAPI.dispatch(getUserSubscriptions());
            }
            return response
        } catch (e: any) {
            thunkAPI.dispatch(showToast({ heading: 'Sign In Failed.', text: e, status: ToastStates.warning }))
            throw e
        }
    }
)

export const updateUserProfile = createAsyncThunk(
    'users/updateUserProfile',
    async ({ email, name, phoneNo, gender }: Record<string, string>, thunkAPI) => {
        try {
            const response = await updateUserDetails(email, name, phoneNo, gender);
            thunkAPI.dispatch(showToast({ heading: 'Profile updated successfully.', text: ''}))
            return response
        } catch (e: any) {
            thunkAPI.dispatch(showToast({ heading: 'Profile update failed.', text: e, status: ToastStates.warning }))
            throw e
        }
    }
)

export const standardUserInformation = createAsyncThunk(
    'users/standardUserInformation',
    async (_, thunkAPI) => {
        try {
            const response = await getLoggedInUserInformation();
            if (response.email) {
                thunkAPI.dispatch(getUserSubscriptions());
            }
            return response
        } catch (e: any) {
            throw e
        }
    }
)

/*
* This action initiates the reset password and send the user an email with secret code
* */
export const resetPasswordRequestAction = createAsyncThunk(
    'users/resetPasswordRequestAction',
    async (email: string, thunkAPI) => {
        try {
            const response = await resetUserRequest(email);
            thunkAPI.dispatch(showToast({ heading: 'Reset Password.', text: 'If we found an account associated with that username, we will send the 6 digit code to reset the password.'}))
            return response
        } catch (e: any) {
            console.log(e)
            thunkAPI.dispatch(showToast({ heading: 'Reset Password.', text: 'If we found an account associated with that username, we will send the 6 digit code to reset the password.'}))
            throw e
        }
    }
)

/*
* This action actually reset the user password
* */
export const resetPasswordAction = createAsyncThunk(
    'users/resetPasswordAction',
    async ({ email, password, code }: Record<string, string>, thunkAPI) => {
        try {
            const response = await resetUserPasswordRequest(email, password, code);
            thunkAPI.dispatch(showToast({ heading: 'Reset Password Successful.', text: response.message}))
            thunkAPI.dispatch(setResetPasswordState(true))
            return response
        } catch (e: any) {
            console.log(e)
            thunkAPI.dispatch(showToast({ heading: 'Reset Password Failed.', text: e, status: ToastStates.warning }))
            throw e
        }
    }
)

const initialState: UserState = {
    signUp: {
        status: UserSignUpStates.idle,
        email: null
    },
    signIn: {
        email: '',
        name: '',
        phone: '',
        gender: undefined,
        resetPasswordCompleted: false,
        status: UserSignUpStates.idle,
    },
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetSignUpState: (state) => {
            return {
                ...state,
                signUp: {
                    ...initialState.signUp
                }
            }
        },
        resetSignInState: (state) => {
            return {
                ...state,
                signIn: {
                    ...state.signIn,
                    status: UserSignUpStates.idle,
                }
            }
        },
        setResetPasswordState: (state, action) => {
            return {
                ...state,
                signIn: {
                    ...state.signIn,
                    resetPasswordCompleted: action.payload
                }
            }
        },
        logoutUser: (state) => {
            return {
                ...state,
                signIn: {
                    ...initialState.signIn,
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(standardSignUp.fulfilled, (state, action) => {
            state.signUp.status = UserSignUpStates.successful;
        })
        builder.addCase(standardSignUp.rejected, (state, action) => {
            state.signUp.status = UserSignUpStates.failed;
        })
        builder.addCase(standardSignUp.pending, (state, action) => {
            state.signUp.status = UserSignUpStates.pending;
        })
        builder.addCase(standardSignIn.fulfilled, (state, action) => {
            state.signIn.status = UserSignUpStates.successful;
            state.signIn.email = action.payload.email;
            state.signIn.name = action.payload.name;
            state.signIn.phone = action.payload.phoneNo;
            state.signIn.gender = action.payload.gender;
        })
        builder.addCase(standardSignIn.rejected, (state, action) => {
            state.signIn.status = UserSignUpStates.failed;
        })
        builder.addCase(standardSignIn.pending, (state, action) => {
            state.signIn.status = UserSignUpStates.pending;
        })
        builder.addCase(standardUserInformation.fulfilled, (state, action) => {
            state.signIn.status = UserSignUpStates.successful;
            state.signIn.email = action.payload.email;
            state.signIn.name = action.payload.name;
            state.signIn.phone = action.payload.phoneNo;
            state.signIn.gender = action.payload.gender;
        })
        builder.addCase(standardUserInformation.rejected, (state, action) => {
            state.signIn.status = UserSignUpStates.failed;
            state.signIn.email = '';
            state.signIn.name = '';
        })
        builder.addCase(standardUserInformation.pending, (state, action) => {
            state.signIn.status = UserSignUpStates.pending;
        })
        builder.addCase(resetPasswordRequestAction.fulfilled, (state, action) => {})
        builder.addCase(resetPasswordRequestAction.rejected, (state, action) => {})
        builder.addCase(resetPasswordRequestAction.pending, (state, action) => {})
        builder.addCase(resetPasswordAction.fulfilled, (state, action) => {})
        builder.addCase(resetPasswordAction.rejected, (state, action) => {})
        builder.addCase(resetPasswordAction.pending, (state, action) => {})
        builder.addCase(updateUserProfile.fulfilled, (state, action) => {
            state.signIn.name = action.payload.name;
            state.signIn.phone = action.payload.phoneNo;
            state.signIn.gender = action.payload.gender;
        })
        builder.addCase(updateUserProfile.rejected, (state, action) => {})
        builder.addCase(updateUserProfile.pending, (state, action) => {})
    }
})

export const { resetSignUpState, resetSignInState, setResetPasswordState, logoutUser } = userSlice.actions
export default userSlice.reducer