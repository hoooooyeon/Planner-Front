import { useRef } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const MapBlock = styled.div`
    width: 60%;
    /* height: 40vw; */
    position: relative;
`;

const Map = styled.div`
    border-radius: 0.5rem;
    width: 100%;
    height: 100%;
    pointer-events: none;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
`;

const IconBox = styled.div`
    border: 2px solid gray;
    border-radius: 5px;
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1;
    padding: 5px;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    color: #ef9a9a;
    font-size: 1rem;
`;

const InfoMap = ({ planner, mapRef, onToggleLikePlanner }) => {
    if (!mapRef) {
        return <div>Loading...</div>;
    }
    return (
        <MapBlock>
            <Map ref={mapRef} />
            <IconBox onClick={onToggleLikePlanner}>
                <StyledFontAwesomeIcon icon={faHeart} />
            </IconBox>
        </MapBlock>
    );
};

export default InfoMap;
