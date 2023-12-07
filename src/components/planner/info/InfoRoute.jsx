import styled from 'styled-components';
import InfoDatination from './InfoDatination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus } from '@fortawesome/free-solid-svg-icons';
import { faTaxi } from '@fortawesome/free-solid-svg-icons';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import { faPersonWalking } from '@fortawesome/free-solid-svg-icons';
import { faBicycle } from '@fortawesome/free-solid-svg-icons';
import { faTrainSubway } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import Slider from '../../common/Slider';
import { handleErrorImg } from '../../../lib/utils/CommonFunction';
import errorImg from '../../../lib/images/spotErrorImg.jpg';
import Empty from '../../common/Empty';

const InfoRouteBlock = styled.div`
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    width: 35%;
    height: 40vw;
    margin-left: 1rem;
    position: relative;
    @media all and (max-width: 768px) {
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
    @media all and (max-width: 768px) {
        width: 100%;
        min-height: 4rem;
    }
`;

const RouteList = styled.ul`
    display: none;
    flex-direction: column;
    align-items: center;
    margin: 1rem 0 0;
    padding: 1rem;
    &[aria-current] {
        display: flex;
    }
    @media all and (max-width: 768px) {
        padding: 1rem 0;
        flex-direction: row;
        overflow: visible;
    }
`;

const RouteItem = styled.li`
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
    & + & {
        margin: 2rem 0 0;
    }
    @media all and (max-width: 768px) {
        & + & {
            margin: 0 0 0 2rem;
        }
    }
`;

const SpotItem = styled.div`
    display: flex;
    border-radius: 4rem;
    padding: 0.5rem;
    box-shadow: 0px 1px 6px ${(props) => props.theme.shadowColor};

    background-color: ${(props) => props.theme.primaryBackgroundColor};

    z-index: 2;
    width: 5rem;
    height: 5rem;

    @media all and (min-width: 1025px) {
        width: 7rem;
        height: 7rem;
    }
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4rem;
    font-size: 0.5rem;
    padding: 0.5rem;
    box-sizing: border-box;
`;

const RouteSpotName = styled.div`
    white-space: nowrap;
    font-weight: bold;
    font-size: 0.7rem;
    overflow: hidden;
    text-overflow: ellipsis;
    position: absolute;
    top: 61px;
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    border-radius: 1rem;
    left: 50%;
    top: 95%;
    transform: translate(-50%, -50%);
    box-shadow: 0px 1px 6px ${(props) => props.theme.shadowColor};
    padding: 0.3rem 0.4rem;

    @media all and (min-width: 1025px) {
        padding: 0.4rem 0.5rem;
        top: 97%;
    }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    position: absolute;
    padding: 0.6rem;
    box-shadow: 0px 1px 6px ${(props) => props.theme.shadowColor};
    border-radius: 2rem;
    background-color: ${(props) => props.theme.primaryBackgroundColor};

    z-index: 3;
    width: 1rem;
    height: 1rem;
    top: -2px;
    left: 64px;

    @media all and (min-width: 1025px) {
        width: 1.2rem;
        height: 1.2rem;
        top: -2px;
        left: 89px;
    }
`;

const RouteLine = styled.div`
    background-color: ${(props) => props.theme.tertiaryColor};
    z-index: 1;
    width: 0.2rem;
    height: 2rem;
    position: absolute;
    left: 50%;
    top: -11%;
    transform: translate(-50%, -50%);
    @media all and (max-width: 768px) {
        width: 2rem;
        height: 0.2rem;
        left: -20%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
`;

const CenterDiv = styled.div`
    height: 22rem;
`;

const InfoRoute = ({ planner, plannerData, drag, onChangeCurPlanId, onClickToggleScheduleView }) => {
    const { plans } = { ...planner };
    const transIconList = [faPlane, faTrainSubway, faBus, faTaxi, faBicycle, faPersonWalking];
    const itemRef = useRef();

    return (
        <InfoRouteBlock>
            <InfoDatination
                planner={planner}
                plannerData={plannerData}
                drag={drag}
                onChangeCurPlanId={onChangeCurPlanId}
                onClickToggleScheduleView={onClickToggleScheduleView}
            />
            <WidthDiv>
                {Object.keys(planner).length > 0 && plans && plans.length > 0 ? (
                    <Slider list={plans} itemRef={itemRef} drag={drag}>
                        {plans.map((p) => (
                            <RouteList aria-current={p.planId === plannerData.planId ? 'plan' : null} key={p.planId}>
                                {p.planLocations.map((pl, i) => {
                                    const { locationId, locationName, locationTransportation, locationImage } = pl;
                                    return (
                                        <RouteItem key={locationId} ref={itemRef}>
                                            {i !== 0 && <RouteLine />}
                                            <StyledFontAwesomeIcon icon={transIconList[locationTransportation - 1]} />
                                            <SpotItem>
                                                <Img
                                                    alt={locationName}
                                                    src={locationImage}
                                                    onError={(e) => {
                                                        handleErrorImg({ e, errorImg });
                                                    }}
                                                />
                                                <RouteSpotName>{locationName}</RouteSpotName>
                                            </SpotItem>
                                        </RouteItem>
                                    );
                                })}
                            </RouteList>
                        ))}
                    </Slider>
                ) : (
                    <CenterDiv>
                        <Empty text="일정" />
                    </CenterDiv>
                )}
            </WidthDiv>
        </InfoRouteBlock>
    );
};

export default InfoRoute;
