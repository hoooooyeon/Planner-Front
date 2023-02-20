import client from './client';

// 플래너 생성
export const createPlanner = () => {
    return client.post('/api/planners');
};
