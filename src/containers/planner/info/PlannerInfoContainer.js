import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlannerInfo from '../../../components/planner/info/PlannerInfo';
import { changeCurPlanIdAction, deletePlannerAction, loadPlanAction, loadPlannerAction, toggleMemberModalAction, togglePlannerInfoModalAction } from '../../../modules/plannerModule';

const PlannerInfoContainer = () => {
    const dispatch = useDispatch();
    const { planner, plannerError, currentInfo } = useSelector(({ plannerReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
        currentInfo: plannerReducer.currentInfo,
    }));

    const onDeletePlanner = () => {
        if (planner) {
            const { plannerId } = planner;
            dispatch(deletePlannerAction(plannerId));
        }
    };

    const onToggleMemberModal = () => {
        dispatch(toggleMemberModalAction());
    };

    const onTogglePlannerInfoModal = () => {
        dispatch(togglePlannerInfoModalAction());
    };

    // 수정페이지 도달시 맨처음 currentInfo plan 설정.
    // useEffect(() => {
    //     if (plans && plans.length !== 0) {
    //         dispatch(changeCurPlanIdAction(plans[0].planId));
    //     } else if (plans && plans.length === 0) {
    //         dispatch(changeCurPlanIdAction(null));
    //     }
    // }, [dispatch, plans]);

    // planner 정보 가져오기
    useEffect(() => {
        if (currentInfo) {
            const { plannerId } = currentInfo;
            // if (currentInfo && plannerId) {
            dispatch(loadPlannerAction(plannerId));
            // }
        }
    }, [dispatch, currentInfo]);
    // // planner 정보 가져오기
    // useEffect(() => {
    //     if (planner) {
    //         const { plannerId } = planner;
    //         // if (currentInfo && plannerId) {
    //         dispatch(loadPlannerAction(plannerId));
    //         // }
    //     }
    // }, [dispatch, currentInfo]);

    return <PlannerInfo planner={planner} currentInfo={currentInfo} onDeletePlanner={onDeletePlanner} onToggleMemberModal={onToggleMemberModal} onTogglePlannerInfoModal={onTogglePlannerInfoModal} />;
};

export default PlannerInfoContainer;
