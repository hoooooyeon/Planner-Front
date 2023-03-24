import client from "./client";

export const writeReview = ({ plannerId, title, content, writer }) => {
    return client.post(`/api/reviews`, { plannerId: 2, title, content, writer });
};

export const loadReviewList = () => {
    return client.get(`/api/reviews`);
};

export const loadReview = ({ reviewId }) => {
    return client.get(`/api/reviews/${reviewId}`);
};

export const updateReview = ({ reviewId, title, content }) => {
    return client.patch(`/api/reviews/${reviewId}`, { reviewId, title, content });
};

export const deleteReview = ({ reviewId }) => {
    return client.delete(`/api/reviews/${reviewId}`);
};

export const fileUpload = ({ formData }) => {
    return client.post('/api/upload/file-upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};