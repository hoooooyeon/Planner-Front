import client from './client';

export const profileLoad = ({ accountId }) => {
    return client.get(`/api/users/${accountId}`);
};

export const profileUpdate = ({ accountId, nickname, phone }) => {
    return client.patch(`/api/users/${accountId}`, { accountId, nickname, phone });
};

export const profileImageUpdate = ({ accountId, formData }) => {
    return client.patch(`/api/users/images/${accountId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
};

export const likeSpotIdCheck = ({ accountId, spotId }) => {
    //return client.post(`/api/users/likes/${accountId}/check?contentIds=0,1,2,3,5,6`, spotId);
};
