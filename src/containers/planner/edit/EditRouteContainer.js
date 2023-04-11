import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditRoute from '../../../components/planner/edit/EditRoute';
import { createPlan } from '../../../lib/api/plannerAPI';
import {
    changeCurPlanIdAction,
    changeLocationAction,
    changePlannerDateEndAction,
    changePlannerDateStartAction,
    changePlannerExpenseAction,
    changePlannerMemberCategoryAction,
    changePlannerMemberCountAction,
    changePlannerTitleAction,
    changePlansAction,
    createPlanAction,
    deleteLocationAction,
    deletePlanAction,
    loadPlanAction,
    loadPlannerAction,
    updateLocationAction,
    updatePlanAction,
    updatePlannerAction,
} from '../../../modules/plannerModule';

const EditRouteContainer = () => {
    const dispatch = useDispatch();
    const { planner, plannerError, plan, newPlanId, currentInfo, loading, location } = useSelector(({ plannerReducer, loadingReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
        plan: plannerReducer.plan,
        currentInfo: plannerReducer.currentInfo,
        loading: loadingReducer.loading,
        location: plannerReducer.location,
    }));

    const { plannerId, plans, title, planDateStart, planDateEnd, expense, memberCount, memberTypeId } = { ...planner };
    const { planId } = { ...currentInfo };

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

    const onChangePlannerDateStart = (date) => {
        dispatch(changePlannerDateStartAction(date));
    };

    const onChangePlannerDateEnd = (date) => {
        dispatch(changePlannerDateEndAction(date));
    };

    const onCreatePlan = () => {
        const planDate = letsFormat(new Date(planDateEnd));
        const planLocations = [];

        dispatch(createPlanAction({ plannerId, planDate, planLocations }));
    };
    const onDeletePlan = (planId) => {
        dispatch(deletePlanAction({ plannerId, planId }));
        if (planner && plans.length > 1 && planId === currentInfo.planId) {
            dispatch(changeCurPlanIdAction(plans[0].planId));
        }
    };

    const onUpdatePlan = () => {};

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

    // 현재  curPlanId인 plan 삭제시, curPlanId 최신화
    useEffect(() => {
        // if (planner && plans.length > 1) {
        //     let count = 0;
        //     for (let i = 0; i < plans.length; i++) {
        //         if (plans[i].planId === planId) {
        //             count++;
        //         }
        //     }
        //     if (count === 0) {
        //         dispatch(changeCurPlanIdAction(plans[0].planId));
        //     }
        // }
        // 생성할때 plaid가 바껴도 다시 [0]으로 돌아간다
    }, [dispatch, planner, plans, planId]);

    const onLoadPlan = (plan) => {
        dispatch(loadPlanAction(plan));
    };

    const onDeleteLocation = (locationId) => {
        dispatch(deleteLocationAction({ plannerId, locationId, planId }));
    };

    // planner 정보 가져오기
    useEffect(() => {
        const { plannerId } = currentInfo;
        if (plannerId) {
            dispatch(loadPlannerAction(plannerId));
        }
    }, [dispatch, currentInfo]);

    const onChangeCurPlanId = (planId) => {
        dispatch(changeCurPlanIdAction(planId));
    };

    const onChangePlans = (plans) => {
        dispatch(changePlansAction(plans));
    };

    const onChangeLocation = (location) => {
        dispatch(changeLocationAction(location));
    };

    const onUpdateTrans = (trans) => {
        if (planner && location) {
            const { locationId, locationName, locationImage, locationContentId } = location;

            let locationTransportation = trans;
            dispatch(updateLocationAction({ plannerId, locationId, locationName, locationContentId, locationImage, locationTransportation, planId }));
        }
    };

    return (
        <EditRoute
            planner={planner}
            plan={plan}
            currentInfo={currentInfo}
            loading={loading}
            onChangePlannerDateStart={onChangePlannerDateStart}
            onChangePlannerDateEnd={onChangePlannerDateEnd}
            onCreatePlan={onCreatePlan}
            onDeletePlan={onDeletePlan}
            onLoadPlan={onLoadPlan}
            onUpdatePlan={onUpdatePlan}
            onDeleteLocation={onDeleteLocation}
            onUpdatePlannerDate={onUpdatePlannerDate}
            onChangeCurPlanId={onChangeCurPlanId}
            onAddDate={onAddDate}
            onSubDate={onSubDate}
            // onUpdateSubPlan={onUpdateSubPlan}
            onChangePlans={onChangePlans}
            onChangeLocation={onChangeLocation}
            onUpdateTrans={onUpdateTrans}
        />
    );
};

export default EditRouteContainer;
