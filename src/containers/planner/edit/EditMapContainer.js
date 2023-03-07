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
        const { accountId, creator, title, planDateStart, planDateEnd, planMembers, expense, memberCount, memberTypeId } = planner;
        dispatch(createPlannerAction({ accountId, creator, title, planDateStart, planDateEnd, planMembers, expense, memberCount, memberTypeId }));
    };

    const onUpdatePlanner = () => {
        const { plannerId, title, planDateStart, planDateEnd, expense, memberCount, memberTypeId } = planner;
        dispatch(updatePlannerAction({ plannerId, title, planDateStart, planDateEnd, expense, memberCount, memberTypeId }));
    };

    return <EditMap planner={planner} onCreatePlanner={onCreatePlanner} onUpdatePlanner={onUpdatePlanner} />;
};

export default EditMapContainer;
