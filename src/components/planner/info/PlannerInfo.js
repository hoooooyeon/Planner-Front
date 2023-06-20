import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

import InfoMap from './InfoMap';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import InfoRoute from './InfoRoute';
import InfoMenu from './InfoMenu';
import Modal from '../../common/Modal';
import MemberModal from '../MemberModal';

const PlannerInfoBlock = styled.div`
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    padding-top: 70px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
    margin: 0 auto;
    @media all and (min-width: 768px) {
        padding: 0 9rem;
    }
`;

const InfoHeader = styled.div`
    display: flex;
    align-items: center;
    h3 {
        white-space: nowrap;
    }
`;

const MenuBox = styled.div`
    position: relative;
    padding-left: 1rem;
`;

const MenuList = styled.ul`
    display: none;
    padding: 0;
    @media all and (min-width: 1024px) {
        display: flex;
    }
`;

const MenuItem = styled.li`
    border-radius: 0.5rem;
    padding: 0.5rem;
    margin-left: 0.5rem;
    box-shadow: 0 0px 2px rgba(0, 0, 0, 0.5);
    font-size: 0.8rem;
    white-space: nowrap;
    background-color: white;
    cursor: pointer;
    a {
        color: black;
    }
    &:hover {
        background-color: rgba(0, 0, 0, 0.01);
    }
`;

const Menu = styled.div`
    width: 4rem;
    height: 2rem;
    align-items: center;
    border-radius: 0.5rem;
    justify-content: space-evenly;
    background-color: white;
    box-shadow: 0 0px 2px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    display: none;
    @media all and (max-width: 1023px) {
        display: flex;
    }
`;

const DropDownMenu = styled.ul`
    position: absolute;
    z-index: 10;
    width: 7rem;
    flex-direction: column;
    padding: 0;
    background-color: white;
    border-radius: 0.5rem;
    top: 24px;
    left: 10px;
    font-size: 0.7rem;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
    li {
        cursor: pointer;
        padding: 5px 10px;
        &:hover {
            font-weight: bold;
        }
        a {
            display: block;
            color: black;
        }
    }
`;

const FlexBox = styled.div`
    width: 100%;
    padding: 1rem 0;
    @media all and (min-width: 768px) {
        display: flex;
        justify-content: space-between;
    }
`;

const PlannerInfo = ({ planner, mapRef, plannerData, transList, drag, onDeletePlanner, onToggleMemberModal, onTogglePlannerInfoModal, onChangeCurPlanId, onToggleLikePlanner }) => {
    const menuRef = useRef();
    const [isDropDown, setIsDropDown] = useState(false);

    const onOpenDropDown = () => {
        setIsDropDown(!isDropDown);
    };

    const onCloseDropDown = () => {
        if (isDropDown) {
            setIsDropDown(false);
        }
    };

    useEffect(() => {
        window.addEventListener('click', onCloseDropDown);
        return () => {
            window.removeEventListener('click', onCloseDropDown);
        };
    });

    if (!planner) {
        return <div>Loading...</div>;
    }
    return (
        <PlannerInfoBlock>
            <Container>
                <InfoHeader>
                    <h3>따수베어님의 플래너</h3>
                    <MenuBox>
                        <MenuList>
                            <MenuItem onClick={onTogglePlannerInfoModal}>플래너 정보 수정</MenuItem>
                            <MenuItem>
                                <Link to="/PlannerEdit">플래너 루트 수정</Link>
                            </MenuItem>
                            <MenuItem onClick={onToggleMemberModal}>멤버 초대</MenuItem>
                            <MenuItem onClick={onDeletePlanner}>플래너 삭제</MenuItem>
                        </MenuList>
                        <Menu onClick={onOpenDropDown}>
                            <FontAwesomeIcon icon={faGear} />
                            <p>관리</p>
                        </Menu>
                        {isDropDown && (
                            <DropDownMenu isDropDown={isDropDown} ref={menuRef}>
                                <li onClick={onTogglePlannerInfoModal}>플래너 정보 수정</li>
                                <li>
                                    <Link to="/PlannerEdit">플래너 루트 수정</Link>
                                </li>
                                <li onClick={onToggleMemberModal}>멤버 초대</li>
                                <li onClick={onDeletePlanner}>
                                    <Link to="/PlannerList">플래너 삭제</Link>
                                </li>
                            </DropDownMenu>
                        )}
                    </MenuBox>
                </InfoHeader>
                <FlexBox>
                    <InfoMap planner={planner} mapRef={mapRef} onToggleLikePlanner={onToggleLikePlanner} />
                    <InfoRoute planner={planner} plannerData={plannerData} transList={transList} drag={drag} onChangeCurPlanId={onChangeCurPlanId} />
                </FlexBox>
            </Container>
            <InfoMenu planner={planner} />
        </PlannerInfoBlock>
    );
};

export default PlannerInfo;
