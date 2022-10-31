import { configureStore } from '@reduxjs/toolkit'
import userSlice from "./slices/UserSlice";
import toastSlice from "./slices/ToastSlice";
import subscriptionSlice from "./slices/subscriptionSlice";
import appLoaderSlice from "./slices/appLoaderSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        toast: toastSlice,
        subscription: subscriptionSlice,
        appLoader: appLoaderSlice
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch