import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {showToast, ToastStates} from "./ToastSlice";
import {
    artifactAddComment, artifactCommentDelete, artifactCommentEdit,
    artifactCommentLike,
    artifactCommentUnLike, artifactDetails,
    artifactLike,
    artifactUnlike
} from "../../api/artifact-comment-like";
import {UserSignInState} from "./UserSlice";

export enum ArtifactTypes {
    POSES= 'POSES'
}

export interface LikeState {
    _id: string;
    user: Partial<UserSignInState>;
}

export interface CommentState {
    _id: string;
    user: Partial<UserSignInState>;
    text: string;
    likes: LikeState[];
    createdAt: string;
}

export interface ArtifactState {
    artifactType: ArtifactTypes;
    artifactId: number;
    comments: CommentState[];
    likes: LikeState[];
}


export const getArtifactDetailsAction = createAsyncThunk(
    'artifacts/getArtifactDetailsAction',
    async ({artifactType, artifactId}: {artifactType: ArtifactTypes, artifactId: number}, thunkAPI) => {
        try {
            const response = await artifactDetails(artifactType, artifactId);
            return response
        } catch (e: any) {
            throw e
        }
    }
)

export const artifactLikeAction = createAsyncThunk(
    'artifacts/artifactLikeAction',
    async ({artifactType, artifactId}: {artifactType: ArtifactTypes, artifactId: number}, thunkAPI) => {
        try {
            const response = await artifactLike(artifactType, artifactId);
            return response
        } catch (e: any) {
            thunkAPI.dispatch(showToast({heading: 'like Failed.', text: e, status: ToastStates.warning}))
            throw e
        }
    }
)

export const artifactUnLikeAction = createAsyncThunk(
    'artifacts/artifactUnLikeAction',
    async ({artifactType, artifactId}: {artifactType: ArtifactTypes, artifactId: number}, thunkAPI) => {
        try {
            const response = await artifactUnlike(artifactType, artifactId);
            return response
        } catch (e: any) {
            thunkAPI.dispatch(showToast({heading: 'Unlike Failed.', text: e, status: ToastStates.warning}))
            throw e
        }
    }
)

export const addCommentToArtifact = createAsyncThunk(
    'artifacts/addCommentToArtifact',
    async ({artifactType, artifactId, text}: {
        artifactType: ArtifactTypes,
        artifactId: number,
        text: string
    }, thunkAPI) => {
        try {
            const response = await artifactAddComment(artifactType, artifactId, text);
            return response
        } catch (e: any) {
            thunkAPI.dispatch(showToast({heading: 'Comment Failed.', text: e, status: ToastStates.warning}))
            throw e
        }
    }
)

export const artifactCommentLikeAction = createAsyncThunk(
    'artifacts/artifactCommentLikeAction',
    async ({commentId, artifactType, artifactId, userId}: {
        commentId: string,
        artifactType: ArtifactTypes,
        artifactId: number,
        userId: number
    }, thunkAPI) => {
        try {
            const response = await artifactCommentLike(commentId, artifactType, artifactId);
            return response
        } catch (e: any) {
            thunkAPI.dispatch(showToast({heading: 'Comment like Failed.', text: e, status: ToastStates.warning}))
            throw e
        }
    }
)

export const artifactCommentUnLikeAction = createAsyncThunk(
    'artifacts/artifactCommentUnLikeAction',
    async ({commentId, artifactType, artifactId, userId}: {
        commentId: string,
        artifactType: ArtifactTypes,
        artifactId: number,
        userId: number
    }, thunkAPI) => {
        try {
            const response = await artifactCommentUnLike(commentId, artifactType, artifactId);
            return response
        } catch (e: any) {
            thunkAPI.dispatch(showToast({heading: 'Comment Unlike Failed.', text: e, status: ToastStates.warning}))
            throw e
        }
    }
)

export const deleteArtifactCommentAction = createAsyncThunk(
    'artifacts/deleteArtifactCommentAction',
    async ({commentId, artifactType, artifactId}: {
        commentId: string,
        artifactType: ArtifactTypes,
        artifactId: number
    }, thunkAPI) => {
        try {
            const response = await artifactCommentDelete(commentId, artifactType, artifactId);
            return response
        } catch (e: any) {
            thunkAPI.dispatch(showToast({heading: 'Comment Delete Failed.', text: e, status: ToastStates.warning}))
            throw e
        }
    }
)

export const updateArtifactCommentAction = createAsyncThunk(
    'artifacts/updateArtifactCommentAction',
    async ({commentId, artifactType, artifactId, text}: {
        commentId: string,
        artifactType: ArtifactTypes,
        artifactId: number,
        text: string
    }, thunkAPI) => {
        try {
            const response = await artifactCommentEdit(commentId, artifactType, artifactId, text);
            return response
        } catch (e: any) {
            thunkAPI.dispatch(showToast({heading: 'Comment Edit Failed.', text: e, status: ToastStates.warning}))
            throw e
        }
    }
)


const initialState: ArtifactState = {
    artifactType: ArtifactTypes.POSES,
    artifactId: 0,
    comments: [],
    likes: [],
};

const artifactSlice = createSlice({
    name: 'artifact',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getArtifactDetailsAction.fulfilled, (state, action) => {
            Object.assign(state, action.payload)
        })
        builder.addCase(getArtifactDetailsAction.rejected, (state, action) => {
            Object.assign(state, initialState)
        })
        builder.addCase(getArtifactDetailsAction.pending, (state, action) => {})
        builder.addCase(addCommentToArtifact.fulfilled, (state, action) => {
            Object.assign(state, action.payload)
        })
        builder.addCase(addCommentToArtifact.rejected, (state, action) => {})
        builder.addCase(addCommentToArtifact.pending, (state, action) => {})
        builder.addCase(artifactLikeAction.fulfilled, (state, action) => {
            console.log(action.payload)
            Object.assign(state, action.payload)
        })
        builder.addCase(artifactLikeAction.rejected, (state, action) => {})
        builder.addCase(artifactLikeAction.pending, (state, action) => {})
        builder.addCase(artifactUnLikeAction.fulfilled, (state, action) => {
            Object.assign(state, action.payload)
        })
        builder.addCase(artifactUnLikeAction.rejected, (state, action) => {})
        builder.addCase(artifactUnLikeAction.pending, (state, action) => {})
        builder.addCase(artifactCommentLikeAction.fulfilled, (state, action) => {
            Object.assign(state, action.payload)
        })
        builder.addCase(artifactCommentLikeAction.rejected, (state, action) => {})
        builder.addCase(artifactCommentLikeAction.pending, (state, action) => {})
        builder.addCase(artifactCommentUnLikeAction.fulfilled, (state, action) => {
            Object.assign(state, action.payload)
        })
        builder.addCase(artifactCommentUnLikeAction.rejected, (state, action) => {})
        builder.addCase(artifactCommentUnLikeAction.pending, (state, action) => {})
        builder.addCase(deleteArtifactCommentAction.fulfilled, (state, action) => {
            Object.assign(state, action.payload)
        })
        builder.addCase(deleteArtifactCommentAction.rejected, (state, action) => {})
        builder.addCase(deleteArtifactCommentAction.pending, (state, action) => {})
        builder.addCase(updateArtifactCommentAction.fulfilled, (state, action) => {
            Object.assign(state, action.payload)
        })
        builder.addCase(updateArtifactCommentAction.rejected, (state, action) => {})
        builder.addCase(updateArtifactCommentAction.pending, (state, action) => {})
    }
})

export const {} = artifactSlice.actions
export default artifactSlice.reducer
