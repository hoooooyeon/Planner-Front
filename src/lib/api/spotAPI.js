import client from './client';

// 지역 조회
export const getAreas = () => {
  return client.get('/api/tours/area-codes');
};

// 지역에 따른 여행지
export const listSpots = ({ areacode }) => {
  return client.get(`/api/tours/lists-area?areaCode=${areacode}&contentTypeId=12&index=1`);
};

// 여행지 상세 정보
export const detailSpot = ({ id }) => {
  return client.get(`/api/tours/lists/${id}`);
};
