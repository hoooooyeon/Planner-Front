import axios from 'axios';
import PromiseHolder from '../utils/PromiseHolder';
import { put } from 'redux-saga/effects';
import { TOKEN_REISSUE_SUCCESS_TYPE, TOKEN_REISSUE_TYPE } from '../../modules/authModule';
import { CanceledError } from '../../../node_modules/axios/index';

const controller = new AbortController();
const abortSignal = controller.signal;

const client = axios.create({ signal: abortSignal });

let tokenReissue = false;
// const holdRequestList = [];
const holder = new PromiseHolder();


const AuthorizationHeaderEdit = (config) => {
    const accessToken = localStorage.getItem('accessToken');
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
};

export const tokenUse = (accessToken) => {
    client.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
};

client.interceptors.request.use(async (config) => {
    if (tokenReissue) {
        await holder.hold();

        const newConfig = AuthorizationHeaderEdit(config);

        return newConfig;
    }
    return config;
});

client.interceptors.response.use((res) => {
    return res;
}, async (error) => {
    if (error instanceof CanceledError) {
        return Promise.reject(error);
    }

    if (error.response.status == 401) {
        try {
            if (!tokenReissue) {
                tokenReissue = true;
                holder.init();

                const tokenResponse = await axios.post('/api/auth/token-reissue');
                const accessToken = tokenResponse.data.data.accessToken;

                localStorage.setItem("accessToken", accessToken);
                tokenUse(accessToken);

                const newConfig = AuthorizationHeaderEdit(error.config);

                tokenReissue = false;

                const originalRequest = await axios(newConfig);
                holder.resolve();

                return Promise.resolve(originalRequest);
            }
            else {
                await holder.hold();

                const newConfig = AuthorizationHeaderEdit(error.config);
                const originalRequest = await axios(newConfig);

                return Promise.resolve(originalRequest);
            }
        }
        catch (e) {
            alert('다시 로그인 해주세요.');
            console.error(e);
            controller.abort();
            holder.resolve();
            tokenReissue = false;
            localStorage.removeItem('accessToken');

            return Promise.reject(error);
        }
    }

    return Promise.reject(error);
});

export default client;
