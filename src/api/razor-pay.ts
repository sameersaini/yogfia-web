import {getEnvData} from "../env";
import {handleResponse} from "./account-manangement";
import {PlanObj, SubscriptionObj} from "../redux/slices/subscriptionSlice";

export const createRazorPaySubscription = (planId: string) => {
    return fetch(`${getEnvData().api.url}/payment/create-subscription`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            planId
        }),
    })
        .then(handleResponse)
        .catch((error) => {
            console.error('Error in createRazorPaySubscription:', error);
            throw error;
        });
}

export const saveRazorPaySubscriptionStart = (paymentId: string, subscriptionId: string, razorPaySignature: string) => {
    return fetch(`${getEnvData().api.url}/payment/save-subscription-start`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            razorPayPaymentId: paymentId,
            razorPaySubscriptionId: subscriptionId,
            razorPaySignature,
        }),
    })
        .then(handleResponse)
        .catch((error) => {
            console.error('Error in createRazorPaySubscription:', error);
            throw error;
        });
}

export const getAllUserSubscriptions = (): Promise<SubscriptionObj[]> => {
    return fetch(`${getEnvData().api.url}/payment/all-user-subscriptions`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then(handleResponse)
        .catch((error) => {
            console.error('Error in getAllUserSubscriptions:', error);
            throw error;
        });
}

export const getSubscriptionPlanDetails = (planId: string) => {
    return fetch(`${getEnvData().api.url}/payment/plan-details/${planId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then(handleResponse)
        .catch((error) => {
            console.error('Error in getPlanDetails:', error);
            throw error;
        });
}

export const getSubscriptionInvoiceDetails = (subscriptionId: string) => {
    return fetch(`${getEnvData().api.url}/payment/invoices/${subscriptionId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then(handleResponse)
        .catch((error) => {
            console.error('Error in getSubscriptionInvoiceDetails:', error);
            throw error;
        });
}