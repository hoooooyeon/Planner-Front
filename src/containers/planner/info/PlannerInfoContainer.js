import { useDispatch, useSelector } from 'react-redux';
import PlannerInfo from '../../../components/planner/info/PlannerInfo';
import { deletePlannerAction, toggleMemberModalAction, togglePlannerInfoModalAction } from '../../../modules/plannerModule';

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

    return <PlannerInfo planner={planner} onDeletePlanner={onDeletePlanner} onToggleMemberModal={onToggleMemberModal} onTogglePlannerInfoModal={onTogglePlannerInfoModal} />;
};

export default PlannerInfoContainer;
