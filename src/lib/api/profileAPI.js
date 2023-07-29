import client from './client';

export const profileLoad = ({ accountId }) => {
    return client.get(`/api/users/${accountId}`);
};

export const profileUpdate = ({ accountId, nickname, phone }) => {
    return client.patch(`/api/users/${accountId}`, { accountId, nickname, phone });
};

export const profileImageUpdate = ({ accountId, formData }) => {
    return client.patch(`/api/users/images/${accountId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

export const profileMyPlannerLoad = ({ accountId, pageNum, itemCount, sortCriteria }) => {
    return client.get(
        `/api/users/${accountId}/planners?itemCount=${itemCount}&sortCriteria=${sortCriteria}&keyword=&pageNum=${pageNum}`,
    );
};

export const profileLikeListLoad = ({ accountId, itemCount, sortCriteria, keyword, postType, pageNum }) => {
    return client.get(
        `/api/users/${accountId}/likes?itemCount=${itemCount}&sortCriteria=${sortCriteria}&keyword=${keyword}&postType=${postType}&pageNum=${pageNum}`,
    );
};
