import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlannerInfo from '../../../components/planner/info/PlannerInfo';
import { changeCurPlanIdAction, deletePlannerAction, loadPlanAction, loadPlannerAction, toggleLikePlannerAction, toggleMemberModalAction, togglePlannerInfoModalAction } from '../../../modules/plannerModule';
import spotImg from '../../../lib/images/spot.png';

const PlannerInfoContainer = () => {
    const dispatch = useDispatch();
    const { planner, plannerError, plannerData, transList, spots } = useSelector(({ plannerReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
        plannerData: plannerReducer.plannerData,
        transList: plannerReducer.transList,
        spots: plannerReducer.spots,
    }));

    const { plannerId, plans } = { ...planner };
    const { planId } = { ...plannerData };

    const onDeletePlanner = () => {
        dispatch(deletePlannerAction(plannerId));
    };

    const onToggleMemberModal = () => {
        dispatch(toggleMemberModalAction());
    };

    const onTogglePlannerInfoModal = () => {
        dispatch(togglePlannerInfoModalAction());
    };

    // 수정페이지 도달시 맨처음 plannerData planId 설정.
    useEffect(() => {
        if (!planId && planner && plans.length !== 0) {
            dispatch(changeCurPlanIdAction(plans[0].planId));
        } else if (!planId && planner && plans.length === 0) {
            // dispatch(changeCurPlanIdAction(1));
        }
    }, [dispatch, plans, planner, planId]);

    // planner 정보 가져오기
    useEffect(() => {
        const { plannerId } = plannerData;
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
        dispatch(toggleLikePlannerAction(plannerId));
    };

    const mapRef = useRef(null);
    const [map, setMap] = useState();
    const { kakao } = window;
    // 지도 생성
    useEffect(() => {
        if (mapRef.current) {
            const options = {
                center: new kakao.maps.LatLng(33.450701, 126.570667),
                level: 10,
            };
            const map = new kakao.maps.Map(mapRef.current, options);
            setMap(map);
        }
    }, [mapRef.current]);

    useEffect(() => {
        if (map && plans) {
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
    }, [map]);

    const showRouteMarker = useCallback(() => {
        if (map && plans) {
            let linePath = [];
            let markerPosition;
            let imageSize;
            let marker;
            let polyline;
            for (let i = 0; i < plans.length; i++) {
                const { planLocations } = plans[i];
                for (let j = 0; j < planLocations.length; j++) {
                    const { locationMapx, locationMapy } = planLocations[j];

                    // 마커가 표시될 위치입니다
                    markerPosition = new kakao.maps.LatLng(locationMapy, locationMapx);
                    imageSize = new kakao.maps.Size(10, 10);

                    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
                    let markerImage = new kakao.maps.MarkerImage(spotImg, imageSize);

                    // 마커를 생성합니다
                    marker = new kakao.maps.Marker({
                        position: markerPosition,
                        clickable: true,
                        image: markerImage,
                    });
                    // 마커가 지도 위에 표시되도록 설정합니다
                    marker.setMap(map);

                    // 선을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 선을 표시합니다
                    linePath = [...linePath, new kakao.maps.LatLng(locationMapy, locationMapx)];
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
            }
        }
    }, [kakao.maps.LatLng, kakao.maps.Polyline, kakao.maps.Marker, kakao.maps.MarkerImage, kakao.maps.Size, map, plans]);

    useEffect(() => {
        showRouteMarker();
    }, [showRouteMarker]);

    return (
        <PlannerInfo
            planner={planner}
            plannerData={plannerData}
            transList={transList}
            mapRef={mapRef}
            drag={drag}
            onDeletePlanner={onDeletePlanner}
            onToggleMemberModal={onToggleMemberModal}
            onTogglePlannerInfoModal={onTogglePlannerInfoModal}
            onChangeCurPlanId={onChangeCurPlanId}
            onToggleLikePlanner={onToggleLikePlanner}
        />
    );
};

export default PlannerInfoContainer;
