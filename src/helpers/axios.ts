//import { getSession } from '@auth0/nextjs-auth0';
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const isServer = typeof window === 'undefined';

const api = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(async (config) => {
    if (isServer) {
        // const session = await getSession();

        config.headers.Authorization = `Bearer TOKEN`;
    } else {
        /*console.log('FIXME: Retrieval of token not implemented on client side');*/
    }

    /* console.log(config.headers);*/

    return config;
});

export { api };
