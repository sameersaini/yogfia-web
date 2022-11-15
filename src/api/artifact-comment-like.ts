import {getEnvData} from "../env";
import {handleResponse} from "./account-manangement";
import {ArtifactTypes} from "../redux/slices/artifactSlice";

export const artifactDetails = (artifactType: ArtifactTypes, artifactId: number) => {
    return fetch(`${getEnvData().api.url}/artifact/${artifactType}/${artifactId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then(handleResponse)
        .catch((error) => {
            console.error('Error in artifactDetails:', error);
            throw error;
        });
}

export const artifactLike = (artifactType: ArtifactTypes, artifactId: number) => {
    return fetch(`${getEnvData().api.url}/like/${artifactType}/${artifactId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then(handleResponse)
        .catch((error) => {
            console.error('Error in artifactLike:', error);
            throw error;
        });
}

export const artifactUnlike = (artifactType: ArtifactTypes, artifactId: number) => {
    return fetch(`${getEnvData().api.url}/unlike/${artifactType}/${artifactId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then(handleResponse)
        .catch((error) => {
            console.error('Error in artifactUnlike:', error);
            throw error;
        });
}

export const artifactAddComment = (artifactType: ArtifactTypes, artifactId: number, text: string) => {
    return fetch(`${getEnvData().api.url}/comment/${artifactType}/${artifactId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text,
        }),
        credentials: 'include',
    })
        .then(handleResponse)
        .catch((error) => {
            console.error('Error in artifactAddComment:', error);
            throw error;
        });
}

export const artifactCommentLike = (commentId: string, artifactType: ArtifactTypes, artifactId: number) => {
    return fetch(`${getEnvData().api.url}/comment/like/${commentId}/${artifactType}/${artifactId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then(handleResponse)
        .catch((error) => {
            console.error('Error in artifactCommentLike:', error);
            throw error;
        });
}

export const artifactCommentUnLike = (commentId: string, artifactType: ArtifactTypes, artifactId: number) => {
    return fetch(`${getEnvData().api.url}/comment/unlike/${commentId}/${artifactType}/${artifactId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then(handleResponse)
        .catch((error) => {
            console.error('Error in artifactCommentUnLike:', error);
            throw error;
        });
}

export const artifactCommentDelete = (commentId: string, artifactType: ArtifactTypes, artifactId: number) => {
    return fetch(`${getEnvData().api.url}/comment/${commentId}/${artifactType}/${artifactId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then(handleResponse)
        .catch((error) => {
            console.error('Error in artifactCommentDelete:', error);
            throw error;
        });
}

export const artifactCommentEdit = (commentId: string, artifactType: ArtifactTypes, artifactId: number, text: string) => {
    return fetch(`${getEnvData().api.url}/comment/edit/${commentId}/${artifactType}/${artifactId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text,
        }),
        credentials: 'include',
    })
        .then(handleResponse)
        .catch((error) => {
            console.error('Error in artifactCommentEdit:', error);
            throw error;
        });
}
