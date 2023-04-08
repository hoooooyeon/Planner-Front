import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditRoute from '../../../components/planner/edit/EditRoute';
import { createPlan } from '../../../lib/api/plannerAPI';
import {
    changeCurPlanIdAction,
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
    updatePlanAction,
    updatePlannerAction,
} from '../../../modules/plannerModule';

const EditRouteContainer = () => {
    const dispatch = useDispatch();
    const { planner, plannerError, plan, newPlanId, currentInfo, loading } = useSelector(({ plannerReducer, loadingReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
        plan: plannerReducer.plan,
        currentInfo: plannerReducer.currentInfo,
        loading: loadingReducer.loading,
    }));

    const { plannerId, plans, title, planDateStart, planDateEnd, expense, memberCount, memberTypeId } = { ...planner };
    const { planId } = { ...currentInfo };

    const letsFormat = (d) => {
        const date = new Date(d);
        return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    };

    // 기존 날짜에 수가 더해짐 리렌더링시 정상임
    const onUpdatePlanner = (date) => {
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

    const letsFormat2 = (d) => {
        const date = new Date(d);
        return (
            date.getFullYear() +
            '-' +
            ('0' + (date.getMonth() + 1)).slice(-2) +
            '-' +
            ('0' + date.getDate()).slice(-2) +
            ' ' +
            ('0' + date.getHours()).slice(-2) +
            ':' +
            ('0' + date.getMinutes()).slice(-2) +
            ':' +
            ('0' + date.getSeconds()).slice(-2)
        );
    };
    const onCreatePlan = () => {
        const planDate = letsFormat2(new Date(planDateEnd));
        dispatch(createPlanAction({ plannerId, planDate }));
    };
    const onDeletePlan = (planId) => {
        dispatch(deletePlanAction({ plannerId, planId }));
    };

    const onUpdatePlan = () => {};

    useEffect(() => {
        let date = new Date(planDateStart);
        let planDate = letsFormat2(date);
        let planId = 0;

        if (plans) {
            for (let i = 0; i < plans.length; i++) {
                planId = plans[i].planId;

                if (i >= 1) {
                    planDate = letsFormat2(date.setDate(date.getDate() + 1));
                }
                dispatch(updatePlanAction({ plannerId, planId, planDate }));
            }
        }
    }, [dispatch, planDateStart, planDateEnd, plannerId]);

    // plan 삭제로 날짜가 제거될 때, plan 날짜들을 여행일자에 맞게 수정
    const onUpdateSubPlan = () => {
        // for 사용
        // let date = new Date(planDateStart);
        // let planDate = letsFormat2(date);
        // for (let i = 0; i < plans.length; i++) {
        //     let planId = plans[i].planId;
        //     if (i >= 1) {
        //         planDate = letsFormat2(date.setDate(date.getDate() + 1));
        //     }
        //     dispatch(updatePlanAction({ plannerId, planId, planDate }));
        // }
        // map 사용
        // plans.map((p) => {
        //     let planId = p.planId;
        //     let i = 0;
        //     const planDate = letsFormat(date.setDate(date.getDate() + i));
        //     return dispatch(updatePlanAction({ plannerId, planId, planDate }));
        // });
    };

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
            onUpdatePlanner={onUpdatePlanner}
            onChangeCurPlanId={onChangeCurPlanId}
            onAddDate={onAddDate}
            onSubDate={onSubDate}
            onUpdateSubPlan={onUpdateSubPlan}
            onChangePlans={onChangePlans}
        />
    );
};

export default EditRouteContainer;
