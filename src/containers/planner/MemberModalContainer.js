import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MemberModal from '../../components/planner/MemberModal';
import { deleteMemberAction, inviteMemberAction, toggleMemberModalAction } from '../../modules/plannerModule';

const MemberModalContainer = () => {
    const dispatch = useDispatch();
    const { planner, plannerError, modal, account } = useSelector(({ plannerReducer, authReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
        modal: plannerReducer.modal,
        account: authReducer.account,
    }));

    const { plannerId } = { ...planner };
    const { accountId } = { ...account };

    const [members, setMembers] = useState([]);

    const onInviteMember = () => {
        if (accountId && account.accountId === planner.accountId) {
            dispatch(inviteMemberAction({ plannerId, members }));
        }
    };
    const onDeleteMember = (nickName) => {
        if (accountId && account.accountId === planner.accountId) {
            dispatch(deleteMemberAction({ plannerId, nickName }));
        }
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

    if (!planner) {
        return null;
    }
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
