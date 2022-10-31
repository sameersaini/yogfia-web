interface APP_ENV {
    api: Record<string, string>;
    razorpay_test_key?: string
}


export const getEnvData = (env: string = process.env.NODE_ENV) => ({
    development: {
        api: {
            url: 'http://localhost:3001'
        },
        razorpay_test_key: 'rzp_test_1fGKl1VGuHubbP'
    },
    production: {
        api: {
            url: 'https://api.tripfia.com'
        }
    }
}[env] as APP_ENV);

