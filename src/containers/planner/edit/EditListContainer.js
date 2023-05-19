import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditList from '../../../components/planner/edit/EditList';
import { changePlanLocationAction, createLocationAction } from '../../../modules/plannerModule';
import { loadDetailSpotAction, loadSpotsAction, unloadDetailSpotAction, updateContentTypeIdAction, updateDetailSpotAction, updatePageNumAction } from '../../../modules/spotModule';
import * as common from '../../../lib/utils/CommonFunction';

const EditListContainer = () => {
    const dispatch = useDispatch();
    const { planner, plannerError, spots, plan, currentInfo, plannerData, detail, map } = useSelector(({ plannerReducer, spotReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
        spots: spotReducer.spots,
        currentInfo: spotReducer.currentInfo,
        detail: spotReducer.detail,
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
    const { areaNum, pageNum, contentTypeId } = { ...currentInfo };
    useEffect(() => {
        dispatch(loadSpotsAction(areaNum, contentTypeId, pageNum));
    }, [dispatch, areaNum, pageNum, contentTypeId]);

    // 여행지 상세정보 불러오기
    const onOpenDetail = (spot) => {
        dispatch(loadDetailSpotAction(spot.info.contentid));
        dispatch(updateDetailSpotAction(spot));
    };

    // 여행지 상세정보 모달 닫기
    const onCloseDetail = () => {
        dispatch(unloadDetailSpotAction());
    };

    const onUpdateContentTypeId = (id) => {
        dispatch(updateContentTypeIdAction(id));
    };

    const { totalCount } = { ...spots };
    // 뿌려줄 페이지 배열
    const [pageArr, setPageArr] = useState([]);
    // 보여질 페이지네이션의 개수 기준
    const [block, setBlock] = useState(0);
    // 보여질 페이지네이션의 개수
    const count = 5;
    // 보여질 아이템의 개수
    const itemCount = 10;
    // 마지막 페이지
    const pageLastIndex = Math.ceil(totalCount / itemCount);

    // // 뿌려줄 페이지네이션 배열 생성  함수
    useEffect(() => {
        if (spots) {
            common.creaetPageArr(pageLastIndex, setPageArr, count, block);
        }
    }, [pageLastIndex, count, block, spots]);

    // 페이지 버튼
    const onUpdatePageIndex = (pageIndex) => {
        dispatch(updatePageNumAction(pageIndex));
    };

    const prevPage = () => {
        common.prevPage(pageNum, onUpdatePageIndex, setBlock, count);
    };

    const nextPage = () => {
        common.nextPage(pageNum, pageLastIndex, onUpdatePageIndex);
    };

    const firstPage = () => {
        common.firstPage(onUpdatePageIndex, setBlock);
    };

    const lastPage = () => {
        common.lastPage(onUpdatePageIndex, pageLastIndex, setBlock, count);
    };

    return (
        <EditList
            spots={spots}
            detail={detail}
            onChangePlanLocation={onChangePlanLocation}
            onCreateLocation={onCreateLocation}
            onMoveMarker={onMoveMarker}
            onOpenDetail={onOpenDetail}
            onCloseDetail={onCloseDetail}
            onUpdateContentTypeId={onUpdateContentTypeId}
            pageArr={pageArr}
            onUpdatePageIndex={onUpdatePageIndex}
            prevPage={prevPage}
            nextPage={nextPage}
            firstPage={firstPage}
            lastPage={lastPage}
        />
    );
};

export default EditListContainer;
