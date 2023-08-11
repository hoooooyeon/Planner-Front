import styled from 'styled-components';
import Modal from '../common/Modal';

const MemberBox = styled.div`
    width: 25rem;
    height: 15rem;
    flex-direction: column;
    background-color: var(--md-sys-color-surface);
    border-radius: 0.5rem;
`;

const InviteBox = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Text = styled.input`
    width: 80%;
    height: 2rem;
    border: none;
    border-radius: 0.3rem;
    padding: 0 0.5rem;
    background-color: var(--md-sys-color-surface);
    box-shadow: 0px 1px 3px -2px var(--md-sys-color-shadow);
    &::placeholder {
        color: var(--md-sys-color-primary);
    }
    &:focus {
        color: var(--md-sys-color-primary);
        outline: none;
    }
`;

const Button = styled.button`
    width: 3.5rem;
    height: 2rem;
    border-radius: 0.5rem;
    border: none;
    background-color: var(--md-sys-color-surface);
    box-shadow: 0px 1px 3px -2px var(--md-sys-color-shadow);
    font-weight: bold;
    cursor: pointer;
    &:hover {
        color: var(--md-sys-color-on-primary-container);
        box-shadow: 0px 1px 6px -3px var(--md-sys-color-shadow);
    }
`;

const MemberList = styled.ul`
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    padding: 0.5rem;
    overflow: auto;
    height: 8rem;
`;

const Member = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const MemberModal = ({
    planner,
    members,
    modal,
    onChangeMember,
    onDeleteMember,
    onInviteMember,
    onResetMember,
    onToggleMemberModal,
}) => {
    const { planMembers, creator } = { ...planner };

    const onInviteMemberMd = () => {
        if (planner.creator === members[0]) {
            alert('생성자는 초대할 수 없습니다.');
            return;
        }
        onInviteMember();
    };

    return (
        <Modal
            modalVisible={modal.member}
            title="멤버 관리"
            onModalClose={() => {
                onToggleMemberModal();
                onResetMember();
            }}
            onModalConfirm={() => {
                onToggleMemberModal();
                onResetMember();
            }}
        >
            <MemberBox>
                <InviteBox>
                    <Text
                        placeholder="초대할 아이디"
                        type="text"
                        onChange={(e) => {
                            onChangeMember(e.target.value);
                        }}
                    />
                    <Button onClick={onInviteMemberMd}>초대</Button>
                </InviteBox>
                <h5>현재 멤버</h5>
                <MemberList>
                    {planMembers &&
                        planMembers.map((m, i) =>
                            creator !== m ? (
                                <Member key={i}>
                                    <p>{m}</p>
                                    <Button
                                        onClick={() => {
                                            onDeleteMember(m);
                                        }}
                                    >
                                        제거
                                    </Button>
                                </Member>
                            ) : (
                                <Member key={i}>
                                    <p>{m}</p>
                                </Member>
                            ),
                        )}
                </MemberList>
            </MemberBox>
        </Modal>
    );
};

export default MemberModal;
