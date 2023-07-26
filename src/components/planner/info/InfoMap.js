import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const MapBlock = styled.div`
    width: 60%;
    position: relative;
    background-color: lightgray;
    @media all and (max-width: 767px) {
        width: 100%;
        height: 80vw;
    }
`;

const Map = styled.div`
    border-radius: 0.5rem;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100%;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
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
    background-color: white;
    width: 1rem;
    height: 1rem;
    padding: 0.5rem;
    border-radius: 1rem;
    line-height: 1rem;
    text-align: center;
    ${(props) =>
        props.allSchedule &&
        css`
            background-color: #ebdede;
        `}
`;

const ScheduleIcon = styled(FontAwesomeIcon)`
    border-radius: 1rem;
`;

const IconName = styled.div`
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    background-color: white;
    border-radius: 0.3rem;
    cursor: pointer;
    position: absolute;
    top: -28px;
    right: 10px;
    z-index: 1;
    white-space: nowrap;
    font-size: 0.8rem;
    padding: 0.5rem;
`;

const InfoMap = ({ planner, mapRef, allSchedule, onToggleLikePlanner, onClickAllSchedule }) => {
    const { likeState, likeCount } = { ...planner };
    const [isHovered, setIsHovered] = useState(false);

    const onOpenName = () => {
        setIsHovered(true);
    };

    const onCloseName = () => {
        setIsHovered(false);
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
            <AllSchedule allSchedule={allSchedule} onClick={onClickAllSchedule} onMouseEnter={onOpenName} onMouseLeave={onCloseName}>
                <ScheduleIcon icon={faCalendarDays} />
            </AllSchedule>
            {isHovered && <IconName>모든 일정 보기</IconName>}
        </MapBlock>
    );
};

export default InfoMap;
