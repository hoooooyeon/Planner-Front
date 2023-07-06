import styled from 'styled-components';
import InfoDatination from './InfoDatination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus } from '@fortawesome/free-solid-svg-icons'; // 버스
import { faTaxi } from '@fortawesome/free-solid-svg-icons'; // 택시
import { faPlane } from '@fortawesome/free-solid-svg-icons'; // 비행기
import { faPersonWalking } from '@fortawesome/free-solid-svg-icons'; // 도보
import { faBicycle } from '@fortawesome/free-solid-svg-icons'; // 자전거 or 오토바이
import { faTrainSubway } from '@fortawesome/free-solid-svg-icons'; // 지하철 or 기차
import { useRef } from 'react';
import Slider from '../../common/Slider';

const InfoRouteBlock = styled.div`
    background-color: white;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
    width: 35%;
    height: 40vw;
    margin-left: 1rem;
    @media all and (max-width: 767px) {
        width: calc(100% - 2rem);
        height: auto;
        margin: 1rem 0 0;
        padding: 1rem 1rem 2rem;
    }
`;

const WidthDiv = styled.div`
    overflow: auto;
    margin: 0 auto;
    &::-webkit-scrollbar {
        display: none;
    }
    @media all and (max-width: 767px) {
        width: 100%;
    }
`;

const RouteList = styled.ul`
    display: none;
    flex-direction: column;
    align-items: center;
    margin: 1rem 0 0;
    padding: 1rem 2rem;
    &[aria-current] {
        display: flex;
    }
    @media all and (max-width: 767px) {
        padding: 1rem 0;
        flex-direction: row;
        overflow: visible;
    }
`;

const RouteItem = styled.li`
    display: flex;
    position: relative;
    & + & {
        margin: 2rem 0 0;
    }
    @media all and (max-width: 767px) {
        & + & {
            margin: 0 0 0 2rem;
        }
    }
`;

const SpotItem = styled.div`
    width: 4rem;
    height: 4rem;
    display: flex;
    border-radius: 4rem;
    padding: 0.5rem;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    background-color: white;
    z-index: 2;
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4rem;
    font-size: 0.5rem;
    color: lightgray;
`;

const RouteSpotName = styled.div`
    white-space: nowrap;
    font-weight: bold;
    font-size: 0.7rem;
    overflow: hidden;
    text-overflow: ellipsis;
    position: absolute;
    top: 61px;
    background-color: white;
    padding: 0.2rem 0.3rem;
    border-radius: 1rem;
    left: 50%;
    top: 95%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    position: absolute;
    padding: 0.5rem;
    width: 1rem;
    height: 1rem;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    border-radius: 2rem;
    background-color: white;
    top: -4px;
    left: 53px;
    z-index: 3;
`;

const RouteLine = styled.div`
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 1;
    width: 0.2rem;
    height: 2rem;
    position: absolute;
    left: 50%;
    top: -11%;
    transform: translate(-50%, -50%);
    @media all and (max-width: 767px) {
        width: 2rem;
        height: 0.2rem;
        left: -20%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
`;

const InfoRoute = ({ planner, plannerData, transList, drag, onChangeCurPlanId }) => {
    const { plans } = { ...planner };

    const transIconList = [faPlane, faTrainSubway, faBus, faTaxi, faBicycle, faPersonWalking];

    const itemRef = useRef();

    if (!planner) {
        return <div>Loading...</div>;
    }
    return (
        <InfoRouteBlock>
            {plans && <InfoDatination planner={planner} plannerData={plannerData} drag={drag} onChangeCurPlanId={onChangeCurPlanId} />}
            <WidthDiv>
                {plans && (
                    <Slider list={plans} itemRef={itemRef}>
                        {plans.map((p, i) => (
                            <RouteList aria-current={p.planId === plannerData.planId ? 'plan' : null} key={p.planId}>
                                {p.planLocations.map((pl, i) => {
                                    const { locationId, locationName, locationTransportation, locationImage } = pl;
                                    return (
                                        <RouteItem key={locationId} ref={itemRef}>
                                            {i !== 0 && <RouteLine />}
                                            <StyledFontAwesomeIcon icon={transIconList[locationTransportation - 1]} />
                                            <SpotItem>
                                                <Img alt={locationName} src={locationImage} />
                                                <RouteSpotName>{locationName}</RouteSpotName>
                                            </SpotItem>
                                        </RouteItem>
                                    );
                                })}
                            </RouteList>
                        ))}
                    </Slider>
                )}
            </WidthDiv>
        </InfoRouteBlock>
    );
};

export default InfoRoute;