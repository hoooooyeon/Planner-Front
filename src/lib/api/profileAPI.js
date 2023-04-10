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

// 내 플래너리스트 조회
export const loadMyPlannerList = ({ accountId }) => {
    return client.get(`/api/users/${accountId}/planners`, { accountId });
};
