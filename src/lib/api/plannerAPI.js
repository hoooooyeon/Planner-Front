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

// 일정 생성
export const createPlan = ({ planDate, plannerId }) => {
    return client.post(`/api/planners/${plannerId}/plans`, { plannerId, planDate });
};

// 일정 수정
export const updatePlan = ({ plannerId, planId, planDate }) => {
    return client.patch(`/api/planners/${plannerId}/plans/${planId}`, { plannerId, planId, planDate });
};

// 일정 삭제
export const deletePlan = ({ plannerId, planId }) => {
    return client.delete(`/api/planners/${plannerId}/plans/${planId}`, { plannerId, planId });
};

// 멤버 초대
export const inviteMember = ({ plannerId, members }) => {
    return client.post(`/api/planners/${plannerId}/invite-member`, { members });
};

// 멤버 삭제
export const deleteMember = ({ plannerId, nickName }) => {
    return client.delete(`/api/planners/${plannerId}/delete-member?nick_name=${nickName}`);
};

// 여행지 생성
export const createLocation = ({ plannerId, locationContentId, locationImage, locationTransportation, planId }) => {
    return client.post(`/api/planners/${plannerId}/plans/${planId}/plan-locations`, { plannerId, locationContentId, locationImage, locationTransportation, planId });
};

// 여행지 수정
export const updateLocation = ({ plannerId, locationId, locationContentId, locationImage, locationTransportation, planId }) => {
    return client.patch(`/api/planners/${plannerId}/plans/${planId}/plan-locations/${locationId}`, { plannerId, locationId, locationContentId, locationImage, locationTransportation, planId });
};

// 여행지 삭제
export const deleteLocation = ({ plannerId, locationId, planId }) => {
    return client.delete(`/api/planners/${plannerId}/plans/${planId}/plan-locations/${locationId}`, { plannerId, locationId, planId });
};
