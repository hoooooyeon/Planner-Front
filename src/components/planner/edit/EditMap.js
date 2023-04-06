import { useState } from 'react';
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Modal from '../../common/Modal';
import MemberModal from '../MemberModal';
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

const EditMap = ({ planner, onCreatePlanner, onUpdatePlanner, onToggleMemberModal, onTogglePlannerInfoModal }) => {
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

    return (
        <EditMapBlock>
            <Map id="map" ref={container}>
                <ButtonBox>
                    <Button>사용 방법</Button>
                    <Button onClick={onToggleMemberModal}>멤버 초대</Button>
                    <Button onClick={onTogglePlannerInfoModal}>플래너 정보 수정</Button>
                    <Button>장소 등록</Button>
                    <Button>
                        {/* <Button onClick={onUpdatePlanner}> */}
                        <Link to="/PlannerInfo">일정 저장</Link>
                    </Button>
                </ButtonBox>
            </Map>
        </EditMapBlock>
    );
};

export default EditMap;
