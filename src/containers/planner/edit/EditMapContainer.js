import { useDispatch, useSelector } from 'react-redux';
import EditMap from '../../../components/planner/edit/EditMap';
import { createPlannerAction } from '../../../modules/plannerModule';

const EditMapContainer = () => {
    const dispatch = useDispatch();
    const { planner, plannerError } = useSelector(({ plannerReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
    }));

    const onCreatePlanner = () => {
        dispatch(createPlannerAction(planner));
    };

    return <EditMap planner={planner} onCreatePlanner={onCreatePlanner} />;
};

export default EditMapContainer;
