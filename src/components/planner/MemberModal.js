import styled from 'styled-components';
import Modal from '../common/Modal';

const MemberBox = styled.div`
    padding: 10px 0;
`;
const InviteBox = styled.div`
    display: flex;
    justify-content: space-between;
`;
const Text = styled.input`
    width: 80%;
    height: 25px;
    font-size: 15px;
`;

const Button = styled.button`
    width: 3.5rem;
    height: 2rem;
    border-radius: 10px;
    border: none;
    background-color: rgba(255, 203, 193, 80%);
    color: white;
    font-weight: bold;
    cursor: pointer;
`;

const MemberList = styled.ul`
    border: 1px solid black;
    width: calc(100% - 20px);
    max-height: 100px;
    min-height: 50px;
    padding: 10px;
    overflow: auto;
    line-height: 15px;
`;

const Member = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const MemberModal = ({ planner, members, modal, onChangeMember, onDeleteMember, onInviteMember, onResetMember, onToggleMemberModal }) => {
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
            title="멤버 초대"
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
                <h4>현재 멤버</h4>
                <MemberList>
                    {planner.planMembers &&
                        planner.planMembers.map((m, i) =>
                            planner.creator !== m ? (
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
