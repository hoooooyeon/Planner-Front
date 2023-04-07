import client from './client';

export const profileLoad = ({ accountId }) => {
    return client.get(`/api/users/${accountId}`);
};

export const profileUpdate = ({ accountId, nickname, phone }) => {
    return client.patch(`/api/users/${accountId}`, { accountId, nickname, phone });
};

export const profileImageUpdate = ({ accountId, formData }) => {
    return client.patch(`/api/users/images/${accountId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
}

export const profileMyPlannerLoad = ({ accountId }) => {
    return client.get(`/api/users/${accountId}/planners`);
}

export const profileLikePlannerLoad = ({ accountId }) => {
    return client.get(`/api/users/${accountId}/likes?type=planner`);
}