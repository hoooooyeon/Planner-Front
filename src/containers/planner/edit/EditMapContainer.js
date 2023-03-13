import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditMap from '../../../components/planner/edit/EditMap';
import {
    changeMemberAction,
    createPlanAction,
    createPlannerAction,
    deleteMemberAction,
    deletePlanAction,
    inviteMemberAction,
    loadPlannerAction,
    resetMemberAction,
    updatePlanAction,
    updatePlannerAction,
} from '../../../modules/plannerModule';

const EditMapContainer = () => {
    const dispatch = useDispatch();
    const { planner, plannerError, members } = useSelector(({ plannerReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
        members: plannerReducer.members,
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

    const onInviteMember = () => {
        dispatch(inviteMemberAction({ plannerId, members }));
    };
    const onDeleteMember = (nickName) => {
        dispatch(deleteMemberAction({ plannerId, nickName }));
    };

    const onChangeMember = (members) => {
        dispatch(changeMemberAction(members));
    };

    const onResetMember = () => {
        dispatch(resetMemberAction());
    };

    useEffect(() => {
        dispatch(loadPlannerAction(plannerId));
    }, [dispatch, planMembers, plannerId]);

    return (
        <EditMap
            planner={planner}
            members={members}
            onCreatePlanner={onCreatePlanner}
            onUpdatePlanner={onUpdatePlanner}
            onInviteMember={onInviteMember}
            onDeleteMember={onDeleteMember}
            onChangeMember={onChangeMember}
            onResetMember={onResetMember}
        />
    );
};

export default EditMapContainer;
