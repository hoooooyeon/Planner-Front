import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlannerInfo from '../../../components/planner/info/PlannerInfo';
import { changeCurPlanIdAction, deletePlannerAction, loadPlanAction, loadPlannerAction, toggleMemberModalAction, togglePlannerInfoModalAction } from '../../../modules/plannerModule';

const PlannerInfoContainer = () => {
    const dispatch = useDispatch();
    const { planner, plannerError } = useSelector(({ plannerReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
    }));

    const { plans } = planner;

    const onDeletePlanner = () => {
        dispatch(deletePlannerAction(planner.plannerId));
    };

    const onToggleMemberModal = () => {
        dispatch(toggleMemberModalAction());
    };

    const onTogglePlannerInfoModal = () => {
        dispatch(togglePlannerInfoModalAction());
    };

    // useEffect(() => {
    //     if (planner.plans) {
    //         dispatch(loadPlanAction(planner.plans[0]));
    //     }
    // }, [dispatch]);

    // useEffect(() => {
    //     dispatch(loadPlannerAction());
    // });

    // 수정페이지 도달시 맨처음 currentInfo plan 설정.
    useEffect(() => {
        if (plans && plans.length !== 0) {
            dispatch(changeCurPlanIdAction(plans[0].planId));
        } else if (plans && plans.length === 0) {
            dispatch(changeCurPlanIdAction(null));
        }
    }, [dispatch, plans]);

    return <PlannerInfo planner={planner} onDeletePlanner={onDeletePlanner} onToggleMemberModal={onToggleMemberModal} onTogglePlannerInfoModal={onTogglePlannerInfoModal} />;
};

export default PlannerInfoContainer;
