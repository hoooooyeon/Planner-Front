import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlannerInfo from '../../../components/planner/info/PlannerInfo';
import { changeAllScheduleAction, changeCurPlanIdAction, deletePlannerAction, loadPlannerAction, toggleLikePlannerAction, toggleMemberModalAction, togglePlannerInfoModalAction } from '../../../modules/plannerModule';
import circleImg from '../../../lib/images/circle.png';
import { useHistory } from 'react-router';

const PlannerInfoContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { planner, plannerError, plannerData, allSchedule, transList, account } = useSelector(({ plannerReducer, authReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
        plannerData: plannerReducer.plannerData,
        transList: plannerReducer.transList,
        account: authReducer.account,
        allSchedule: plannerReducer.allSchedule,
    }));

    const { plans } = { ...planner };
    const { plannerId, planId, creator } = { ...plannerData };
    const { accountId, nickname } = { ...account };

    useEffect(() => {
        if (!plannerId) {
            alert('잘못된 접근입니다.');

            history.push('/Planners');
        }
    }, []);

    const onDeletePlanner = () => {
        if (accountId && creator === nickname) {
            dispatch(deletePlannerAction(plannerId));
            history.push('/Planners');
        }
    };

    const onClickEditPlanner = () => {
        history.push(`/Planners/edit/${plannerId}`);
    };

    const onToggleMemberModal = () => {
        dispatch(toggleMemberModalAction());
    };

    const onTogglePlannerInfoModal = () => {
        dispatch(togglePlannerInfoModalAction());
    };

    // 수정페이지 도달시 맨처음 plannerData planId 설정.
    useEffect(() => {
        if (!planId && plans && plans.length !== 0) {
            dispatch(changeCurPlanIdAction(plans[0].planId));
        }
    }, [dispatch, plans, planId]);

    // planner 정보 가져오기
    useEffect(() => {
        if (plannerId) {
            dispatch(loadPlannerAction(plannerId));
        }
    }, [dispatch, plannerData]);

    const drag = useRef(false);
    const onChangeCurPlanId = (planId) => {
        if (!drag.current) {
            dispatch(changeCurPlanIdAction(planId));
        }
    };

    const onToggleLikePlanner = () => {
        if (accountId) {
            dispatch(toggleLikePlannerAction(plannerId));
        } else {
            alert('로그인이 필요합니다.');
        }
    };

    const mapRef = useRef(null);
    const [map, setMap] = useState();
    const { kakao } = window;
    // 지도 생성
    useEffect(() => {
        if (mapRef.current) {
            const options = {
                center: new kakao.maps.LatLng(36.5, 127.8),
                level: 14,
            };
            const map = new kakao.maps.Map(mapRef.current, options);
            setMap(map);
            dispatch(changeAllScheduleAction(false));
        }
    }, [mapRef.current]);

    const setBoundsMap = () => {
        if (map && plans.length === 0) {
            map.setCenter(new kakao.maps.LatLng(36.5, 127.8));
        } else if (map && plans.length > 0) {
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
            }
        }
    };

    useEffect(() => {
        if (mapRef.current) {
            window.addEventListener('resize', setBoundsMap);
            setBoundsMap();
            return () => window.removeEventListener('resize', setBoundsMap);
        }
    }, [map]);

    const newMarkerArr = useRef([]);
    const markerArr = useRef([]);
    const line = useRef();
    const showAllRouteMarker = () => {
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
                    imageSize = new kakao.maps.Size(10, 10);

                    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
                    markerImage = new kakao.maps.MarkerImage(circleImg, imageSize);

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
    };

    const showDateRouteMarker = useCallback(() => {
        if (map && plans) {
            let infowindow = new kakao.maps.InfoWindow({ removable: true });
            let linePath = [];
            let markerPosition;
            let imageSize;
            let markerImage;
            let marker;
            let polyline;

            newMarkerArr.current = [];

            let foundPlan;
            for (let i = 0; i < plans.length; i++) {
                foundPlan = plans.find((plan) => plan.planId === plannerData.planId);
            }
            if (foundPlan) {
                for (let j = 0; j < foundPlan.planLocations.length; j++) {
                    const { locationMapx, locationMapy, locationName } = foundPlan.planLocations[j];

                    // 마커가 표시될 위치입니다
                    markerPosition = new kakao.maps.LatLng(locationMapy, locationMapx);
                    imageSize = new kakao.maps.Size(10, 10);

                    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
                    markerImage = new kakao.maps.MarkerImage(circleImg, imageSize);

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
    }, [kakao.maps.LatLng, kakao.maps.Polyline, kakao.maps.InfoWindow, kakao.maps.event, kakao.maps.Marker, kakao.maps.MarkerImage, kakao.maps.Size, map, plans, plannerData.planId]);

    useEffect(() => {
        showDateRouteMarker();
    }, [showDateRouteMarker]);

    const onClickAllSchedule = () => {
        if (allSchedule) {
            showDateRouteMarker();
            dispatch(changeAllScheduleAction(false));
        } else {
            showAllRouteMarker();
            dispatch(changeAllScheduleAction(true));
        }
    };

    const onClickDateSchedule = () => {
        dispatch(changeAllScheduleAction(false));
    };

    if (!planner) {
        return null;
    }
    return (
        <PlannerInfo
            account={account}
            planner={planner}
            plannerData={plannerData}
            transList={transList}
            mapRef={mapRef}
            drag={drag}
            allSchedule={allSchedule}
            onClickAllSchedule={onClickAllSchedule}
            onClickDateSchedule={onClickDateSchedule}
            onDeletePlanner={onDeletePlanner}
            onToggleMemberModal={onToggleMemberModal}
            onTogglePlannerInfoModal={onTogglePlannerInfoModal}
            onChangeCurPlanId={onChangeCurPlanId}
            onToggleLikePlanner={onToggleLikePlanner}
            showAllRouteMarker={showAllRouteMarker}
            showDateRouteMarker={showDateRouteMarker}
            onClickEditPlanner={onClickEditPlanner}
        />
    );
};

export default PlannerInfoContainer;
