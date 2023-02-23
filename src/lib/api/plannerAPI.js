import client from './client';

// 다른 사용자들의 플래너리스트 조회
export const loadSharePlannerList = () => {
    return client.get('/api/planners');
};

// 플래너정보 조회
export const loadPlanner = ({ plannerId }) => {
    return client.get(`/api/planners/${plannerId}`);
};

// 플래너 생성
export const createPlanner = () => {
    return client.post('/api/planners');
};
