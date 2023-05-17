import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditList from '../../../components/planner/edit/EditList';
import { changePlanLocationAction, createLocationAction } from '../../../modules/plannerModule';
import { loadSpotsAction } from '../../../modules/spotModule';

const EditListContainer = () => {
    const dispatch = useDispatch();
    const { planner, plannerError, spots, plan, currentInfo, plannerData, map } = useSelector(({ plannerReducer, spotReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
        spots: spotReducer.spots,
        currentInfo: spotReducer.currentInfo,
        // spots: plannerReducer.spots,
        plan: plannerReducer.plan,
        plannerData: plannerReducer.plannerData,
        map: plannerReducer.map,
    }));

    const onChangePlanLocation = (location) => {
        dispatch(changePlanLocationAction(location));
    };

    const { plannerId, planId } = { ...plannerData };

    const onCreateLocation = (spot) => {
        const { title, contentid, firstimage, firstimage2, addr1, mapx, mapy } = spot;
        const locationContentId = contentid;
        const locationImage = firstimage !== '' ? firstimage : firstimage2;
        const locationTransportation = 1;
        const locationName = title;
        const locationAddr = addr1;
        const locationMapx = mapx;
        const locationMapy = mapy;

        dispatch(createLocationAction({ plannerId, locationName, locationContentId, locationImage, locationAddr, locationMapx, locationMapy, locationTransportation, planId }));
    };

    // 선택한 여행지로 지도 시점 이동
    const onMoveMarker = (spotData) => {
        // const { mapx, mapy } = spotData;
        // let moveLatLon = new window.kakao.maps.LatLng(mapy, mapx);
        // // 해당 마커로 이동
        // map.panTo(moveLatLon);
    };

    // 여행지 불러오기
    const { areaNum, pageNum } = currentInfo;
    useEffect(() => {
        dispatch(loadSpotsAction(areaNum, pageNum));
    }, [dispatch, areaNum, pageNum]);

    return <EditList spots={spots} onChangePlanLocation={onChangePlanLocation} onCreateLocation={onCreateLocation} onMoveMarker={onMoveMarker} />;
};

export default EditListContainer;
