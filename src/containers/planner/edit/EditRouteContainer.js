import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditRoute from '../../../components/planner/edit/EditRoute';
import { createPlan } from '../../../lib/api/plannerAPI';
import {
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
} from '../../../modules/plannerModule';

const EditRouteContainer = () => {
    const dispatch = useDispatch();
    const { planner, plannerError, plan } = useSelector(({ plannerReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
        plan: plannerReducer.plan,
    }));

    const { plannerId, planDateEnd } = planner;

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
        dispatch(updatePlanAction());
    };

    const onLoadPlan = (plan) => {
        dispatch(loadPlanAction(plan));
    };

    const onDeleteLocation = (locationId) => {
        if (plan) {
            const { planId } = plan;
            dispatch(deleteLocationAction({ plannerId, locationId, planId }));
        }
    };

    // 수정페이지 도달시 맨처음 plan 정보 로드.
    useEffect(() => {
        if (planner.plans) {
            dispatch(loadPlanAction(planner.plans[0]));
        }
    }, [dispatch, planner]);

    // // 플래너 정보 가져오기
    // useEffect(() => {
    //     dispatch(loadPlannerAction(planner.plannerId));
    // }, [dispatch, planner]);

    return (
        <EditRoute
            planner={planner}
            plan={plan}
            onChangePlannerDateStart={onChangePlannerDateStart}
            onChangePlannerDateEnd={onChangePlannerDateEnd}
            onCreatePlan={onCreatePlan}
            onDeletePlan={onDeletePlan}
            onLoadPlan={onLoadPlan}
            onUpdatePlan={onUpdatePlan}
            onDeleteLocation={onDeleteLocation}
        />
    );
};

export default EditRouteContainer;
