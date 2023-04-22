import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlannerInfo from '../../../components/planner/info/PlannerInfo';
import { changeCurPlanIdAction, deletePlannerAction, loadPlanAction, loadPlannerAction, toggleLikePlannerAction, toggleMemberModalAction, togglePlannerInfoModalAction } from '../../../modules/plannerModule';
import spotImg from '../../../lib/images/spot.png';

const PlannerInfoContainer = () => {
    const dispatch = useDispatch();
    const { planner, plannerError, currentInfo, spots } = useSelector(({ plannerReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
        currentInfo: plannerReducer.currentInfo,
        spots: plannerReducer.spots,
    }));

    const { plannerId, plans } = { ...planner };
    const { planId } = { ...currentInfo };

    const onDeletePlanner = () => {
        dispatch(deletePlannerAction(plannerId));
    };

    const onToggleMemberModal = () => {
        dispatch(toggleMemberModalAction());
    };

    const onTogglePlannerInfoModal = () => {
        dispatch(togglePlannerInfoModalAction());
    };

    // 수정페이지 도달시 맨처음 currentInfo planId 설정.
    useEffect(() => {
        if (!planId && planner && plans.length !== 0) {
            dispatch(changeCurPlanIdAction(plans[0].planId));
        } else if (!planId && planner && plans.length === 0) {
            // dispatch(changeCurPlanIdAction(1));
        }
    }, [dispatch, plans, planner, planId]);

    // planner 정보 가져오기
    useEffect(() => {
        const { plannerId } = currentInfo;
        if (plannerId) {
            dispatch(loadPlannerAction(plannerId));
        }
    }, [dispatch, currentInfo]);

    const onChangeCurPlanId = (planId) => {
        dispatch(changeCurPlanIdAction(planId));
    };

    const onToggleLikePlanner = () => {
        dispatch(toggleLikePlannerAction(plannerId));
    };

    const mapRef = useRef();
    const [map, setMap] = useState();
    const { kakao } = window;
    // 지도 생성
    useEffect(() => {
        if (mapRef.current) {
            const options = {
                center: new kakao.maps.LatLng(37.5820858828, 126.9846616856),
                level: 10,
            };
            const map = new kakao.maps.Map(mapRef.current, options);
            setMap(map);
        }
    }, [kakao.maps.LatLng, kakao.maps.Map, mapRef.current]);

    const [bounds, setBounds] = useState();
    const showRouteMarker = useCallback(() => {
        let linePath = [];
        let marker, markerPosition, imageSize, markerImage, polyline;
        // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
        setBounds(new kakao.maps.LatLngBounds());
        for (let i = 0; i < spots.length; i++) {
            const { title, mapx, mapy } = spots[i];
            // 마커가 표시될 위치입니다
            markerPosition = new kakao.maps.LatLng(mapy, mapx);
            imageSize = new kakao.maps.Size(10, 10);

            // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
            markerImage = new kakao.maps.MarkerImage(spotImg, imageSize);

            // 마커를 생성합니다
            marker = new kakao.maps.Marker({
                position: markerPosition,
                title: title,
                image: markerImage,
            });

            // 마커가 지도 위에 표시되도록 설정합니다
            marker.setMap(map);

            // if (bounds) {
            //     // LatLngBounds 객체에 좌표를 추가합니다
            //     bounds.extend(markerPosition);
            //     // LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다
            //     map.setBounds(bounds);
            // }

            linePath = [...linePath, new kakao.maps.LatLng(mapy, mapx)];
        }

        // 지도에 표시할 선을 생성합니다
        polyline = new kakao.maps.Polyline({
            path: linePath, // 선을 구성하는 좌표배열 입니다
            strokeWeight: 5, // 선의 두께 입니다
            strokeColor: 'gray', // 선의 색깔입니다
            strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'solid', // 선의 스타일입니다
        });

        // 지도에 선을 표시합니다
        polyline.setMap(map);
    }, [kakao.maps.Polyline, kakao.maps.LatLng, kakao.maps.Marker, kakao.maps.Size, kakao.maps.MarkerImage, kakao.maps.LatLngBounds, map, spots, bounds]);

    useEffect(() => {
        // showRouteMarker();
    }, [showRouteMarker]);

    useEffect(() => {});

    return (
        <PlannerInfo
            planner={planner}
            currentInfo={currentInfo}
            mapRef={mapRef}
            onDeletePlanner={onDeletePlanner}
            onToggleMemberModal={onToggleMemberModal}
            onTogglePlannerInfoModal={onTogglePlannerInfoModal}
            onChangeCurPlanId={onChangeCurPlanId}
            onToggleLikePlanner={onToggleLikePlanner}
        />
    );
};

export default PlannerInfoContainer;
