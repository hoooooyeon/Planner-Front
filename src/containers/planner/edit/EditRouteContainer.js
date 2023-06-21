import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditRoute from '../../../components/planner/edit/EditRoute';
import {
    changeCurPlanIdAction,
    changeLocationAction,
    changePlansAction,
    createPlanAction,
    deleteLocationAction,
    deletePlanAction,
    loadPlanAction,
    loadPlannerAction,
    toggleMemberModalAction,
    togglePlannerInfoModalAction,
    updateLocationAction,
    updatePlanAction,
    updatePlannerAction,
} from '../../../modules/plannerModule';

const EditRouteContainer = () => {
    const dispatch = useDispatch();
    const { planner, plannerError, plan, plannerData, loading, transList } = useSelector(({ plannerReducer, loadingReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
        plan: plannerReducer.plan,
        plannerData: plannerReducer.plannerData,
        loading: loadingReducer.loading,
        location: plannerReducer.location,
        transList: plannerReducer.transList,
    }));

    const { plannerId, plans, title, planDateStart, planDateEnd, expense, memberCount, memberTypeId } = { ...planner };
    const { planId } = { ...plannerData };

    const letsFormat = (d) => {
        const date = new Date(d);
        return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    };

    // 기존 날짜에 수가 더해짐 리렌더링시 정상임
    const onUpdatePlannerDate = (date) => {
        let planDateStart = letsFormat(date);
        let planDateEnd = letsFormat(date);

        if (plans.length !== 0) {
            planDateEnd = letsFormat(new Date(planDateEnd).setDate(new Date(planDateEnd).getDate() + plans.length - 1));
        }
        dispatch(updatePlannerAction({ plannerId, title, planDateStart, planDateEnd, expense, memberCount, memberTypeId }));
    };

    // plan 추가시 날짜 하루 생성
    const onAddDate = (date) => {
        if (plans.length === 0) {
            return;
        }

        let curDate = new Date(date);
        let planDateEnd = letsFormat(curDate.setDate(curDate.getDate() + 1));

        dispatch(updatePlannerAction({ plannerId, title, planDateStart, planDateEnd, expense, memberCount, memberTypeId }));
    };

    // plan 삭제시 해당 날짜  제거
    const onSubDate = (date) => {
        let curDate = new Date(date);
        let planDateEnd = letsFormat(curDate.setDate(curDate.getDate() - 1));

        dispatch(updatePlannerAction({ plannerId, title, planDateStart, planDateEnd, expense, memberCount, memberTypeId }));
    };
    const [startDate, setStartDate] = useState(planDateStart ? new Date(planDateStart) : null);
    const [endDate, setEndDate] = useState(planDateEnd ? new Date(planDateEnd) : null);

    const onChangePlannerDateStart = (date) => {
        setStartDate(date);
    };

    const onChangePlannerDateEnd = (date) => {
        setEndDate(date);
    };
    useEffect(() => {
        onChangePlannerDateStart(new Date(planDateStart));
        onChangePlannerDateEnd(new Date(planDateEnd));
    }, [planDateStart, planDateEnd]);

    const onCreatePlan = () => {
        const planDate = letsFormat(new Date(planDateEnd));
        const planLocations = [];

        dispatch(createPlanAction({ plannerId, planDate, planLocations }));
    };
    const onDeletePlan = (planId) => {
        dispatch(deletePlanAction({ plannerId, planId }));
        if (planner && plans.length > 1 && planId === plannerData.planId) {
            dispatch(changeCurPlanIdAction(plans[0].planId));
        }
    };

    // 일정 날짜 최신화
    useEffect(() => {
        let date = new Date(planDateStart);
        let planDate = letsFormat(date);
        let planId = 0;
        if (plans) {
            for (let i = 0; i < plans.length; i++) {
                planId = plans[i].planId;
                if (i >= 1) {
                    planDate = letsFormat(date.setDate(date.getDate() + 1));
                }
                dispatch(updatePlanAction({ plannerId, planId, planDate }));
            }
        }
    }, [dispatch, planDateStart, planDateEnd, plannerId]);

    const onLoadPlan = (plan) => {
        dispatch(loadPlanAction(plan));
    };

    const onDeleteLocation = (locationId) => {
        dispatch(deleteLocationAction({ plannerId, locationId, planId }));
    };

    // planner 정보 가져오기
    useEffect(() => {
        const { plannerId } = plannerData;
        if (plannerId) {
            dispatch(loadPlannerAction(plannerId));
        }
    }, [dispatch, plannerData]);

    const onChangeCurPlanId = (planId) => {
        dispatch(changeCurPlanIdAction(planId));
    };

    // 일정 변경 함수
    // 현재 아무 기능은 없다.
    // plans 배열을 복사하고 거기서 순서를 바꾼 뒤 바뀐 순서에서 양 옆의 index의 1/2의 값을 가져온 뒤
    // 해당 요소의 index를  업뎃해준다. 그 뒤 db에서 index로 순서대로 정렬
    const onChangePlans = (plans) => {
        dispatch(changePlansAction(plans));
    };

    const onChangeLocation = (location) => {
        dispatch(changeLocationAction(location));
    };

    const onUpdateTrans = (trans, locationData) => {
        if (planner) {
            // const { locationId, locationName, locationImage, locationContentId } = location;
            const { locationId, locationName, locationImage, locationContentId, locationAddr, locationMapx, locationMapy } = locationData;
            let locationTransportation = trans;
            dispatch(updateLocationAction({ plannerId, locationId, locationName, locationContentId, locationImage, locationAddr, locationMapx, locationMapy, locationTransportation, planId }));
        }
    };

    const onToggleMemberModal = () => {
        dispatch(toggleMemberModalAction());
    };
    const onTogglePlannerInfoModal = () => {
        dispatch(togglePlannerInfoModalAction());
    };

    return (
        <EditRoute
            planner={planner}
            plan={plan}
            plannerData={plannerData}
            loading={loading}
            transList={transList}
            startDate={startDate}
            endDate={endDate}
            onChangePlannerDateStart={onChangePlannerDateStart}
            onChangePlannerDateEnd={onChangePlannerDateEnd}
            onCreatePlan={onCreatePlan}
            onDeletePlan={onDeletePlan}
            onLoadPlan={onLoadPlan}
            onDeleteLocation={onDeleteLocation}
            onUpdatePlannerDate={onUpdatePlannerDate}
            onChangeCurPlanId={onChangeCurPlanId}
            onAddDate={onAddDate}
            onSubDate={onSubDate}
            // onUpdateSubPlan={onUpdateSubPlan}
            onChangePlans={onChangePlans}
            onChangeLocation={onChangeLocation}
            onUpdateTrans={onUpdateTrans}
            onToggleMemberModal={onToggleMemberModal}
            onTogglePlannerInfoModal={onTogglePlannerInfoModal}
        />
    );
};

export default EditRouteContainer;
