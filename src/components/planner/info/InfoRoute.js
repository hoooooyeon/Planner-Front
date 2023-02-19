import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBus } from '@fortawesome/free-solid-svg-icons'; // 버스
import { faTaxi } from '@fortawesome/free-solid-svg-icons'; // 택시
// import { faPlane } from '@fortawesome/free-solid-svg-icons'; // 비행기
// import { faPersonWalking } from '@fortawesome/free-solid-svg-icons'; // 도보
// import { faBicycle } from '@fortawesome/free-solid-svg-icons'; // 자전거 or 오토바이
// import { faTrainSubway } from '@fortawesome/free-solid-svg-icons'; // 지하철 or 기차
// import { faLocationDot } from '@fortawesome/free-solid-svg-icons'; // 여행지
import { faBed } from '@fortawesome/free-solid-svg-icons'; // 숙소
// import { faUtensils } from '@fortawesome/free-solid-svg-icons'; // 식당
import { faGear } from '@fortawesome/free-solid-svg-icons'; // 숙소

import InfoDatination from './InfoDatination';
import InfoMap from './InfoMap';
import { useEffect, useRef } from 'react';
import { useState } from 'react';

const InfoRouteBlock = styled.div`
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

const RouteHeader = styled.div`
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
        padding: 5px 10px;
        cursor: pointer;
        &:hover {
            background-color: #cdd9ac;
        }
    }
`;

const FlexBox = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    align-items: flex-start;
`;

const RouteBox = styled.div`
    width: 350px;
    height: 574px;
    background-color: white;
    border: 0.2rem solid #cdd9ac;
    border-radius: 1rem;
    flex-direction: column;
    display: flex;
    padding-bottom: 1rem;
    /* align-items: center; */
    margin-top: 20px;
    @media all and (min-width: 768px) {
        margin-top: 0px;
    }
`;

const RouteList = styled.div`
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const RouteItem = styled.div`
    /* width: 70%; */
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    top: -38px;
    z-index: 1;
    /* border: 0.2rem solid lightblue; */
`;

const TransItem = styled.div`
    width: 75px;
    display: flex;
    padding: 0.5rem 1rem;
    border: 0.2rem solid #cdd9ac;
    border-radius: 1rem;
    font-size: 0.8rem;
    font-weight: bold;
    background-color: white;
    z-index: 1;
`;

const SpotItem = styled.div`
    width: 200px;
    display: flex;
    padding: 0.5rem 1rem;
    border: 0.2rem solid #cdd9ac;
    border-radius: 1rem;
    background-color: white;
    margin: 20px 0;
`;
const RouteSpotName = styled.div`
    white-space: nowrap;
    font-weight: bold;
    font-size: 0.8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    /* display: inline-block; */
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    margin-right: 0.5rem;
`;

const RouteLine = styled.div`
    background-color: #cdd9ac;
    width: 0.2rem;
    height: 80px;

    margin: 20px 0;
    position: absolute;
    top: -42px;
`;

const InfoRoute = () => {
    const TOTAL = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const [isShadow, setIsShadow] = useState(false);
    const listRef = useRef();

    const handleShadow = () => {
        if (listRef.current.scrollTop === 0) {
            setIsShadow(false);
        } else {
            setIsShadow(true);
        }
    };

    useEffect(() => {
        let refValue = listRef.current;

        refValue.addEventListener('scroll', handleShadow);
        return () => {
            refValue.removeEventListener('scroll', handleShadow);
        };
    });

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
        <InfoRouteBlock>
            <Container>
                <RouteHeader>
                    <h3>따수베어님의 플래너</h3>
                    <Set>
                        <SetButton onClick={onDropDown}>
                            <FontAwesomeIcon icon={faGear} />
                            <p>관리</p>
                        </SetButton>
                        <DropDownMenu isDropDown={isDropDown} ref={menuRef}>
                            <li>멤버 초대</li>
                            <li>플래너 수정</li>
                            <li>플래너 삭제</li>
                        </DropDownMenu>
                    </Set>
                </RouteHeader>
                <FlexBox>
                    <InfoMap />
                    <RouteBox>
                        <InfoDatination isShadow={isShadow} />
                        <RouteList ref={listRef}>
                            {TOTAL.map((i) => {
                                return (
                                    <RouteItem key={i}>
                                        <RouteLine />
                                        <TransItem>
                                            <StyledFontAwesomeIcon icon={faTaxi} />
                                            Taxi{i}
                                        </TransItem>
                                        <SpotItem>
                                            <StyledFontAwesomeIcon icon={faBed} />
                                            <RouteSpotName>해적선 숙소소소소소</RouteSpotName>
                                        </SpotItem>
                                    </RouteItem>
                                );
                            })}
                        </RouteList>
                    </RouteBox>
                </FlexBox>
            </Container>
        </InfoRouteBlock>
    );
};

export default InfoRoute;
