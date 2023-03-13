import { useState } from 'react';
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Modal from '../../common/Modal';
const EditMapBlock = styled.div`
    width: calc(100% - 720px);
    /* min-width: 200px; */
    height: 750px;
    float: left;
`;

const Map = styled.div`
    width: 100%;
    height: 100%;
`;

const ButtonBox = styled.div`
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 999;
    display: flex;
    flex-direction: column;
    /* button {
        margin-bottom: 10px;
    } */
`;

const Button = styled.button`
    border: none;
    border-radius: 1rem;
    width: 8rem;
    height: 3rem;
    background-color: rgba(255, 203, 193, 80%);
    color: white;
    font-weight: bold;
    cursor: pointer;

    margin-bottom: 10px;
    &:hover {
        transform: translate(1px, -1px);
    }
    a {
        display: block;
        color: white;
        height: 100%;
        line-height: 3rem;
    }
`;
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

const InviteButton = styled(Button)`
    width: 3.5rem;
    height: 2rem;
    border-radius: 10px;
    margin: 0;
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
const DeleteButton = styled(Button)`
    width: 3rem;
    height: 2rem;
    border-radius: 10px;
    margin: 0;
`;

const EditMap = ({ planner, members, onCreatePlanner, onUpdatePlanner, onInviteMember, onDeleteMember, onChangeMember, onResetMember }) => {
    const { kakao } = window;
    const container = useRef(null);
    const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
    };
    useEffect(() => {
        new kakao.maps.Map(container.current, options);
        return () => {};
    }, []);

    const [isInvite, setIsInvite] = useState(false);
    // const onEditPost = async () => {
    //     setIsEdit(false);
    //     const update = () => {
    //         onUpdateMemo(curMemo.memoId);
    //     };
    //     const load = () => {
    //         onLoadPlanner();
    //     };
    //     await update();
    //     await load();
    // };
    const onInviteMemberMd = () => {
        onInviteMember();
    };
    return (
        <EditMapBlock>
            <Map id="map" ref={container}>
                <ButtonBox>
                    <Button>사용 방법</Button>
                    <Button
                        onClick={() => {
                            setIsInvite(true);
                            onResetMember();
                        }}
                    >
                        멤버 초대
                    </Button>
                    {isInvite && (
                        <Modal
                            modalVisible={isInvite}
                            title="멤버 초대"
                            onModalClose={() => {
                                setIsInvite(false);
                            }}
                            onModalConfirm={() => {
                                setIsInvite(false);
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
                                    <InviteButton onClick={onInviteMember}>초대</InviteButton>
                                </InviteBox>
                                <h4>현재 멤버</h4>
                                <MemberList>
                                    {planner.planMembers &&
                                        planner.planMembers.map((m, i) => (
                                            <Member key={i}>
                                                <p>{m}</p>
                                                <DeleteButton
                                                    onClick={() => {
                                                        onDeleteMember(m);
                                                    }}
                                                >
                                                    제거
                                                </DeleteButton>
                                            </Member>
                                        ))}
                                </MemberList>
                            </MemberBox>
                        </Modal>
                    )}
                    <Button>장소 등록</Button>
                    {!planner.plannerId ? (
                        <Button onClick={onCreatePlanner}>
                            <Link to="/PlannerList">일정 저장</Link>
                        </Button>
                    ) : (
                        <Button onClick={onUpdatePlanner}>
                            <Link to="/PlannerInfo">일정 저장</Link>
                        </Button>
                    )}
                </ButtonBox>
            </Map>
        </EditMapBlock>
    );
};

export default EditMap;
