import { useDispatch, useSelector } from 'react-redux';
import PlannerInfo from '../../../components/planner/info/PlannerInfo';
import { deletePlannerAction } from '../../../modules/plannerModule';

const PlannerInfoContainer = () => {
    const dispatch = useDispatch();
    const { planner, plannerError } = useSelector(({ plannerReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
    }));

    const onDeletePlanner = () => {
        dispatch(deletePlannerAction(planner.plannerId));
    };

    return <PlannerInfo planner={planner} onDeletePlanner={onDeletePlanner} />;
};

export default PlannerInfoContainer;
