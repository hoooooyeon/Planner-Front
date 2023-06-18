import styled from 'styled-components';
import InfoDatination from './InfoDatination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus } from '@fortawesome/free-solid-svg-icons'; // 버스
import { faTaxi } from '@fortawesome/free-solid-svg-icons'; // 택시
import { faPlane } from '@fortawesome/free-solid-svg-icons'; // 비행기
import { faPersonWalking } from '@fortawesome/free-solid-svg-icons'; // 도보
import { faBicycle } from '@fortawesome/free-solid-svg-icons'; // 자전거 or 오토바이
import { faTrainSubway } from '@fortawesome/free-solid-svg-icons'; // 지하철 or 기차
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'; // 여행지
import { faBed } from '@fortawesome/free-solid-svg-icons'; // 숙소
import { faUtensils } from '@fortawesome/free-solid-svg-icons'; // 식당
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';

const InfoRouteBlock = styled.div`
    width: 30%;
    height: 40vw;
    background-color: white;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
`;

const RouteList = styled.div`
    height: 100%;
    overflow: auto;
    display: none;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-top: 1rem;
    &::-webkit-scrollbar {
        display: none;
    }
    &[aria-current] {
        display: flex;
    }
`;

const RouteItem = styled.div`
    display: flex;
    position: relative;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
`;

const TransItem = styled(FontAwesomeIcon)`
    width: 2rem;
    height: 2rem;
    padding: 1rem;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    border-radius: 2rem;
    background-color: white;
    z-index: 1;
`;

const SpotItem = styled.div`
    width: 200px;
    display: flex;
    padding: 1rem;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
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

const InfoRoute = ({ planner, plannerData, transList, drag, onChangeCurPlanId }) => {
    const { plans } = { ...planner };

    const [isShadow, setIsShadow] = useState(false);
    const listRef = useRef();

    const handleShadow = () => {
        if (listRef.current.scrollTop === 0) {
            setIsShadow(false);
        } else {
            setIsShadow(true);
        }
    };

    // useEffect(() => {
    //     let refValue = listRef.current;

    //     refValue.addEventListener('scroll', handleShadow);
    //     return () => {
    //         refValue.removeEventListener('scroll', handleShadow);
    //     };
    // });

    const transIconList = [faPlane, faTrainSubway, faBus, faTaxi, faBicycle, faPersonWalking];
    const locationIconList = [faLocationDot, faBed, faUtensils];

    if (!planner) {
        return <div>Loading...</div>;
    }
    return (
        <InfoRouteBlock>
            {plans && <InfoDatination isShadow={isShadow} planner={planner} drag={drag} onChangeCurPlanId={onChangeCurPlanId} />}
            {plans &&
                plans.map((p, i) => (
                    <RouteList ref={listRef} aria-current={p.planId === plannerData.planId ? 'plan' : null}>
                        {p.planLocations.map((pl, i) => {
                            const { locationId, locationName, locationTransportation } = pl;
                            return (
                                <RouteItem key={locationId}>
                                    <RouteLine />
                                    {/* <TransItem> */}
                                    <StyledFontAwesomeIcon icon={transIconList[locationTransportation - 1]} />
                                    {transList && transList[locationTransportation - 1].label}
                                    {/* </TransItem> */}
                                    <SpotItem>
                                        <StyledFontAwesomeIcon icon={faBed} />
                                        <RouteSpotName>{locationName}</RouteSpotName>
                                    </SpotItem>
                                </RouteItem>
                            );
                        })}
                    </RouteList>
                ))}
        </InfoRouteBlock>
    );
};

export default InfoRoute;
