import { useRef } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const MapBlock = styled.div`
    width: 500px;
    height: 500px;
    margin-right: 10px;
    position: relative;
    // 페이지 크기에 맞게 너비와 높이의 줄어듬.
    /* @media all and (min-width: 768px){
    height: 45vw;
    width: 45vw;
  } */
    @media all and (min-width: 768px) {
        width: 65%;
        height: 600px;
    }
    /* @media all and (min-width: 960px) {
    width: 60%;
    height: 600px;
  } */
`;

const Map = styled.div`
    width: 100%;
    height: 100%;
    pointer-events: none;
    /* box-sizing: border-box; */
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
    font-size: 20px;
`;

const InfoMap = ({ planner, mapRef, onToggleLikePlanner }) => {
    // if (!mapRef.current) {
    //     return <div>Loading...</div>;
    // }
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
