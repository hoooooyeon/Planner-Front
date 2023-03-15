import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditMap from '../../../components/planner/edit/EditMap';
import { createPlanAction, createPlannerAction, deletePlanAction, toggleMemberModalAction, togglePlannerInfoModalAction, updatePlanAction, updatePlannerAction } from '../../../modules/plannerModule';

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

    const onToggleMemberModal = () => {
        dispatch(toggleMemberModalAction());
    };
    const onTogglePlannerInfoModal = () => {
        dispatch(togglePlannerInfoModalAction());
    };

    // useEffect(() => {
    //     dispatch(loadPlannerAction(plannerId));
    // }, [dispatch, planMembers, plannerId]);

    return <EditMap planner={planner} onCreatePlanner={onCreatePlanner} onUpdatePlanner={onUpdatePlanner} onToggleMemberModal={onToggleMemberModal} onTogglePlannerInfoModal={onTogglePlannerInfoModal} />;
};

export default EditMapContainer;
