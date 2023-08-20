import client from './client';
import qs from 'qs';

const baseUrl = '/api/planners';

// 다른 사용자들의 플래너리스트 조회
export const loadSharePlannerList = ({ type, ...queryString }) => {
    return client.get(`${baseUrl}/${qs.stringify(queryString, { addQueryPrefix: true })}`, { ...queryString });
};

// 플래너정보 조회
export const loadPlanner = ({ plannerId }) => {
    return client.get(`${baseUrl}/${plannerId}`);
};

// 플래너 생성
export const createPlanner = ({ type, ...queryString }) => {
    return client.post(`${baseUrl}`, {
        ...queryString,
    });
};

// 플래너 삭제
export const deletePlanner = ({ plannerId }) => {
    return client.delete(`${baseUrl}/${plannerId}`);
};

// 플래너 수정
export const updatePlanner = ({ type, plannerId, ...queryString }) => {
    return client.patch(`${baseUrl}/${plannerId}`, {
        ...queryString,
    });
};

// 플래너 좋아요
export const toggleLikePlanner = ({ plannerId }) => {
    return client.post(`${baseUrl}/${plannerId}/like`, { plannerId });
};

// 메모 생성
export const createMemo = ({ plannerId, title, content }) => {
    return client.post(`${baseUrl}/${plannerId}/memos`, { title, content });
};

// 메모 수정
export const updateMemo = ({ type, plannerId, memoId, ...queryString }) => {
    return client.patch(`${baseUrl}/${plannerId}/memos/${memoId}`, { ...queryString });
};

// 메모 삭제
export const deleteMemo = ({ plannerId, memoId }) => {
    return client.delete(`${baseUrl}/${plannerId}/memos/${memoId}`);
};

// 일정 생성
export const createPlan = ({ plannerId, planDate }) => {
    return client.post(`${baseUrl}/${plannerId}/plans`, { plannerId, planDate });
};

// 일정 수정
export const updatePlan = ({ type, plannerId, planId, ...queryString }) => {
    return client.patch(`${baseUrl}/${plannerId}/plans/${planId}`, { ...queryString });
};

// 일정 삭제
export const deletePlan = ({ plannerId, planId }) => {
    return client.delete(`${baseUrl}/${plannerId}/plans/${planId}`, { plannerId, planId });
};

// 멤버 초대
export const inviteMember = ({ plannerId, members }) => {
    return client.post(`${baseUrl}/${plannerId}/invite-member`, { members });
};

// 멤버 삭제
export const deleteMember = ({ plannerId, nickName }) => {
    return client.delete(`${baseUrl}/${plannerId}/delete-member?nick_name=${nickName}`);
};

// 여행지 생성
export const createLocation = ({ type, plannerId, planId, ...queryString }) => {
    return client.post(`${baseUrl}/${plannerId}/plans/${planId}/plan-locations`, {
        ...queryString,
    });
};

// 여행지 수정
export const updateLocation = ({ type, plannerId, locationId, planId, ...queryString }) => {
    return client.patch(`${baseUrl}/${plannerId}/plans/${planId}/plan-locations/${locationId}`, {
        ...queryString,
    });
};

// 여행지 삭제
export const deleteLocation = ({ plannerId, locationId, planId }) => {
    return client.delete(`${baseUrl}/${plannerId}/plans/${planId}/plan-locations/${locationId}`, {
        plannerId,
        locationId,
        planId,
    });
};
