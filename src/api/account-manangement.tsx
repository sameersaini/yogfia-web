import {getEnvData} from "../env";

export const userSignUp = (email: string, password: string, name: string, phoneNo: string) => {
    return fetch(`${getEnvData().api.url}/user/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: email,
            password,
            name,
            phoneNo
        }),
    })
        .then(handleResponse)
        .catch((error) => {
            console.error('Error in userSignUp:', error);
            throw error;
        });
}

export const userSignIn = (email: string, password: string) => {
    return fetch(`${getEnvData().api.url}/user/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            username: email,
            password,
        }),
    })
        .then(handleResponse)
        .catch((error) => {
            console.error('Error in userSignIn:', error);
            throw error;
        });
}

export const getLoggedInUserInformation = () => {
    return fetch(`${getEnvData().api.url}/user/info`, {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then(handleResponse)
        .catch((error) => {
            console.error('Error in getLoggedInUserInformation:', error);
            throw error;
        });
}

export const resetUserRequest = (email: string) => {
    return fetch(`${getEnvData().api.url}/user/reset-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            username: email,
        }),
    })
        .then(handleResponse)
        .catch((error) => {
            console.error('Error in resetUserRequest:', error);
            throw error;
        });
}

export const resetUserPasswordRequest = (email: string, password: string, code: string) => {
    return fetch(`${getEnvData().api.url}/user/reset-user-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            username: email,
            password,
            code
        }),
    })
        .then(handleResponse)
        .catch((error) => {
            console.error('Error in resetUserPasswordRequest:', error);
            throw error;
        });
}

export const updateUserDetails = (email: string, name: string, phoneNo: string, gender: string, age: number, country: string) => {
    return fetch(`${getEnvData().api.url}/user/update-profile`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            email,
            name,
            phoneNo,
            gender,
            age,
            country,
        }),
    })
        .then(handleResponse)
        .catch((error) => {
            console.error('Error in resetUserPasswordRequest:', error);
            throw error;
        });
}

export const updateUserPassword = (email: string, currentPassword: string, newPassword: string) => {
    return fetch(`${getEnvData().api.url}/user/update-password`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            username: email,
            password: currentPassword,
            newPassword
        }),
    })
        .then(handleResponse)
        .catch((error) => {
            console.error('Error in updateUserPassword:', error);
            throw error;
        });
}

export const handleResponse = async (response: any) => {
    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;

    // check for error response
    if (!response.ok) {
        // get error message from body or default to response status
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
    }
    return Promise.resolve(data)
}