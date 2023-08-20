import client from './client';
import qs from 'qs';

const baseUrl = '/api/spots';

// 지역 조회
export const loadAreas = () => {
    return client.get(`${baseUrl}/area-codes`);
};

// 지역에 따른 여행지
export const loadSpots = ({ type, ...queryString }) => {
    return client.get(`${baseUrl}/lists-area${qs.stringify(queryString, { addQueryPrefix: true })}`);
};

// 여행지 상세 정보
export const loadDetailSpot = ({ contentId }) => {
    return client.get(`${baseUrl}/lists/${contentId}`);
};

// 여행지 좋아요 추가
export const addSpotLike = ({ contentId, title, image }) => {
    return client.post(`${baseUrl}/likes`, { contentId, title, image });
};

// 여행지 좋아요 삭제
export const removeSpotLike = ({ contentId }) => {
    return client.delete(`${baseUrl}/likes/${contentId}`, { contentId });
};

// 여행지 검색
export const searchSpot = ({ type, ...queryString }) => {
    return client.get(`${baseUrl}/lists-keyword${qs.stringify(queryString, { addQueryPrefix: true })}`);
};
