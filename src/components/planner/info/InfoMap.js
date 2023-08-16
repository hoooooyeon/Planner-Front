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
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    width: 100%;
    height: 100%;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
`;

const IconBox = styled.div`
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    border-radius: 0.3rem;
    display: flex;
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1;
    padding: 5px;
    cursor: pointer;
    background-color: ${(props) => props.theme.secondaryBackgroundColor};
    color: ${(props) => props.theme.secondaryColor};
    ${(props) =>
        props.like &&
        css`
            background-color: ${(props) => props.theme.clickedButtonBackgroundColor};
            color: ${(props) => props.theme.likeButtonColor};
        `}
    &:hover {
        box-shadow: 0px 1px 6px ${(props) => props.theme.shadowColors};
    }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    color: ${(props) => (props.like ? `${props.theme.likeButtonColor}` : `${props.theme.secondaryColor}`)};
    font-size: 1rem;
    margin-right: 0.5rem;
`;

const AllSchedule = styled.div`
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1;
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    width: 1rem;
    height: 1rem;
    padding: 0.5rem;
    border-radius: 1rem;
    line-height: 1rem;
    text-align: center;
    &:hover {
        box-shadow: 0px 1px 6px ${(props) => props.theme.shadowColor};
    }
    ${(props) =>
        props.allSchedule &&
        css`
            background-color: ${(props) => props.theme.clickedButtonBackgroundColor};
            color: ${(props) => props.theme.primaryColor};
        `}
`;

const ScheduleIcon = styled(FontAwesomeIcon)`
    border-radius: 1rem;
`;

const IconName = styled.div`
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    background-color: ${(props) => props.theme.primaryBackgroundColor};
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
            <IconBox onClick={onToggleLikePlanner} like={likeState ? likeState.toString() : undefined}>
                <StyledFontAwesomeIcon icon={faStar} like={likeState ? likeState.toString() : undefined} />
                <div>{likeCount}</div>
            </IconBox>
            <AllSchedule
                allSchedule={allSchedule}
                onClick={onClickAllSchedule}
                onMouseEnter={onOpenName}
                onMouseLeave={onCloseName}
            >
                <ScheduleIcon icon={faCalendarDays} />
            </AllSchedule>
            {isHovered && <IconName>모든 일정 보기</IconName>}
        </MapBlock>
    );
};

export default InfoMap;
