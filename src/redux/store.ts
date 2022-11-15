import { configureStore } from '@reduxjs/toolkit'
import userSlice from "./slices/UserSlice";
import toastSlice from "./slices/ToastSlice";
import subscriptionSlice from "./slices/subscriptionSlice";
import appLoaderSlice from "./slices/appLoaderSlice";
import appModalSlice from "./slices/appModalSlice";
import artifactSlice from "./slices/artifactSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        toast: toastSlice,
        subscription: subscriptionSlice,
        artifact: artifactSlice,
        appLoader: appLoaderSlice,
        appModal: appModalSlice,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
