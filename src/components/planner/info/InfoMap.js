import { useRef } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

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
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    color: ${(props) => (props.like ? 'yellow' : 'black')};
    font-size: 1rem;
`;

const InfoMap = ({ planner, mapRef, onToggleLikePlanner }) => {
    const { likeState, likeCount } = { ...planner };

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
        </MapBlock>
    );
};

export default InfoMap;
