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

    const onUpdatePlanner = () => {
        const { plannerId, title, planDateStart, planDateEnd, expense, memberCount, memberTypeId } = planner;
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

    return <EditMap planner={planner} onUpdatePlanner={onUpdatePlanner} onToggleMemberModal={onToggleMemberModal} onTogglePlannerInfoModal={onTogglePlannerInfoModal} />;
};

export default EditMapContainer;
