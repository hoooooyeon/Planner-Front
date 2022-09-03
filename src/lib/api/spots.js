import client from './client';

// 여행지 가져오기
export const listSpots = () => client.get('/api/spots/');
