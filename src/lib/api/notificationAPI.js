import client from './client';

const baseUrl = '/api/notifications';

export const notifyRead = ({ notificationId }) => {
    return client.post(`${baseUrl}/${notificationId}/read`);
};

export const notifyDelete = ({ notificationId }) => {
    return client.delete(`${baseUrl}/${notificationId}`);
};
