import client from "./client";

export const writeReview = ({ plannerId, title, content, writer }) => {
    return client.post(`/api/reviews`, { plannerId, title, content, writer });
};

export const loadReviewList = ({ pageIndex }) => {
    return client.get(`/api/reviews?page=${pageIndex}`);
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

export const writeComment = (comment) => {
    return client.post(`/api/reviews/${comment.reviewId}/comments`, comment);
};

export const updateComment = ({ reviewId, commentId, commentText }) => {
    return client.patch(`/api/reviews/${reviewId}/comments/${commentId}`, { commentId, reviewId, content: commentText });
}

export const deleteComment = ({ reviewId, commentId }) => {
    return client.delete(`/api/reviews/${reviewId}/comments/${commentId}`);
};