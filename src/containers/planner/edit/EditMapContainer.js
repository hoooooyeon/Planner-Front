import { useDispatch, useSelector } from 'react-redux';
import EditMap from '../../../components/planner/edit/EditMap';
import { createPlanAction, createPlannerAction, deletePlanAction, updatePlanAction, updatePlannerAction } from '../../../modules/plannerModule';

const EditMapContainer = () => {
    const dispatch = useDispatch();
    const { planner, plannerError } = useSelector(({ plannerReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
    }));

    const { accountId, plannerId, creator, title, planDateStart, planDateEnd, planMembers, expense, memberCount, memberTypeId } = planner;
    const onCreatePlanner = () => {
        dispatch(createPlannerAction({ accountId, creator, title, planDateStart, planDateEnd, planMembers, expense, memberCount, memberTypeId }));
    };

    const onUpdatePlanner = () => {
        dispatch(updatePlannerAction({ plannerId, title, planDateStart, planDateEnd, expense, memberCount, memberTypeId }));
    };

    const onCreatePlan = () => {
        dispatch(createPlanAction());
    };
    const onUpdatePlan = () => {
        dispatch(updatePlanAction());
    };
    const onDeletePlan = () => {
        dispatch(deletePlanAction());
    };

    return <EditMap planner={planner} onCreatePlanner={onCreatePlanner} onUpdatePlanner={onUpdatePlanner} />;
};

export default EditMapContainer;
