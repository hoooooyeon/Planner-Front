import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const MapBlock = styled.div`
    width: 60%;
    position: relative;
    @media all and (max-width: 767px) {
        width: 100%;
        height: 80vw;
    }
`;

const Map = styled.div`
    border-radius: 0.5rem;
    width: 100%;
    height: 100%;
    pointer-events: none;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
`;

const IconBox = styled.div`
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    background-color: white;
    border-radius: 0.3rem;
    display: flex;
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1;
    padding: 5px;
    cursor: pointer;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    color: ${(props) => (props.like ? 'yellow' : 'black')};
    font-size: 1rem;
    margin-right: 0.5rem;
`;

const AllSchedule = styled.div`
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1;
`;

const ScheduleIcon = styled(FontAwesomeIcon)`
    width: 1rem;
    height: 1rem;
    padding: 0.5rem;
    background-color: white;
    border-radius: 1rem;
    ${(props) =>
        props.isClicked &&
        css`
            background-color: #ebdede;
        `}
`;

const IconName = styled.div`
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    background-color: white;
    border-radius: 0.3rem;
    cursor: pointer;
    position: absolute;
    top: 45px;
    right: 10px;
    z-index: 1;
    white-space: nowrap;
    font-size: 0.8rem;
    padding: 0.5rem;
`;

const InfoMap = ({ planner, mapRef, onToggleLikePlanner, showAllRouteMarker, showDateRouteMarker }) => {
    const { likeState, likeCount } = { ...planner };

    const [isHovered, setIsHovered] = useState(false);

    const onOpenName = () => {
        setIsHovered(true);
    };

    const onCloseName = () => {
        setIsHovered(false);
    };

    const [isClicked, setIsClicked] = useState(false);
    const onClickSchedule = () => {
        if (isClicked) {
            showDateRouteMarker();
            setIsClicked(false);
        } else {
            setIsClicked(true);
            showAllRouteMarker();
        }
    };

    if (!mapRef) {
        return <div>Loading...</div>;
    }
    return (
        <MapBlock>
            <Map ref={mapRef} />
            <IconBox onClick={onToggleLikePlanner}>
                <StyledFontAwesomeIcon icon={faStar} like={likeState ? likeState.toString() : undefined} />
                <div>{likeCount}</div>
            </IconBox>
            <AllSchedule onClick={onClickSchedule} onMouseEnter={onOpenName} onMouseLeave={onCloseName}>
                <ScheduleIcon isClicked={isClicked} icon={faCalendarDays} />
            </AllSchedule>
            {isHovered && <IconName>모든 일정 보기</IconName>}
        </MapBlock>
    );
};

export default InfoMap;
