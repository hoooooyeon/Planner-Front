import { useCallback, useEffect, useState } from 'react';
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Slider from '../../common/Slider';
import circle from '../../../lib/images/circle.png';
import ShareListSearchForm from './ShareListSearchForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const ShareListBlock = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 1rem;
    margin-bottom: 1rem;
`;

const Container = styled.div`
    margin: 0 auto;
    padding: 1rem;
    @media all and (min-width: 768px) {
        padding: 1rem 9rem;
    }
`;

const HeaderTitle = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 1rem;
`;

const Shares = styled.ul`
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    width: 100%;
    height: 100%;
    margin: 0 auto;
`;

const ShareItem = styled.li`
    flex-shrink: 0;
    width: 200px;
    height: 200px;
    float: left;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
    margin: 0.5%;
    position: relative;
    cursor: pointer;
    @media all and (min-width: 768px) {
        width: 24%;
        height: auto;
    }
    &:hover {
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
    }
    a {
        color: black;
    }
`;
const InfoBox = styled.div`
    height: 2.5rem;
    margin: 0;
    padding: 0.5rem;
    box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.1);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Title = styled.div`
    font-size: 0.8rem;
    font-weight: bold;
    overflow: hidden;
`;
const Date = styled.div`
    font-size: 0.4rem;
    color: lightgray;
    margin-top: 0.6rem;
    overflow: hidden;
`;

const MapBox = styled.div`
    background-color: lightgray;
    margin: 0;
    overflow: hidden;
    position: relative;
    padding-top: 90%;
    width: 100%;
    border-radius: 0.5rem 0.5rem 0 0;
    @media all and (max-width: 767px) {
        padding-top: 75%;
    }
`;

const Map = styled.div`
    width: 100%;
    height: 100%;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
`;

const IconBox = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 5px;
`;
const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    color: ${(props) => (props.like ? 'yellow' : 'black')};
`;

const ShareList = ({ sharePlanners, plannerError, keyword, sortCriteria, resultKeyword, onClickPlanner, onChangeKeyword, onChangeResultKeyword, onChangeSort, drag }) => {
    const itemRef = useRef();

    // const mapsRef = useRef();
    // // const mapsRef = useRef();
    // const [maps, setMaps] = useState();
    // const { kakao } = window;
    // const points = [new kakao.maps.LatLng(35.87451110951265, 125.06741596995614), new kakao.maps.LatLng(36.660750122542744, 130.77375208412371)];
    // const bounds = new kakao.maps.LatLngBounds();

    // // 지도 생성
    // useEffect(() => {
    //     // if (sharePlanners && sharePlanners.list.length > 0) {
    //     //     sharePlanners.list.forEach((m, i) => {
    //     if (sharePlanners) {
    //         // mapsRef.current = new Array(sharePlanners.list.length);
    //         if (mapsRef.current) {
    //             // mapsRef.current.forEach((m, i) => {
    //             // let container = document.getElementById(maps[i]);

    //             const options = {
    //                 center: new kakao.maps.LatLng(36.5, 127.8),
    //                 level: 14,
    //             };

    //             // const newMap = new kakao.maps.StaticMap(mapsRef.current, options);

    //             const newMap = new kakao.maps.Map(mapsRef.current, options);
    //             // const newMap = new kakao.maps.Map(mapsRef.current[i], options);
    //             // setMaps((maps) => [...maps, newMap]);
    //             setMaps(newMap);
    //             // });
    //         }
    //     }
    // }, [sharePlanners, mapsRef.current]);

    // const mapBoxRef = useRef();
    // const resizeMaps = () => {
    //     if (mapsRef.current && maps) {
    //         const width = mapBoxRef.current.offsetWidth;
    //         const height = mapBoxRef.current.offsetHeight;

    //         // mapsRef.current.style.width = `${width}px`;
    //         // mapsRef.current.style.height = `${height}px`;
    //         // mapsRef.current.style.width = `${100}%`;
    //         // mapsRef.current.style.height = `${100}%`;
    //         // mapsRef.current.relayout();
    //         // maps.forEach((map) => map.setCenter(new kakao.maps.LatLng(36.5, 127.8)));

    //         // for (let i = 0; i < points.length; i++) {
    //         //     bounds.extend(points[i]);
    //         // }
    //         // maps.setBounds(bounds);
    //     }
    // };
    // useEffect(() => {
    //     if (mapsRef.current) {
    //         window.addEventListener('resize', resizeMaps);
    //         resizeMaps();
    //         return () => window.removeEventListener('resize', resizeMaps);
    //     }
    // });

    if (plannerError) {
        return <div>Loading...</div>;
    }
    return (
        <ShareListBlock>
            <Container>
                <HeaderTitle>다른 이용자들의 플래너</HeaderTitle>
                <ShareListSearchForm keyword={keyword} sortCriteria={sortCriteria} resultKeyword={resultKeyword} onChangeKeyword={onChangeKeyword} onChangeResultKeyword={onChangeResultKeyword} onChangeSort={onChangeSort} />
                {sharePlanners ? (
                    <Slider list={sharePlanners.list} itemRef={itemRef} scroll={true} drag={drag}>
                        <Shares>
                            {sharePlanners.list &&
                                sharePlanners.list.map((p, i) => (
                                    <ShareItem
                                        key={p.plannerId}
                                        ref={itemRef}
                                        id={p.plannerId}
                                        onClick={() => {
                                            onClickPlanner(p.plannerId);
                                        }}
                                    >
                                        <MapBox>
                                            <Map
                                            // ref={mapsRef.current[i]}
                                            // ref={mapsRef}
                                            />
                                            <IconBox>
                                                <StyledFontAwesomeIcon icon={faStar} like={p.likeState ? p.likeState.toString() : undefined} />
                                            </IconBox>
                                        </MapBox>
                                        <InfoBox>
                                            <Title>{p.title}</Title>
                                            <Date>
                                                {p.planDateStart} ~ {p.planDateEnd}
                                            </Date>
                                        </InfoBox>
                                    </ShareItem>
                                ))}
                        </Shares>
                    </Slider>
                ) : (
                    <div>플래너가 없습니다.</div>
                )}
            </Container>
        </ShareListBlock>
    );
};

export default ShareList;
