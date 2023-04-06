import { useRef } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

const MapBlock = styled.div`
    width: 500px;
    height: 500px;
    margin-right: 10px;
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
    /* box-sizing: border-box; */
`;

const InfoMap = () => {
    const { kakao } = window;
    const container = useRef(null);
    const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
    };
    useEffect(() => {
        new kakao.maps.Map(container.current, options);
        return () => {};
    }, []);

    return (
        <MapBlock>
            <Map id="map" ref={container} />
        </MapBlock>
    );
};

export default InfoMap;
