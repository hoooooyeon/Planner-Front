import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditList from '../../../components/planner/edit/EditList';
import { changePlanLocationAction, createLocationAction } from '../../../modules/plannerModule';
import {
    loadDetailSpotAction,
    loadSpotsAction,
    unloadDetailSpotAction,
    changeContentTypeIdAction,
    changeDetailSpotAction,
    changePageIndexAction,
    changeAreaIndexAction,
    loadAreasAction,
    changeKeywordAction,
    resetKeywordAction,
    searchSpotAction,
} from '../../../modules/spotModule';
import * as common from '../../../lib/utils/CommonFunction';

const EditListContainer = () => {
    const dispatch = useDispatch();
    const { planner, plannerError, spots, plan, keyword, areas, spotData, plannerData, detail, map, contentTypeList } = useSelector(({ plannerReducer, spotReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
        spots: spotReducer.spots,
        areas: spotReducer.areas,
        keyword: spotReducer.keyword,
        spotData: spotReducer.spotData,
        detail: spotReducer.detail,
        plan: plannerReducer.plan,
        plannerData: plannerReducer.plannerData,
        map: plannerReducer.map,
        contentTypeList: spotReducer.contentTypeList,
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
    const { areaIndex, pageIndex, contentTypeId } = { ...spotData };
    useEffect(() => {
        dispatch(loadSpotsAction({ areaIndex, contentTypeId, pageIndex }));
    }, [dispatch, areaIndex, pageIndex, contentTypeId]);

    // 여행지 상세정보 불러오기
    const onOpenDetail = (spot) => {
        dispatch(loadDetailSpotAction(spot.contentid));
        dispatch(changeDetailSpotAction(spot));
    };

    // 여행지 상세정보 모달 닫기
    const onCloseDetail = () => {
        dispatch(unloadDetailSpotAction());
    };

    const onUchangeContentTypeId = (id) => {
        dispatch(changeContentTypeIdAction(id));
    };

    // 지역 리스트 로드
    useEffect(() => {
        dispatch(loadAreasAction());
    }, [dispatch]);

    // 지역 선택 함수
    const onChangeAreaIndex = (num) => {
        dispatch(changeAreaIndexAction(num));
    };

    const [searchResultText, setSearchResultText] = useState('');
    // 여행지 키워드 입력
    const onChangeKeyword = (keyword) => {
        dispatch(changeKeywordAction(keyword));
    };

    const onResetKeyword = () => {
        dispatch(resetKeywordAction());
    };
    // 여행지 검색
    const onSearchSpot = () => {
        dispatch(searchSpotAction({ areaIndex, contentTypeId, keyword, pageIndex }));
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
    const onChangePageIndex = (pageIndex) => {
        dispatch(changePageIndexAction(pageIndex));
    };

    const prevPage = () => {
        common.prevPage(pageIndex, onChangePageIndex, setBlock, count);
    };

    const nextPage = () => {
        common.nextPage(pageIndex, pageLastIndex, onChangePageIndex, count, setBlock);
    };

    const firstPage = () => {
        common.firstPage(onChangePageIndex, setBlock);
    };

    const lastPage = () => {
        common.lastPage(onChangePageIndex, pageLastIndex, setBlock, count);
    };

    return (
        <EditList
            spots={spots}
            areas={areas}
            keyword={keyword}
            detail={detail}
            spotData={spotData}
            contentTypeList={contentTypeList}
            pageArr={pageArr}
            searchResultText={searchResultText}
            onChangePlanLocation={onChangePlanLocation}
            onCreateLocation={onCreateLocation}
            onMoveMarker={onMoveMarker}
            onOpenDetail={onOpenDetail}
            onCloseDetail={onCloseDetail}
            onUchangeContentTypeId={onUchangeContentTypeId}
            onChangePageIndex={onChangePageIndex}
            prevPage={prevPage}
            nextPage={nextPage}
            firstPage={firstPage}
            lastPage={lastPage}
            onChangeAreaIndex={onChangeAreaIndex}
            onResetKeyword={onResetKeyword}
            onChangeKeyword={onChangeKeyword}
            onSearchSpot={onSearchSpot}
        />
    );
};

export default EditListContainer;
