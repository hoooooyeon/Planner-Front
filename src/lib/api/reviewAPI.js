import client from "./client";
import qs from 'qs';

const basePath = '/api/reviews'

export const writeReview = ({ plannerId, title, writerId, content, fileList }) => {
    return client.post(`${basePath}`, { plannerId, title, writerId, content, fileNames: fileList });
};

export const loadReviewList = ({ type, ...queryString }) => {
    return client.get(`${basePath}${qs.stringify(queryString, { addQueryPrefix: true })}`);
};

export const loadReview = ({ reviewId }) => {
    return client.get(`${basePath}/${reviewId}`);
};

export const updateReview = ({ reviewId, title, content }) => {
    return client.patch(`${basePath}/${reviewId}`, { reviewId, title, content });
};

export const deleteReview = ({ reviewId }) => {
    return client.delete(`${basePath}/${reviewId}`);
};

export const fileUpload = ({ formData }) => {
    return client.post('/api/upload/file-upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const writeComment = (comment) => {
    return client.post(`${basePath}/${comment.reviewId}/comments`, comment);
};

export const updateComment = ({ reviewId, commentId, content }) => {
    return client.patch(`${basePath}/${reviewId}/comments/${commentId}`, { commentId, reviewId, content });
}

export const deleteComment = ({ reviewId, commentId }) => {
    return client.delete(`${basePath}/${reviewId}/comments/${commentId}`);
};