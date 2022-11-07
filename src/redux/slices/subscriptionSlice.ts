import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {
    cancelCurrentSubscription,
    createRazorPaySubscription,
    getAllUserSubscriptions,
    getSubscriptionInvoiceDetails,
    getSubscriptionPlanDetails,
    saveRazorPaySubscriptionStart
} from '../../api/razor-pay';
import {showToast, ToastStates} from "./ToastSlice";
import {hideLoader, showLoader} from "./appLoaderSlice";

export interface PlanObj {
    id: string;
    interval: string; // This, combined with period, defines the frequency. If the billing cycle is 2 months, the value should be 2
    period: string; // daily | weekly | monthly | yearly If the billing cycle is 2 months, the value should be
    name: string; // plan name
    amount: number;
    description: string;
}

export interface SubscriptionObj {
    id: string;
    plan_id: string;
    customer_id: string;
    total_count: number; // The number of billing cycles for which the customer should be charged.
    quantity: number; // The number of times the customer should be charged the plan amount per invoice.
    status: string;
    payment_method: string;
    paid_count: number; // Indicates the number of billing cycles the customer has already been charged.
    current_start: number; // epoch unix Indicates the start time of the current billing cycle of a Subscription.
    current_end: number; // Indicates the start time of the current billing cycle of a Subscription.
    ended_at: number; // The Unix timestamp of when the Subscription has completed its period or has been cancelled midway.
    charge_at: number; // The Unix timestamp of when the next charge on the Subscription should be made.
    short_url: string; //  URL that can be used to make the authorization payment.
    remaining_count: number; // Indicates the number of billing cycles remaining on the Subscription
    end_at: number;
    start_at: number;
}

export interface InvoiceObj {
    id: string;
    amount: number;
    created_at: number;
    currency: string;
    currency_symbol: string;
    date: number;
    paid_at: number;
    payment_id: string;
    subscription_id: string;
    status: string;
    line_items: Record<string, string>[];
}

export interface SubscriptionState {
    subscriptions: SubscriptionObj[];
    plans: Record<string, PlanObj>;
    invoices: Record<string, InvoiceObj>;
}


const initialState: SubscriptionState = {
    subscriptions: [],
    plans: {},
    invoices: {}
};


export const createSubscription = createAsyncThunk(
    'subscription/createSubscription',
    async (planId: string, thunkAPI) => {
        try {
            const response = await createRazorPaySubscription(planId);
            return response.data
        } catch (e: any) {
            thunkAPI.dispatch(showToast({ heading: 'Subscription failed.', text: e, status: ToastStates.warning }))
            throw e
        }
    }
);

export const saveSuccessfulSubscription = createAsyncThunk(
    'subscription/saveSuccessfulSubscription',
    async ({paymentId, subscriptionId, razorPaySignature}: Record<string, string>, thunkAPI) => {
        try {
            const response = await saveRazorPaySubscriptionStart(paymentId, subscriptionId, razorPaySignature);
            thunkAPI.dispatch(showLoader());
            thunkAPI.dispatch(getUserSubscriptions());
            thunkAPI.dispatch(hideLoader());
            return response.data
        } catch (e: any) {
            thunkAPI.dispatch(showToast({ heading: 'Subscription failed.', text: e, status: ToastStates.warning }))
            throw e
        }
    }
);

export const getUserSubscriptions = createAsyncThunk(
    'subscription/getUserSubscriptions',
    async (_, thunkAPI) => {
        try {
            const response = await getAllUserSubscriptions();
            response.forEach(subscription => {
                thunkAPI.dispatch(getPlanDetails({planId: subscription.plan_id}));
                thunkAPI.dispatch(getSubscriptionInvoices({subscriptionId: subscription.id}));
            })
            return response
        } catch (e: any) {
            thunkAPI.dispatch(showToast({ heading: 'Cannot fetch Subscriptions.', text: e, status: ToastStates.warning }))
            throw e
        }
    }
);

export const getPlanDetails = createAsyncThunk(
    'subscription/getPlanDetails',
    async ({planId}: {planId: string}, thunkAPI) => {
        try {
            const response = await getSubscriptionPlanDetails(planId);
            return response
        } catch (e: any) {
            thunkAPI.dispatch(showToast({ heading: 'Cannot fetch Subscriptions Plans.', text: e, status: ToastStates.warning }))
            throw e
        }
    }
);

export const getSubscriptionInvoices = createAsyncThunk(
    'subscription/getSubscriptionInvoices',
    async ({subscriptionId}: {subscriptionId: string}, thunkAPI) => {
        try {
            const response = await getSubscriptionInvoiceDetails(subscriptionId);
            return response
        } catch (e: any) {
            thunkAPI.dispatch(showToast({ heading: 'Cannot fetch Subscriptions Plans.', text: e, status: ToastStates.warning }))
            throw e
        }
    }
);

export const cancelSubscription = createAsyncThunk(
    'subscription/cancelSubscription',
    async ({subsId}: {subsId: string}, thunkAPI) => {
        try {
            const response = await cancelCurrentSubscription(subsId);
            return response
        } catch (e: any) {
            thunkAPI.dispatch(showToast({ heading: 'Cannot cancel subscription.', text: e, status: ToastStates.warning }))
            throw e
        }
    }
);


const subscriptionSlice = createSlice({
    name: 'subscription',
    initialState,
    reducers: {
        resetSubscriptionState: (_) => {
            return {
                ...initialState,
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUserSubscriptions.fulfilled, (state, action) => {
            state.subscriptions = action.payload.sort((a, b) => a.charge_at - b.charge_at )
        })
        builder.addCase(getPlanDetails.fulfilled, (state, action) => {
            state.plans[action.payload.id] = {
                id: action.payload.id,
                interval: action.payload.interval,
                period: action.payload.period,
                amount: action.payload.item.amount,
                name: action.payload.item.name,
                description: action.payload.item.description,
            };
        })
        builder.addCase(getSubscriptionInvoices.fulfilled, (state, action) => {
            console.log(action)
            if(Array.isArray(action.payload.items)) {
                action.payload.items.forEach((item: InvoiceObj) => {
                    state.invoices[item.id] = item;
                })
            }
        })
    }
})

export const { resetSubscriptionState } = subscriptionSlice.actions;
export default subscriptionSlice.reducer