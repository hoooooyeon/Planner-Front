import { useDispatch, useSelector } from 'react-redux';
import PlannerList from '../../components/planner/list/PlannerList';
import {} from '../../modules/plannerModule';

const PlannerListContainer = () => {
    const dispatch = useDispatch();
    const { planners, plannerError } = useSelector(({ plannerReducer }) => ({
        planners: plannerReducer.planners,
        plannerError: plannerReducer.plannerError,
    }));

    return <PlannerList />;
};

export default PlannerListContainer;
