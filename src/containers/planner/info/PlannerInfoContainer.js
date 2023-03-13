import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlannerInfo from '../../../components/planner/info/PlannerInfo';
import { changeMemberAction, deleteMemberAction, deletePlannerAction, inviteMemberAction, loadPlannerAction, resetMemberAction } from '../../../modules/plannerModule';

const PlannerInfoContainer = () => {
    const dispatch = useDispatch();
    const { planner, plannerError, members } = useSelector(({ plannerReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
        members: plannerReducer.members,
    }));

    const onDeletePlanner = () => {
        dispatch(deletePlannerAction(planner.plannerId));
    };
    const onInviteMember = () => {
        dispatch(inviteMemberAction(members));
    };
    const onDeleteMember = () => {
        dispatch(deleteMemberAction(members));
    };

    const onChangeMember = (members) => {
        dispatch(changeMemberAction(members));
    };

    const onResetMember = () => {
        dispatch(resetMemberAction());
    };

    return <PlannerInfo planner={planner} onDeletePlanner={onDeletePlanner} onInviteMember={onInviteMember} onDeleteMember={onDeleteMember} onChangeMember={onChangeMember} onResetMember={onResetMember} />;
};

export default PlannerInfoContainer;
