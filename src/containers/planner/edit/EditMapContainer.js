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
        const { accountId, creator, title, planDateStart, planDateEnd, planMembers } = planner;
        dispatch(createPlannerAction({ accountId, creator, title, planDateStart, planDateEnd, planMembers }));
    };

    return <EditMap planner={planner} onCreatePlanner={onCreatePlanner} />;
};

export default EditMapContainer;
