import client from './client';

// 지역 조회
export const getAreas = () => {
    return client.get('/api/tours/area-codes');
};

// 지역에 따른 여행지
export const listSpots = ({ areaCode, page }) => {
    return client.get(`/api/tours/lists-area?areaCode=${areaCode}&contentTypeId=12&index=${page}`);
};

// 여행지 상세 정보
export const detailSpot = ({ id }) => {
    return client.get(`/api/tours/lists/${id}`);
};

// 여행지 즐겨찾기 추가
export const addFavoritesSpot = ({ spotId }) => {
    return client.post(`/api/spots/likes/${spotId}`);
};

// 여행지 즐겨찾기 삭제
export const deleteFavoritesSpot = ({ spotId }) => {
    return client.delete(`/api/spots/likes/${spotId}`);
};
