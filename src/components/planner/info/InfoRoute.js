import styled from 'styled-components';
import InfoDatination from './InfoDatination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBus } from '@fortawesome/free-solid-svg-icons'; // 버스
import { faTaxi } from '@fortawesome/free-solid-svg-icons'; // 택시
// import { faPlane } from '@fortawesome/free-solid-svg-icons'; // 비행기
// import { faPersonWalking } from '@fortawesome/free-solid-svg-icons'; // 도보
// import { faBicycle } from '@fortawesome/free-solid-svg-icons'; // 자전거 or 오토바이
// import { faTrainSubway } from '@fortawesome/free-solid-svg-icons'; // 지하철 or 기차
// import { faLocationDot } from '@fortawesome/free-solid-svg-icons'; // 여행지
import { faBed } from '@fortawesome/free-solid-svg-icons'; // 숙소
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
// import { faUtensils } from '@fortawesome/free-solid-svg-icons'; // 식당

const InfoRouteBlock = styled.div`
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
    display: none;
    flex-direction: column;
    align-items: center;
    position: relative;
    &::-webkit-scrollbar {
        display: none;
    }
    &[aria-current] {
        display: flex;
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

const InfoRoute = ({ planner, currentInfo }) => {
    const { plans } = planner;

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

    // useEffect(() => {
    //     let refValue = listRef.current;

    //     refValue.addEventListener('scroll', handleShadow);
    //     return () => {
    //         refValue.removeEventListener('scroll', handleShadow);
    //     };
    // });

    return (
        <InfoRouteBlock>
            <InfoDatination isShadow={isShadow} planner={planner} />
            {plans &&
                plans.map((p) => (
                    <RouteList ref={listRef} aria-current={p.planId === currentInfo.planId ? 'plan' : null}>
                        {p.planLocations.map((pl, i) => {
                            const { locationId, locationTransportation } = pl;
                            return (
                                <RouteItem key={locationId}>
                                    <RouteLine />
                                    <TransItem>
                                        <StyledFontAwesomeIcon icon={faTaxi} />
                                        Taxi{i}
                                    </TransItem>
                                    <SpotItem>
                                        <StyledFontAwesomeIcon icon={faBed} />
                                        <RouteSpotName>{locationId}</RouteSpotName>
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
