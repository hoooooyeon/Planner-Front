import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import InfoMap from './InfoMap';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import InfoRoute from './InfoRoute';
import InfoMenu from './InfoMenu';

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
        margin: 0;
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
    color: black;
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
        color: black;
        &:hover {
            font-weight: bold;
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

const PlannerInfo = ({
    account,
    planner,
    mapRef,
    allSchedule,
    plannerData,
    drag,
    onDeletePlanner,
    onToggleMemberModal,
    onTogglePlannerInfoModal,
    onChangeCurPlanId,
    onToggleLikePlanner,
    onClickAllSchedule,
    onClickDateSchedule,
    onClickEditPlanner,
}) => {
    const { nickname } = { ...account };
    const { creator } = { ...planner };
    const menuRef = useRef();
    const containerRef = useRef();
    const [isDropDown, setIsDropDown] = useState(false);

    const onOpenDropDown = () => {
        setIsDropDown(!isDropDown);
    };

    const onCloseDropDown = () => {
        if (isDropDown) {
            setIsDropDown(false);
        }
    };

    const onResizeDropDown = () => {
        if (window.innerWidth > 1023) {
            setIsDropDown(false);
        }
    };

    useEffect(() => {
        window.addEventListener('click', onCloseDropDown);
        window.addEventListener('resize', onResizeDropDown);
        return () => {
            window.removeEventListener('click', onCloseDropDown);
            window.removeEventListener('resize', onResizeDropDown);
        };
    });

    return (
        <PlannerInfoBlock ref={containerRef}>
            <Container>
                <InfoHeader>
                    <h3>따수베어님의 플래너</h3>
                    {nickname === creator && (
                        <MenuBox>
                            <MenuList>
                                <MenuItem onClick={onTogglePlannerInfoModal}>플래너 정보 수정</MenuItem>
                                <MenuItem onClick={onClickEditPlanner}>플래너 루트 수정</MenuItem>
                                <MenuItem onClick={onToggleMemberModal}>멤버 관리</MenuItem>
                                <MenuItem onClick={onDeletePlanner}>플래너 삭제</MenuItem>
                            </MenuList>
                            <Menu onClick={onOpenDropDown}>
                                <FontAwesomeIcon icon={faGear} />
                                <p>관리</p>
                            </Menu>
                            {isDropDown && (
                                <DropDownMenu isDropDown={isDropDown} ref={menuRef}>
                                    <li onClick={onTogglePlannerInfoModal}>플래너 정보 수정</li>
                                    <li onClick={onClickEditPlanner}>플래너 루트 수정</li>
                                    <li onClick={onToggleMemberModal}>멤버 관리</li>
                                    <li onClick={onDeletePlanner}>플래너 삭제</li>
                                </DropDownMenu>
                            )}
                        </MenuBox>
                    )}
                </InfoHeader>
                <FlexBox>
                    <InfoMap planner={planner} allSchedule={allSchedule} mapRef={mapRef} onToggleLikePlanner={onToggleLikePlanner} onClickAllSchedule={onClickAllSchedule} />
                    <InfoRoute planner={planner} plannerData={plannerData} drag={drag} onChangeCurPlanId={onChangeCurPlanId} onClickDateSchedule={onClickDateSchedule} />
                </FlexBox>
            </Container>
            <InfoMenu planner={planner} />
        </PlannerInfoBlock>
    );
};

export default PlannerInfo;
