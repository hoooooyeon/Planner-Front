import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MemberModal from '../../components/planner/MemberModal';
import { deleteMemberAction, inviteMemberAction, toggleMemberModalAction } from '../../modules/plannerModule';

const MemberModalContainer = () => {
    const dispatch = useDispatch();
    const { planner, plannerError, modal } = useSelector(({ plannerReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
        modal: plannerReducer.modal,
    }));

    const { plannerId } = { ...planner };

    const [members, setMembers] = useState([]);

    const onInviteMember = () => {
        dispatch(inviteMemberAction({ plannerId, members }));
    };
    const onDeleteMember = (nickName) => {
        dispatch(deleteMemberAction({ plannerId, nickName }));
    };

    const onChangeMember = (members) => {
        setMembers([members]);
    };

    const onResetMember = () => {
        setMembers([]);
    };

    const onToggleMemberModal = () => {
        dispatch(toggleMemberModalAction());
    };

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
