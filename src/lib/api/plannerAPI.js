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
export const createPlanner = ({ accountId, creator, title, planDateStart, planDateEnd, planMembers, expense, memberCount, memberTypeId }) => {
    return client.post('/api/planners', { accountId, creator, title, planDateStart, planDateEnd, planMembers, expense, memberCount, memberTypeId });
};

// 플래너 삭제
export const deletePlanner = ({ plannerId }) => {
    return client.delete(`/api/planners/${plannerId}`);
};

// 플래너 수정
export const updatePlanner = ({ plannerId, title, planDateStart, planDateEnd, expense, memberCount, memberTypeId }) => {
    return client.patch(`/api/planners/${plannerId}`, { plannerId, title, planDateStart, planDateEnd, expense, memberCount, memberTypeId });
};

// 메모 생성
export const createMemo = ({ plannerId, title, content }) => {
    return client.post(`/api/planners/${plannerId}/memos`, { title, content });
};

// 메모 수정
export const updateMemo = ({ plannerId, memoId, title, content }) => {
    return client.patch(`/api/planners/${plannerId}/memos/${memoId}`, { title, content });
};

// 메모 삭제
export const deleteMemo = ({ plannerId, memoId }) => {
    return client.delete(`/api/planners/${plannerId}/memos/${memoId}`);
};
