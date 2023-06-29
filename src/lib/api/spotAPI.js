import client from './client';

// 지역 조회
export const loadAreas = () => {
    return client.get('/api/spots/area-codes');
};

// 지역에 따른 여행지
export const loadSpots = ({ areaCode, contentTypeId, pageNo }) => {
    return client.get(`/api/spots/lists-area?areaCode=${areaCode}&contentTypeId=${contentTypeId}&pageNo=${pageNo}`);
};

// 여행지 상세 정보
export const loadDetailSpot = ({ id }) => {
    return client.get(`/api/spots/lists/${id}`);
};

// 여행지 좋아요 추가
export const addSpotLike = ({ contentId, title, image }) => {
    return client.post(`/api/spots/likes`, { contentId, title, image });
};

// 여행지 좋아요 삭제
export const removeSpotLike = ({ contentId }) => {
    return client.delete(`/api/spots/likes/${contentId}`, { contentId });
};

// 여행지 검색
export const searchSpot = ({ areaCode, contentTypeId, curKeyword, pageNo }) => {
    return client.get(
        `/api/spots/lists-keyword?areaCode=${areaCode}&contentTypeId=${contentTypeId}&keyword=${curKeyword}&pageNo=${pageNo}`,
    );
};
