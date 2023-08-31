import styled from 'styled-components';
import Modal from '../common/Modal';

const MemberBox = styled.div`
    width: 25rem;
    height: 15rem;
    background-color: ${(props) => props.theme.primaryBackgroundColor};
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
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    &::placeholder {
        color: ${(props) => props.theme.tertiaryColor};
    }
    &:focus {
        color: ${(props) => props.theme.tertiaryColor};
        outline: none;
    }
`;

const Button = styled.button`
    width: 3.5rem;
    height: 2rem;
    border-radius: 0.5rem;
    border: none;
    background-color: ${(props) => props.theme.primaryButtonBackgroundColor};
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    font-weight: bold;
    cursor: pointer;
    &:hover {
        color: ${(props) => props.theme.hoverColor};
        box-shadow: 0px 1px 6px ${(props) => props.theme.shadowColor};
    }
`;

const MemberList = styled.ul`
    box-shadow: 0 0 2px ${(props) => props.theme.shadowColor};
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
        if (creator === members[0]) {
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
