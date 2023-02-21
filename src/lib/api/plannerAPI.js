import client from './client';

// 다른 사용자들의 플래너 조회
export const loadSharePlanner = () => {
    return client.get('/api/planners');
};

// 플래너 생성
export const createPlanner = () => {
    return client.post('/api/planners');
};
