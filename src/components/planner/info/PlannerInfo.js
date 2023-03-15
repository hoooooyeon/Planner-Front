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
    padding: 10px 0 30px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0px auto;
    h3 {
        /* color: #9AAD67; */
    }
    @media all and (min-width: 768px) {
        width: 738px;
    }
    @media all and (min-width: 960px) {
        width: 930px;
    }
    @media all and (min-width: 1280px) {
        width: 1024px;
    }
`;

const InfoHeader = styled.div`
    display: flex;
    align-items: center;
`;

const Set = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
`;

const SetButton = styled.button`
    width: 4rem;
    height: 2rem;
    align-items: center;
    border-radius: 10px;
    border: 2px solid #cdd9ac;
    display: flex;
    margin-left: 10px;
    font-size: 15px;
    justify-content: space-evenly;
    cursor: pointer;
`;

const DropDownMenu = styled.ul`
    border: 1px solid lightgray;
    display: none;
    position: absolute;
    z-index: 10;
    width: 8rem;
    flex-direction: column;
    padding: 0;
    background-color: white;
    border-radius: 5px;
    top: 20px;
    left: 10px;
    font-size: 0.8rem;
    box-shadow: 3px 3px 7px 1px rgb(0, 0, 0, 30%);
    ${(props) =>
        props.isDropDown &&
        css`
            display: flex;
        `}

    li {
        cursor: pointer;
        padding: 5px 10px;
        &:hover {
            background-color: #cdd9ac;
        }
        a {
            display: block;
            color: black;
        }
    }
`;

const FlexBox = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    align-items: flex-start;
`;

const PlannerInfo = ({ planner, onDeletePlanner, onToggleMemberModal, onTogglePlannerInfoModal }) => {
    const [isDropDown, setIsDropDown] = useState(false);

    const onDropDown = () => {
        if (isDropDown) {
            setIsDropDown(false);
        } else {
            setIsDropDown(true);
        }
    };

    const menuRef = useRef();
    const onDropUp = () => {
        if (isDropDown) {
            setIsDropDown(false);
        }
    };

    useEffect(() => {
        window.addEventListener('click', onDropUp);
        return () => {
            window.removeEventListener('click', onDropUp);
        };
    });

    return (
        <PlannerInfoBlock>
            <Container>
                <InfoHeader>
                    <h3>따수베어님의 플래너</h3>
                    <Set>
                        <SetButton onClick={onDropDown}>
                            <FontAwesomeIcon icon={faGear} />
                            <p>관리</p>
                        </SetButton>
                        <DropDownMenu isDropDown={isDropDown} ref={menuRef}>
                            <li onClick={onToggleMemberModal}>멤버 초대</li>
                            <li onClick={onTogglePlannerInfoModal}>플래너 정보 수정</li>

                            <li>
                                <Link to="/PlannerEdit">플래너 루트 수정</Link>
                            </li>
                            <li onClick={onDeletePlanner}>
                                <Link to="/PlannerList">플래너 삭제</Link>
                            </li>
                        </DropDownMenu>
                    </Set>
                </InfoHeader>
                <FlexBox>
                    <InfoMap />
                    <InfoRoute />
                </FlexBox>
            </Container>
            <InfoMenu planner={planner} />
        </PlannerInfoBlock>
    );
};

export default PlannerInfo;
