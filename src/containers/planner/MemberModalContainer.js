import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MemberModal from '../../components/planner/MemberModal';
import { changeMemberAction, deleteMemberAction, inviteMemberAction, resetMemberAction, toggleMemberModalAction } from '../../modules/plannerModule';

const MemberModalContainer = () => {
    const dispatch = useDispatch();
    const { planner, plannerError, members, modal } = useSelector(({ plannerReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
        members: plannerReducer.members,
        modal: plannerReducer.modal,
    }));

    const { plannerId } = { ...planner };

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

    const onToggleMemberModal = () => {
        dispatch(toggleMemberModalAction());
    };

    // planner 정보 가져오기
    //  useEffect(() => {
    //     if (currentInfo && plannerId) {
    //         // const { curPlannerId } = currentInfo;
    //         // dispatch(loadPlannerAction(curPlannerId));
    //         dispatch(loadPlannerAction(plannerId));
    //     }
    // }, [dispatch, currentInfo, plannerId]);

    return (
        <MemberModal
            planner={planner}
            members={members}
            modal={modal}
            onChangeMember={onChangeMember}
            onInviteMember={onInviteMember}
            onDeleteMember={onDeleteMember}
            onResetMember={onResetMember}
            onToggleMemberModal={onToggleMemberModal}
        />
    );
};

export default MemberModalContainer;
