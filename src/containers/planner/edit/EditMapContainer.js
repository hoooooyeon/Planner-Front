import { useCallback } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditMap from '../../../components/planner/edit/EditMap';
import { createMapAction, updatePlannerAction } from '../../../modules/plannerModule';
import circleImg from '../../../lib/images/circle.png';
import locationImg from '../../../lib/images/location.png';
import { loadSpotsAction, resetSpotDataAction, changeAreaIndexAction } from '../../../modules/spotModule';

const EditMapContainer = () => {
    const dispatch = useDispatch();
    const { planner, plannerError, spots, spotData, areas, keyword, contentTypeList } = useSelector(({ plannerReducer, spotReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
        spots: spotReducer.spots,
        areas: spotReducer.areas,
        spotData: spotReducer.spotData,
        keyword: spotReducer.keyword,
        contentTypeList: spotReducer.contentTypeList,
        // map: plannerReducer.map,
    }));

    const { plannerId, plans, title, planDateStart, planDateEnd, expense, memberCount, memberTypeId } = { ...planner };
    const onUpdatePlanner = () => {
        dispatch(updatePlannerAction({ plannerId, title, planDateStart, planDateEnd, expense, memberCount, memberTypeId }));
    };

    const mapRef = useRef(null);
    const [map, setMap] = useState();
    const { kakao } = window;
    // 지도 생성
    useEffect(() => {
        const options = {
            center: new kakao.maps.LatLng(37.5665, 126.978),
            level: 10,
        };
        const map = new kakao.maps.Map(mapRef.current, options);
        setMap(map);

        // dispatch(createMapAction(map));
    }, []);

    // 지도의 좌표 전부 보이게 시점 변경
    const [view, setView] = useState(true);
    useEffect(() => {
        if (map && plans && view) {
            let bounds = new kakao.maps.LatLngBounds();
            for (let i = 0; i < plans.length; i++) {
                const { planLocations } = plans[i];
                for (let j = 0; j < planLocations.length; j++) {
                    const { locationMapx, locationMapy } = planLocations[j];
                    // LatLngBounds 객체에 좌표를 추가합니다
                    bounds.extend(new kakao.maps.LatLng(locationMapy, locationMapx));
                }
            }
            if (Object.keys(bounds).length !== 0) {
                // 지도에 루트에 포함된 마커들이 보이도록 범위 재설정
                map.setBounds(bounds);
                setView(false);
            }
        }
    }, [map, view, kakao.maps.LatLng, kakao.maps.LatLngBounds]);

    const newSpotArr = useRef([]);
    const spotArr = useRef([]);
    // 지도에 여행지 마커로 표시 + 인포윈도우 표시
    const showSpotMarker = useCallback(() => {
        if (map && spots) {
            let infowindow = new kakao.maps.InfoWindow({ removable: true });
            let marker;
            let markerPosition;
            let imageSize;
            let markerImage;

            newSpotArr.current = [];

            for (let i = 0; i < spots.list.length; i++) {
                const { title, mapx, mapy } = spots.list[i];

                // 마커가 표시될 위치입니다
                markerPosition = new kakao.maps.LatLng(mapy, mapx);

                // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
                imageSize = new kakao.maps.Size(10, 10);
                markerImage = new kakao.maps.MarkerImage(circleImg, imageSize);

                // 마커를 생성합니다
                marker = new kakao.maps.Marker({
                    position: markerPosition,
                    clickable: true,
                    image: markerImage,
                });

                newSpotArr.current.push(marker);

                // 마커에 인포윈도우 생성 및 켜기 이벤트 등록
                kakao.maps.event.addListener(marker, 'click', addInfowindow(marker, title));

                // 맵에 인포윈도우 끄기 이벤트 등록
                kakao.maps.event.addListener(map, 'click', removeInfowindow());
            }

            spotArr.current.forEach((spot) => spot.setMap(null));
            newSpotArr.current.forEach((spot) => spot.setMap(map));
            spotArr.current = newSpotArr.current;

            // 인포윈도우 생성 함수
            function addInfowindow(marker, title) {
                return () => {
                    infowindow.setContent(`<div style="padding:5px;">${title}</div>`);
                    infowindow.open(map, marker);
                };
            }
            function removeInfowindow() {
                return () => {
                    infowindow.close();
                };
            }
        }
    }, [kakao.maps.InfoWindow, kakao.maps.LatLng, kakao.maps.Marker, kakao.maps.event, kakao.maps.Size, kakao.maps.MarkerImage, map, spots]);

    const newMarkerArr = useRef([]);
    const markerArr = useRef([]);
    const line = useRef();
    const showRouteMarker = useCallback(() => {
        if (map && plans) {
            let infowindow = new kakao.maps.InfoWindow({ removable: true });
            let linePath = [];
            let markerPosition;
            let imageSize;
            let markerImage;
            let marker;
            let polyline;

            newMarkerArr.current = [];

            for (let i = 0; i < plans.length; i++) {
                const { planLocations } = plans[i];
                for (let j = 0; j < planLocations.length; j++) {
                    const { locationMapx, locationMapy, locationName } = planLocations[j];

                    // 마커가 표시될 위치입니다
                    markerPosition = new kakao.maps.LatLng(locationMapy, locationMapx);
                    imageSize = new kakao.maps.Size(30, 30);

                    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
                    markerImage = new kakao.maps.MarkerImage(locationImg, imageSize);

                    // 마커를 생성합니다
                    marker = new kakao.maps.Marker({
                        position: markerPosition,
                        clickable: true,
                        image: markerImage,
                    });
                    newMarkerArr.current.push(marker);

                    // 마커에 인포윈도우 생성 및 켜기 이벤트 등록
                    kakao.maps.event.addListener(marker, 'click', addInfowindow(marker, locationName));

                    // 맵에 인포윈도우 끄기 이벤트 등록
                    kakao.maps.event.addListener(map, 'click', removeInfowindow());

                    // 선을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 선을 표시합니다
                    linePath = [...linePath, new kakao.maps.LatLng(locationMapy, locationMapx)];
                }
            }
            // 지도에 표시할 선을 생성합니다
            polyline = new kakao.maps.Polyline({
                path: linePath, // 선을 구성하는 좌표배열 입니다
                strokeWeight: 3, // 선의 두께 입니다
                strokeColor: 'gray', // 선의 색깔입니다
                strokeOpacity: 0.5, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                strokeStyle: 'solid', // 선의 스타일입니다
            });

            // 기존 라인을 지우고 새로 라인 긋기.
            if (line.current) {
                line.current.setMap(null);
            }

            line.current = polyline;
            // 지도에 선을 표시합니다
            polyline.setMap(map);

            // 기존 마커를 지우고 새로 마커를 표시.
            markerArr.current.forEach((marker) => marker.setMap(null));
            newMarkerArr.current.forEach((marker) => marker.setMap(map));
            markerArr.current = newMarkerArr.current;

            // 인포윈도우 생성 함수
            function addInfowindow(marker, title) {
                return () => {
                    infowindow.setContent(`<div style="padding:5px;">${title}</div>`);
                    infowindow.open(map, marker);
                };
            }
            function removeInfowindow() {
                return () => {
                    infowindow.close();
                };
            }
        }
    }, [kakao.maps.LatLng, kakao.maps.Polyline, kakao.maps.InfoWindow, kakao.maps.event, kakao.maps.Marker, kakao.maps.MarkerImage, kakao.maps.Size, map, plans]);

    useEffect(() => {
        showSpotMarker();
        showRouteMarker();
    }, [showRouteMarker, showSpotMarker]);

    // 지도 중심 좌표 얻는 함수
    const [centerCoord, setCenterCoord] = useState();
    const getMapCenter = useCallback(() => {
        let coord = map.getCenter();
        setCenterCoord({
            Lat: coord.getLat(),
            Lng: coord.getLng(),
        });
    }, [map]);

    // 지도 중심 좌표 얻기
    useEffect(() => {
        if (map) {
            // 지도의 중심 좌표 얻기
            kakao.maps.event.addListener(map, 'mouseup', getMapCenter);
        }
    }, [dispatch, map, getMapCenter, kakao.maps.event]);

    // 중심 좌표를 통해 현재  지역 구하기
    useEffect(() => {
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
        if (map) {
            let arr = [];
            let polyline;
            let coordArr = [];
            let minCoord;
            let num;
            if (centerCoord) {
                areaArr.map((a) => {
                    arr = [new kakao.maps.LatLng(centerCoord.Lat, centerCoord.Lng), new kakao.maps.LatLng(a.coord.Lat, a.coord.Lng)];
                    polyline = new kakao.maps.Polyline({
                        path: arr, // 선을 구성하는 좌표배열 입니다
                    });
                    coordArr = [...coordArr, polyline.getLength()];

                    minCoord = Math.min(...coordArr);
                    num = coordArr.findIndex((c) => c === minCoord);
                    return coordArr;
                });
                dispatch(changeAreaIndexAction(areaArr[num].code));
            }
        }
    }, [centerCoord, dispatch, kakao.maps.LatLng, kakao.maps.Polyline, map]);

    const { areaIndex, pageIndex, contentTypeId } = { ...spotData };
    // 여행지 리스트 로드
    useEffect(() => {
        dispatch(loadSpotsAction({ areaIndex, contentTypeId, pageIndex }));
    }, [dispatch, areaIndex, contentTypeId, pageIndex]);

    const onResetSpotData = () => {
        dispatch(resetSpotDataAction());
    };

    return <EditMap mapRef={mapRef} planner={planner} areas={areas} spotData={spotData} keyword={keyword} onUpdatePlanner={onUpdatePlanner} onResetSpotData={onResetSpotData} />;
};

export default EditMapContainer;
