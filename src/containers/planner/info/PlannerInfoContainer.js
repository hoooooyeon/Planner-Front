import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlannerInfo from '../../../components/planner/info/PlannerInfo';
import { deletePlannerAction, loadPlanAction, loadPlannerAction, toggleMemberModalAction, togglePlannerInfoModalAction } from '../../../modules/plannerModule';

const PlannerInfoContainer = () => {
    const dispatch = useDispatch();
    const { planner, plannerError } = useSelector(({ plannerReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
    }));

    const onDeletePlanner = () => {
        dispatch(deletePlannerAction(planner.plannerId));
    };

    const onToggleMemberModal = () => {
        dispatch(toggleMemberModalAction());
    };

    const onTogglePlannerInfoModal = () => {
        dispatch(togglePlannerInfoModalAction());
    };

    // 정보페이지 도달시 맨처음 plan 정보 로드.
    useEffect(() => {
        if (planner.plans) {
            dispatch(loadPlanAction(planner.plans[0]));
        }
    }, [dispatch, planner]);

    // useEffect(() => {
    //     if (planner.plans) {
    //         dispatch(loadPlanAction(planner.plans[0]));
    //     }
    // }, [dispatch]);

    // useEffect(() => {
    //     dispatch(loadPlannerAction());
    // });
    return <PlannerInfo planner={planner} onDeletePlanner={onDeletePlanner} onToggleMemberModal={onToggleMemberModal} onTogglePlannerInfoModal={onTogglePlannerInfoModal} />;
};

export default PlannerInfoContainer;
