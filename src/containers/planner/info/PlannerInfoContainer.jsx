import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlannerInfo from '../../../components/planner/info/PlannerInfo';
import {
    changeAllScheduleAction,
    changeCurPlanIdAction,
    changeCurPlannerIdAction,
    deletePlannerAction,
    loadPlannerAction,
    resetPlannerErrorAction,
    toggleLikePlannerAction,
    toggleMemberModalAction,
    togglePlannerInfoModalAction,
} from '../../../modules/plannerModule';
import circleImg from '../../../lib/images/circle.png';
import { useHistory, useParams } from 'react-router';

const PlannerInfoContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    const { planner, plannerError, plannerData, allSchedule, account } = useSelector(
        ({ plannerReducer, authReducer }) => ({
            planner: plannerReducer.planner,
            plannerError: plannerReducer.plannerError,
            plannerData: plannerReducer.plannerData,
            account: authReducer.account,
            allSchedule: plannerReducer.allSchedule,
        }),
    );

    const { plans } = { ...planner };
    const { plannerId, planId } = { ...plannerData };
    const { accountId } = { ...account };

    // 페이지 접근 제어
    useEffect(() => {
        if (planner === false) {
            alert('잘못된 접근입니다.');
            history.push('/Planners');
        }
    }, [history, planner]);

    // 주소 입력 접근시 plannerData.plannerId 설정
    useEffect(() => {
        dispatch(changeCurPlannerIdAction(params.plannerId));
    }, [dispatch, params]);

    // 플래너 삭제
    const onDeletePlanner = () => {
        if (accountId === planner.accountId) {
            if (window.confirm('정말로 삭제하시겠습니까?')) {
                dispatch(deletePlannerAction(plannerId));
                history.push('/Planners');
            }
        }
    };

    // 플래너수정페이지로 이동.
    const onClickEditPlanner = () => {
        history.push(`/Planners/edit/${plannerId}`);
    };

    // 멤버수정모달 토글.
    const onToggleMemberModal = () => {
        if (accountId === planner.accountId) {
            dispatch(toggleMemberModalAction());
        }
    };

    // 플래너정보모달 토글.
    const onTogglePlannerInfoModal = () => {
        if (accountId === planner.accountId) {
            dispatch(togglePlannerInfoModalAction());
        }
    };

    // 수정페이지 도달시 맨처음 plannerData.planId 설정.
    useEffect(() => {
        if (planId === '' && plans && plans.length > 0) {
            dispatch(changeCurPlanIdAction(plans[0].planId));
        }
    }, [dispatch, plans, planId]);

    // planner 로드
    useEffect(() => {
        if (plannerId !== '') {
            dispatch(loadPlannerAction(plannerId));
        }
    }, [dispatch, plannerData]);

    // plan 선택
    const drag = useRef(false);
    const onChangeCurPlanId = (planId) => {
        if (!drag.current) {
            dispatch(changeCurPlanIdAction(planId));
        }
    };

    // 플래너 좋아요 토글
    const onToggleLikePlanner = () => {
        if (accountId) {
            dispatch(toggleLikePlannerAction(plannerId));
        } else {
            alert('로그인이 필요합니다.');
        }
    };

    /* 지도 관련 함수들 */
    const mapRef = useRef(null);
    const [map, setMap] = useState();
    const { kakao } = window;
    // 지도 생성
    useEffect(() => {
        if (mapRef.current) {
            const options = {
                center: new kakao.maps.LatLng(36.5, 127.8),
                level: 14,
                draggable: false,
            };
            const map = new kakao.maps.Map(mapRef.current, options);
            setMap(map);
            dispatch(changeAllScheduleAction(false));
        }
    }, [mapRef.current]);

    // 지도 시점 수정
    const setBoundsMap = useCallback(() => {
        const latLngArr = [
            [38.94442964205739, 128.2508941493898],
            [36.897478107403046, 125.85006316386725],
            [36.78152656393097, 129.63706324233684],
            [33.06005490694258, 127.89805901698669],
        ];
        let isLocation = false;
        if (map && Object.keys(planner).length > 0 && plans.length > 0) {
            let bounds = new kakao.maps.LatLngBounds();

            plans.forEach((plan) => {
                if (plan.planLocations.length > 0) {
                    isLocation = true;
                }
            });
            // 루트가 짜인 일정
            if (isLocation) {
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
                // 루트가 없는 일정
            } else {
                for (let i = 0; i < latLngArr.length; i++) {
                    bounds.extend(new kakao.maps.LatLng(latLngArr[i][0], latLngArr[i][1]));
                }

                if (Object.keys(bounds).length !== 0) {
                    map.setBounds(bounds);
                }
            }
        } else if (map && Object.keys(planner).length > 0 && plans.length <= 0) {
            let bounds = new kakao.maps.LatLngBounds();

            for (let i = 0; i < latLngArr.length; i++) {
                bounds.extend(new kakao.maps.LatLng(latLngArr[i][0], latLngArr[i][1]));
            }

            if (Object.keys(bounds).length !== 0) {
                map.setBounds(bounds);
            }
        }
    }, [kakao.maps.LatLng, kakao.maps.LatLngBounds, map, planner, plans]);

    useEffect(() => {
        if (mapRef.current && Object.keys(planner).length > 0) {
            window.addEventListener('resize', setBoundsMap);
            setBoundsMap();
            return () => window.removeEventListener('resize', setBoundsMap);
        }
    }, [map, setBoundsMap, planner]);

    const newMarkerArr = useRef([]);
    const markerArr = useRef([]);
    const line = useRef();
    // 모든 일정의 루트 보기
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
            // 인포윈도우 삭제 함수
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

                    markerPosition = new kakao.maps.LatLng(locationMapy, locationMapx);
                    imageSize = new kakao.maps.Size(10, 10);

                    markerImage = new kakao.maps.MarkerImage(circleImg, imageSize);

                    marker = new kakao.maps.Marker({
                        position: markerPosition,
                        clickable: true,
                        image: markerImage,
                    });
                    newMarkerArr.current.push(marker);

                    kakao.maps.event.addListener(marker, 'click', addInfowindow(marker, locationName));

                    kakao.maps.event.addListener(map, 'click', removeInfowindow());

                    linePath = [...linePath, new kakao.maps.LatLng(locationMapy, locationMapx)];
                }
            }

            polyline = new kakao.maps.Polyline({
                path: linePath,
                strokeWeight: 3,
                strokeColor: 'gray',
                strokeOpacity: 0.5,
                strokeStyle: 'solid',
            });

            if (line.current) {
                line.current.setMap(null);
            }

            line.current = polyline;
            polyline.setMap(map);

            markerArr.current.forEach((marker) => marker.setMap(null));
            newMarkerArr.current.forEach((marker) => marker.setMap(map));
            markerArr.current = newMarkerArr.current;

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
    }, [
        kakao.maps.LatLng,
        kakao.maps.Polyline,
        kakao.maps.InfoWindow,
        kakao.maps.event,
        kakao.maps.Marker,
        kakao.maps.MarkerImage,
        kakao.maps.Size,
        map,
        plans,
        plannerData.planId,
    ]);

    useEffect(() => {
        showDateRouteMarker();
    }, [showDateRouteMarker]);

    // 지도에 일정의 루트 출력 토글.
    const onClickAllSchedule = () => {
        if (allSchedule) {
            showDateRouteMarker();
            dispatch(changeAllScheduleAction(false));
        } else {
            showAllRouteMarker();
            dispatch(changeAllScheduleAction(true));
        }
    };

    // 모든 일정 루트 보기 끄기.
    const onClickDateSchedule = () => {
        dispatch(changeAllScheduleAction(false));
    };

    // plannerError 리셋
    const onCloseError = () => {
        dispatch(resetPlannerErrorAction());
    };

    if (Object.keys(planner).length <= 0) {
        return null;
    }
    return (
        <PlannerInfo
            account={account}
            planner={planner}
            plannerData={plannerData}
            mapRef={mapRef}
            drag={drag}
            plannerError={plannerError}
            allSchedule={allSchedule}
            onCloseError={onCloseError}
            onClickAllSchedule={onClickAllSchedule}
            onClickDateSchedule={onClickDateSchedule}
            onDeletePlanner={onDeletePlanner}
            onToggleMemberModal={onToggleMemberModal}
            onTogglePlannerInfoModal={onTogglePlannerInfoModal}
            onChangeCurPlanId={onChangeCurPlanId}
            onToggleLikePlanner={onToggleLikePlanner}
            onClickEditPlanner={onClickEditPlanner}
        />
    );
};

export default PlannerInfoContainer;
