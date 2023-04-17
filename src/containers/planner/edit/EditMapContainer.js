import { useCallback } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditMap from '../../../components/planner/edit/EditMap';
import { toggleMemberModalAction, togglePlannerInfoModalAction, updatePlanAction, updatePlannerAction } from '../../../modules/plannerModule';
import spotImg from '../../../lib/images/spot.png';

const EditMapContainer = () => {
    const dispatch = useDispatch();
    const { planner, plannerError, spots } = useSelector(({ plannerReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
        spots: plannerReducer.spots,
    }));

    const { plannerId, plans, title, planDateStart, planDateEnd, expense, memberCount, memberTypeId } = { ...planner };
    const onUpdatePlanner = () => {
        dispatch(updatePlannerAction({ plannerId, title, planDateStart, planDateEnd, expense, memberCount, memberTypeId }));
    };

    const onToggleMemberModal = () => {
        dispatch(toggleMemberModalAction());
    };
    const onTogglePlannerInfoModal = () => {
        dispatch(togglePlannerInfoModalAction());
    };

    const mapRef = useRef();
    const [map, setMap] = useState();
    const { kakao } = window;
    // 지도 생성
    useEffect(() => {
        const options = {
            center: new kakao.maps.LatLng(37.5820858828, 126.9846616856),
            level: 10,
        };
        const map = new kakao.maps.Map(mapRef.current, options);
        setMap(map);
    }, []);

    // const [selectedMarker, setSelectedMarker] = useState(null);
    // 지도에 여행지 마커로 표시 + 인포윈도우 표시
    const showSpotMarker = useCallback(() => {
        let infowindows = [];
        for (let i = 0; i < spots.length; i++) {
            const { title, mapx, mapy } = spots[i];

            // 마커가 표시될 위치입니다
            let markerPosition = new kakao.maps.LatLng(mapy, mapx);
            let imageSize = new kakao.maps.Size(10, 10);

            // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
            let markerImage = new kakao.maps.MarkerImage(spotImg, imageSize);

            // 마커를 생성합니다
            let marker = new kakao.maps.Marker({
                position: markerPosition,
                title: title,
                clickable: true,
                image: markerImage,
            });

            // 마커가 지도 위에 표시되도록 설정합니다
            marker.setMap(map);

            // 인포윈도우를 생성합니다
            let infowindow = new kakao.maps.InfoWindow({
                // 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다
                content: `<div style="padding:5px;">${title}</div>`,
                // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다
                removable: true,
            });
            infowindows.push(infowindow);

            // 마커에 클릭이벤트를 등록합니다
            kakao.maps.event.addListener(marker, 'click', showInfowindow(map, marker, infowindow));

            // 이전 인포윈도우 끄기
            // kakao.maps.event.addListener(marker, 'click', () => {
            //     infowindow.close(map, marker);
            // });
        }

        // 맵 클릭하여 전체 인포윈도우 끄기
        if (map && infowindows.length > 0) {
            kakao.maps.event.addListener(map, 'click', () => {
                infowindows.forEach((infowindow) => infowindow.close());
            });
        }

        // 인포윈도우 생성 함수
        function showInfowindow(map, marker, infowindow) {
            return () => {
                infowindow.open(map, marker);
            };
        }
    }, [kakao.maps.InfoWindow, kakao.maps.LatLng, kakao.maps.Marker, kakao.maps.event, kakao.maps.Size, kakao.maps.MarkerImage, map, spots]);

    const showRouteMarker = useCallback(() => {
        let infowindows = [];
        for (let i = 0; i < plans.length; i++) {
            const { title, mapx, mapy } = plans[i];

            // 마커가 표시될 위치입니다
            let markerPosition = new kakao.maps.LatLng(mapy, mapx);
            let imageSize = new kakao.maps.Size(10, 10);

            // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
            let markerImage = new kakao.maps.MarkerImage(spotImg, imageSize);

            // 마커를 생성합니다
            let marker = new kakao.maps.Marker({
                position: markerPosition,
                title: title,
                clickable: true,
                image: markerImage,
            });

            // 마커가 지도 위에 표시되도록 설정합니다
            marker.setMap(map);

            // 인포윈도우를 생성합니다
            let infowindow = new kakao.maps.InfoWindow({
                // 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다
                content: `<div style="padding:5px;">${title}</div>`,
                // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다
                removable: true,
            });
            infowindows.push(infowindow);

            // 마커에 클릭이벤트를 등록합니다
            kakao.maps.event.addListener(marker, 'click', showInfowindow(map, marker, infowindow));

            // 이전 인포윈도우 끄기
            // kakao.maps.event.addListener(marker, 'click', () => {
            //     infowindow.close(map, marker);
            // });
        }

        // 맵 클릭하여 전체 인포윈도우 끄기
        if (map && infowindows.length > 0) {
            kakao.maps.event.addListener(map, 'click', () => {
                infowindows.forEach((infowindow) => infowindow.close());
            });
        }

        // 인포윈도우 생성 함수
        function showInfowindow(map, marker, infowindow) {
            return () => {
                infowindow.open(map, marker);
            };
        }
    }, []);

    // 여행지 리스트에 여행지 아이템을 선택했을 때 지도에 표시하려 작성한 코드.
    const getLocationByAddress = useCallback(() => {
        //     // console.log(window.kakao.maps);
        //     if (!window.kakao.maps.services || !map) {
        //         return;
        //     }
        //     console.log('2:' + window.kakao.maps.services);
        //     // 주소-좌표 변환 객체를 생성합니다
        //     const geocoder = new window.kakao.maps.services.Geocoder();
        //     // 주소로 좌표를 검색합니다
        //     geocoder.addressSearch('제주특별자치도 제주시 첨단로 242', function (result, status) {
        //         // 정상적으로 검색이 완료됐으면
        //         if (status === window.kakao.maps.services.Status.OK) {
        //             const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        //             // 결과값으로 받은 위치를 마커로 표시합니다
        //             const marker = new window.kakao.maps.Marker({
        //                 map: map,
        //                 position: coords,
        //             });
        //             // 인포윈도우로 장소에 대한 설명을 표시합니다
        //             const infowindow = new window.kakao.maps.InfoWindow({
        //                 content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>',
        //             });
        //             infowindow.open(map, marker);
        //             // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        //             map.setCenter(coords);
        //         }
        //     });
    }, [map]);

    useEffect(() => {
        showSpotMarker();
    }, [showSpotMarker]);

    return <EditMap mapRef={mapRef} planner={planner} onUpdatePlanner={onUpdatePlanner} onToggleMemberModal={onToggleMemberModal} onTogglePlannerInfoModal={onTogglePlannerInfoModal} getLocationByAddress={getLocationByAddress} />;
};

export default EditMapContainer;
