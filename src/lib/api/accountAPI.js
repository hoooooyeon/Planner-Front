import client from './client';
import qs from 'qs';

const baseUrl = '/api/users/';

export const accountLoad = ({ accountId }) => {
    return client.get(baseUrl + accountId);
};

export const accountUpdate = ({ accountId, nickname, phone }) => {
    return client.patch(baseUrl + accountId, { accountId, nickname, phone });
};

export const accountImageUpdate = ({ accountId, formData }) => {
    return client.patch(baseUrl + accountId + '/images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

export const accountMyPlannerListLoad = ({ type, accountId, ...queryString }) => {
    return client.get(baseUrl + accountId + '/planners' + qs.stringify(queryString, { addQueryPrefix: true }));
};

export const accountLikeListLoad = ({ type, accountId, ...queryString }) => {
    return client.get(baseUrl + accountId + '/likes' + qs.stringify(queryString, { addQueryPrefix: true }));
};

export const accountIdFind = ({ phone, code }) => {
    return client.post(baseUrl + 'find-email', { phone, code });
};

export const accountPasswordFind = ({ email }) => {
    return client.post(baseUrl + 'find-password', { email });
};

export const accountPasswordChange = ({ password, passwordConfirm, key }) => {
    const newPassword = password;
    const confirmPassword = passwordConfirm;
    return client.post(baseUrl + 'change-password', { newPassword, confirmPassword, key });
};
