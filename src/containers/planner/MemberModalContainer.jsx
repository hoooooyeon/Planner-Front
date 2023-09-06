import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MemberModal from '../../components/planner/MemberModal';
import {
    deleteMemberAction,
    inviteMemberAction,
    resetPlannerErrorAction,
    toggleMemberModalAction,
} from '../../modules/plannerModule';

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

    // 멤버 초대
    const onInviteMember = () => {
        if (accountId === planner.accountId) {
            dispatch(inviteMemberAction({ plannerId, members }));
        }
    };

    // 멤버 삭제
    const onDeleteMember = (nickName) => {
        if (accountId === planner.accountId) {
            dispatch(deleteMemberAction({ plannerId, nickName }));
        }
    };

    // 멤버 타이핑
    const onChangeMember = (members) => {
        setMembers([members]);
    };

    // 멤버 타이핑 리셋
    const onResetMember = () => {
        setMembers([]);
    };

    // 멤버 모달 토글
    const onToggleMemberModal = () => {
        dispatch(toggleMemberModalAction());
    };

    // plannerError 리셋
    const onCloseError = () => {
        dispatch(resetPlannerErrorAction());
    };

    if (Object.keys(planner).length <= 0) {
        return null;
    }
    return (
        <MemberModal
            planner={planner}
            members={members}
            modal={modal}
            plannerError={plannerError}
            onChangeMember={onChangeMember}
            onInviteMember={onInviteMember}
            onDeleteMember={onDeleteMember}
            onResetMember={onResetMember}
            onToggleMemberModal={onToggleMemberModal}
            onCloseError={onCloseError}
        />
    );
};

export default MemberModalContainer;
