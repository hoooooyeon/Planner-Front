import client from './client';

// 여행지 가져오기
export const readSpot = (id) => client.get(`/planner/api/spots/${id}`);
