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
    const { planner, plannerError, plan, newPlanId, currentInfo } = useSelector(({ plannerReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
        plan: plannerReducer.plan,
        currentInfo: plannerReducer.currentInfo,
    }));

    const { plannerId, plans, title, planDateStart, planDateEnd, expense, memberCount, memberTypeId } = planner;

    const letsFormat2 = (d) => {
        const date = new Date(d);
        return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    };
    // 기존 날짜에 수가 더해짐 리렌더링시 정상임
    const onUpdatePlanner = (date) => {
        // let planDateStart = letsFormat2(date);
        // let planDateEnd = letsFormat2(date.setDate(date.getDate() + plans.length - 1));
        // dispatch(updatePlannerAction({ plannerId, title, planDateStart, planDateEnd, expense, memberCount, memberTypeId }));
    };

    const onChangePlannerDateStart = (date) => {
        dispatch(changePlannerDateStartAction(date));
    };

    const onChangePlannerDateEnd = (date) => {
        dispatch(changePlannerDateEndAction(date));
    };

    const letsFormat = (d) => {
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
        const planDate = letsFormat(new Date(planDateEnd));
        dispatch(createPlanAction({ plannerId, planDate }));
    };
    const onDeletePlan = (planId) => {
        dispatch(deletePlanAction({ plannerId, planId }));
    };
    const onUpdatePlan = () => {
        if (plan) {
            // const planDate = letsFormat(new Date(planDateStart));
            const date = new Date(planDateStart);

            for (let i = 0; i < plans.length; i++) {
                let planId = plans[i].planId;
                // let planDate = letsFormat(date.setDate(date.getDate() + 1));

                // dispatch(updatePlanAction({ plannerId, planId, planDate }));
            }
        }
    };

    const onLoadPlan = (plan) => {
        dispatch(loadPlanAction(plan));
    };

    const onDeleteLocation = (locationId) => {
        if (currentInfo) {
            const { curPlanId } = currentInfo;
            dispatch(deleteLocationAction({ plannerId, locationId, curPlanId }));
        }
    };

    // 수정페이지 도달시 맨처음 plan 정보 로드.
    useEffect(() => {
        if (planner.plans[0]) {
            dispatch(changeCurPlanIdAction(planner.plans[0].planId));
        }
    }, [dispatch]);

    // planner 정보 가져오기
    useEffect(() => {
        if (currentInfo) {
            const { curPlannerId } = currentInfo;
            dispatch(loadPlannerAction(plannerId));
            // dispatch(loadPlannerAction(curPlannerId));
        }
    }, [dispatch, currentInfo, plannerId]);

    const onChangeCurPlanId = (planId) => {
        dispatch(changeCurPlanIdAction(planId));
    };

    return (
        <EditRoute
            planner={planner}
            plan={plan}
            currentInfo={currentInfo}
            onChangePlannerDateStart={onChangePlannerDateStart}
            onChangePlannerDateEnd={onChangePlannerDateEnd}
            onCreatePlan={onCreatePlan}
            onDeletePlan={onDeletePlan}
            onLoadPlan={onLoadPlan}
            onUpdatePlan={onUpdatePlan}
            onDeleteLocation={onDeleteLocation}
            onUpdatePlanner={onUpdatePlanner}
            onChangeCurPlanId={onChangeCurPlanId}
        />
    );
};

export default EditRouteContainer;
