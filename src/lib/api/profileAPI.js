import client from './client';

export const profileLoad = ({ accountId }) => {
    return client.get(`/api/users/${accountId}`);
};

export const profileUpdate = ({ accountId, username, nickname }) => {
    return client.put(`/api/users/${accountId}`, { username, nickname });
};
