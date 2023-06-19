import { useCallback, useState } from 'react';
import { useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Pagination from '../../common/Pagination';
import Slider from '../../common/Slider';

const ShareListBlock = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 50px;
`;

const Container = styled.div`
    width: 100%;
    height: 100%;
    margin: 10px auto;

    @media all and (min-width: 768px) {
        width: calc(100% - 40px);
        padding: 0 20px;
    }
    @media all and (min-width: 960px) {
        width: 930px;
        padding: 0;
    }
    @media all and (min-width: 1280px) {
        width: 1024px;
        padding: 0;
    }
`;

const TitleBox = styled.div`
    font-size: 1.3rem;
    margin-left: 20px;
    font-weight: bolder;

    @media all and (min-width: 768px) {
        margin-left: 0;
    }
`;

const Shares = styled.ul`
    display: flex;
    flex-wrap: wrap;
`;

const ShareItem = styled.li`
    flex-shrink: 0;
    width: 180px;
    float: left;
    box-shadow: 3px 3px 7px 1px rgb(0, 0, 0, 30%);
    border-radius: 0.5rem;
    margin: 0.5%;
    @media all and (min-width: 768px) {
        width: 24%;
    }
    &:hover {
        cursor: pointer;
        box-shadow: 3px 4px 14px 2px rgb(0, 0, 0, 30%);
        transform: translateY(-3px);
    }
    a {
        /* user-select: none; */
        color: black;
        -webkit-user-drag: none;
        pointer-events: auto;
        /* pointer-events: none; */

        ${(props) =>
            props.drag &&
            css`
                pointer-events: none;
                color: red;
            `}
    }
`;
const InfoBox = styled.div`
    user-select: none;
    height: 60px;
    margin: 0;
    padding: 3px;
    border-top: 1px solid lightgray;
`;

const Name = styled.p`
    margin: 0 0 8px 0;
    font-size: 0.7rem;
    @media all and (min-width: 768px) {
        font-size: 0.8rem;
    }
    @media all and (min-width: 960px) {
        font-size: 0.9rem;
    }
`;
const Date = styled.p`
    margin: 0;
    font-size: 0.4rem;
    color: gray;
    @media all and (min-width: 768px) {
        font-size: 0.6rem;
    }
    @media all and (min-width: 960px) {
        font-size: 0.7rem;
    }
`;

const SimpleMap = styled.div`
    width: 100%;
    height: 120px;
    border: none;
    margin: auto;
    @media all and (min-width: 960px) {
        height: 160px;
    }
    @media all and (min-width: 1280px) {
        height: 190px;
    }
`;

const ScrollBox = styled.div`
    width: calc(100% - 40px);
    height: 4px;
    margin-top: 5px;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: lightgray;
    overflow: hidden;
    z-index: 1;
    opacity: 0;
    @media all and (min-width: 768px) {
        display: none;
    }
`;

const Scroll = styled.div`
    width: 50%;
    height: 100%;
    background-color: gray;
`;

const Map = styled.div`
    width: 500px;
    height: 500px;
    border: 1px solid red;
    display: none;
`;

const ShareList = ({ sharePlanners, plannerError, onLoadPlanner, onChangeCurPlannerId }) => {
    const areaArr = [
        {
            title: '서울',
            code: 1,
            coord: {
                Lat: 37.5665,
                Lng: 126.978,
            },
        },
        {
            title: '인천',
            code: 2,
            coord: {
                Lat: 37.4563,
                Lng: 126.7052,
            },
        },
        {
            title: '대전',
            code: 3,
            coord: {
                Lat: 36.3504,
                Lng: 127.3845,
            },
        },
        {
            title: '대구',
            code: 4,
            coord: {
                Lat: 35.8714,
                Lng: 128.6014,
            },
        },
        {
            title: '광주',
            code: 5,
            coord: {
                Lat: 35.1595,
                Lng: 126.8526,
            },
        },
        {
            title: '부산',
            code: 6,
            coord: {
                Lat: 35.1796,
                Lng: 129.0756,
            },
        },
        {
            title: '울산',
            code: 7,
            coord: {
                Lat: 35.5384,
                Lng: 129.3114,
            },
        },
        {
            title: '세종',
            code: 8,
            coord: {
                Lat: 36.4801,
                Lng: 127.2882,
            },
        },
        {
            title: '경기도',
            code: 31,
            coord: {
                Lat: 37.4138,
                Lng: 127.5183,
            },
        },
        {
            title: '강원도',
            code: 32,
            coord: {
                Lat: 37.5557,
                Lng: 128.2092,
            },
        },
        {
            title: '충청북도',
            code: 33,
            coord: {
                Lat: 36.6357,
                Lng: 127.4912,
            },
        },
        {
            title: '충청남도',
            code: 34,
            coord: {
                Lat: 36.6588,
                Lng: 126.6728,
            },
        },
        {
            title: '경상북도',
            code: 35,
            coord: {
                Lat: 36.4919,
                Lng: 128.8889,
            },
        },
        {
            title: '경상남도',
            code: 36,
            coord: {
                Lat: 35.4606,
                Lng: 128.2132,
            },
        },
        {
            title: '전라북도',
            code: 37,
            coord: {
                Lat: 35.716,
                Lng: 127.1448,
            },
        },
        {
            title: '전라남도',
            code: 38,
            coord: {
                Lat: 34.8679,
                Lng: 126.991,
            },
        },
        {
            title: '제주도',
            code: 39,
            coord: {
                Lat: 33.4996,
                Lng: 126.5312,
            },
        },
    ];
    // map
    const [maps, setMaps] = useState([]);
    const { kakao } = window;
    const mapArr = ['map1', 'map2'];
    // 지도 생성
    useEffect(() => {
        mapArr.forEach((m, i) => {
            let container = document.getElementById(mapArr[i]);

            //지도를 담을 영역의 DOM 레퍼런스
            let options = {
                //지도를 생성할 때 필요한 기본 옵션
                center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
                level: 10, //지도의 레벨(확대, 축소 정도)
            };

            let newMap = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
            setMaps((maps) => [...maps, newMap]);
        });
    }, [kakao.maps.LatLng, kakao.maps.Map]);

    useEffect(() => {
        if (maps.length > 0) {
            maps.forEach((map, i) => {
                let bounds = new kakao.maps.LatLngBounds();
                for (let j = 0; j < areaArr.length; j++) {
                    const { Lat, Lng } = areaArr[j].coord;

                    // LatLngBounds 객체에 좌표를 추가합니다
                    bounds.extend(new kakao.maps.LatLng(Lat, Lng));
                }
                if (Object.keys(bounds).length !== 0) {
                    // 지도에 루트에 포함된 마커들이 보이도록 범위 재설정
                    map.setBounds(bounds);
                }
            });
        }
    }, [maps, kakao.maps.LatLng, kakao.maps.LatLngBounds]);

    const showRouteMarker = useCallback(() => {
        if (maps.length > 0) {
            maps.forEach((map) => {
                let linePath = [];
                let markerPosition;
                let imageSize;
                let marker;
                let polyline;
                for (let j = 0; j < areaArr.length; j++) {
                    const { Lat, Lng } = areaArr[j].coord;
                    // 마커가 표시될 위치입니다
                    markerPosition = new kakao.maps.LatLng(Lat, Lng);
                    // imageSize = new kakao.maps.Size(10, 10);
                    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
                    // let markerImage = new kakao.maps.MarkerImage(spotImg, imageSize);
                    // 마커를 생성합니다
                    marker = new kakao.maps.Marker({
                        position: markerPosition,
                        clickable: true,
                        // image: markerImage,
                    });
                    // 마커가 지도 위에 표시되도록 설정합니다
                    marker.setMap(map);
                    // 선을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 선을 표시합니다
                    linePath = [...linePath, new kakao.maps.LatLng(Lat, Lng)];
                }
                // 지도에 표시할 선을 생성합니다
                polyline = new kakao.maps.Polyline({
                    path: linePath, // 선을 구성하는 좌표배열 입니다
                    strokeWeight: 5, // 선의 두께 입니다
                    strokeColor: 'red', // 선의 색깔입니다
                    strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                    strokeStyle: 'solid', // 선의 스타일입니다
                });
                // 지도에 선을 표시합니다
                polyline.setMap(map);
            });
        }
    }, [kakao.maps.LatLng, kakao.maps.Polyline, kakao.maps.Marker, kakao.maps.MarkerImage, kakao.maps.Size, maps]);

    useEffect(() => {
        showRouteMarker();
    }, [showRouteMarker]);

    const itemRef = useRef();
    // 드래그시 페이지 전환 막기
    const history = useHistory();
    const drag = useRef(false);
    const allowTransition = () => {
        if (!drag.current) {
            history.push('/PlannerInfo');
        }
    };

    if (plannerError) {
        return <div>Loading...</div>;
    }
    return (
        <ShareListBlock>
            <Container>
                <TitleBox>
                    <p>다른 이용자들의 플래너</p>
                </TitleBox>
                {mapArr && mapArr.map((m) => <Map id={m} />)}
                {sharePlanners ? (
                    <Slider list={sharePlanners.list} itemRef={itemRef} scroll={true} drag={drag}>
                        <Shares>
                            {sharePlanners.list &&
                                sharePlanners.list.map((p) => (
                                    <ShareItem
                                        key={p.plannerId}
                                        ref={itemRef}
                                        // drag={drag.current}
                                        onClick={() => {
                                            // onLoadPlanner(p.plannerId);
                                            onChangeCurPlannerId(p.plannerId);
                                            allowTransition();
                                        }}
                                    >
                                        {/* <Link to="/PlannerInfo"> */}
                                        <SimpleMap />
                                        <InfoBox>
                                            <Name>{p.title}</Name>
                                            <Date>
                                                {p.planDateStart} ~ {p.planDateEnd}
                                                {/* {new Date(planner.planDateStart).format('YYYY-MM-DD')} ~ {planner.planDateEnd} */}
                                            </Date>
                                        </InfoBox>
                                        {/* </Link> */}
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
