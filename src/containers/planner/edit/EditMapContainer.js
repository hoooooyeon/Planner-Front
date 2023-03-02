import { useDispatch, useSelector } from 'react-redux';
import EditMap from '../../../components/planner/edit/EditMap';
import { createPlannerAction, updatePlannerAction } from '../../../modules/plannerModule';

const EditMapContainer = () => {
    const dispatch = useDispatch();
    const { planner, plannerError } = useSelector(({ plannerReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
    }));

    const onCreatePlanner = () => {
        const { accountId, creator, title, planDateStart, planDateEnd, planMembers } = planner;
        dispatch(createPlannerAction({ accountId, creator, title, planDateStart, planDateEnd, planMembers }));
    };

    const onUpdatePlanner = () => {
        const { plannerId, title, planDateStart, planDateEnd } = planner;
        dispatch(updatePlannerAction({ plannerId, title, planDateStart, planDateEnd }));
    };

    return <EditMap planner={planner} onCreatePlanner={onCreatePlanner} onUpdatePlanner={onUpdatePlanner} />;
};

export default EditMapContainer;
