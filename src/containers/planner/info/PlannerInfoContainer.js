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

    const { plannerId, plans } = { ...planner };

    const onDeletePlanner = () => {
        dispatch(deletePlannerAction(plannerId));
    };

    const onToggleMemberModal = () => {
        dispatch(toggleMemberModalAction());
    };

    const onTogglePlannerInfoModal = () => {
        dispatch(togglePlannerInfoModalAction());
    };

    // 수정페이지 도달시 맨처음 currentInfo plan 설정.
    // useEffect(() => {
    //     // if (planner) {
    //     // const { plans } = planner;
    //     if (planner && plans.length !== 0) {
    //         console.log(1);
    //         dispatch(changeCurPlanIdAction(plans[0].planId));
    //     } else if (planner && plans.length === 0) {
    //         console.log(2);
    //         dispatch(changeCurPlanIdAction(1));
    //     }
    //     // }
    // }, [dispatch]);

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

    return <PlannerInfo planner={planner} currentInfo={currentInfo} onDeletePlanner={onDeletePlanner} onToggleMemberModal={onToggleMemberModal} onTogglePlannerInfoModal={onTogglePlannerInfoModal} onChangeCurPlanId={onChangeCurPlanId} />;
};

export default PlannerInfoContainer;
