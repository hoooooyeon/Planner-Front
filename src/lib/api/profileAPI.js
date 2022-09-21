import client from './client';

export const profileLoad = ({ accountId }) => {
    return client.get(`/api/users/${accountId}`);
};

export const profileUpdate = ({ accountId, nickname, phone }) => {
    return client.put(`/api/users/${accountId}`, { accountId, nickname, phone });
};
