import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditList from '../../../components/planner/edit/EditList';
import { removeSpaceText } from '../../../lib/utils/spaceRemove';
import {
    accountLikeSpotListLoadAction,
    ACCOUNT_LIKE_SPOT_LIST_LOAD_TYPE,
    changeFieldAction,
    initializeAction,
    initializeFormAction,
} from '../../../modules/accountModule';
import {
    changeMapDataAction,
    changePlannerDataAction,
    changePlannerFieldAction,
    createLocationAction,
    plannerInitializePropertyAction,
} from '../../../modules/plannerModule';
import {
    loadDetailSpotAction,
    loadSpotsAction,
    changeDetailSpotAction,
    loadAreasAction,
    searchSpotAction,
    LOAD_AREAS_TYPE,
    LOAD_SPOTS_TYPE,
    SEARCH_SPOT_TYPE,
    spotInitializeFormAction,
    spotInitializeAction,
    changeSpotDataAction,
} from '../../../modules/spotModule';

const EditListContainer = () => {
    const dispatch = useDispatch();
    const {
        planner,
        spots,
        account,
        keywordData,
        areas,
        spotData,
        plannerData,
        detail,
        contentTypeList,
        likeList,
        loading,
        mapData,
    } = useSelector(({ plannerReducer, spotReducer, accountReducer, authReducer, loadingReducer }) => ({
        account: authReducer.account,
        planner: plannerReducer.planner,
        plannerData: plannerReducer.plannerData,
        keywordData: plannerReducer.keywordData,
        mapData: plannerReducer.mapData,
        spots: spotReducer.spots,
        areas: spotReducer.areas,
        spotData: spotReducer.spotData,
        detail: spotReducer.detail,
        contentTypeList: spotReducer.contentTypeList,
        likeList: accountReducer.likeList,
        loading: {
            areasLoading: loadingReducer[LOAD_AREAS_TYPE],
            spotLoading: loadingReducer[LOAD_SPOTS_TYPE],
            searchSpotLoading: loadingReducer[SEARCH_SPOT_TYPE],
            likeSpotLoading: loadingReducer[ACCOUNT_LIKE_SPOT_LIST_LOAD_TYPE],
        },
    }));

    const { plannerId, planId } = { ...plannerData };
    const { accountId } = { ...account };
    const { areaCode, contentTypeId, contentId } = { ...spotData };
    const { curKeyword, resultKeyword } = { ...keywordData };
    const { likeSpotList } = { ...likeList };
    const numOfRows = 12;
    const { navList } = { ...mapData };

    // 로케이션 추가
    const onCreateLocation = (spot) => {
        if (accountId === planner.accountId) {
            const { title, contentId, firstImage, firstImage2, addr1, mapx, mapy } = spot;

            const queryString = {
                plannerId,
                locationName: title,
                locationContentId: contentId,
                locationImage: firstImage !== '' ? firstImage : firstImage2,
                locationAddr: addr1,
                locationMapx: mapx,
                locationMapy: mapy,
                locationTransportation: 1,
                planId,
            };

            dispatch(createLocationAction(queryString));
        }
    };

    // 여행지 불러오기
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (contentTypeId !== 0 && areas.length > 0 && resultKeyword.length === 0) {
            const queryString = { areaCode, contentTypeId, pageNo: page, numOfRows };
            dispatch(initializeFormAction('likeList'));
            // dispatch(spotInitializeFormAction('spots'));
            dispatch(loadSpotsAction(queryString));
        }
    }, [dispatch, areaCode, page, contentTypeId, resultKeyword, areas]);

    // 여행지 상세정보 모달 열기
    const onOpenDetail = (spotInfo) => {
        dispatch(changeDetailSpotAction(spotInfo));
        dispatch(changeSpotDataAction({ property: 'contentId', value: spotInfo.contentId }));
    };

    // 여행지 상세정보 로드
    useEffect(() => {
        if (contentId !== '') {
            dispatch(loadDetailSpotAction({ contentId }));
        }
    }, [dispatch, contentId, spotData]);

    // 여행지 타입 변경
    const onChangeContentTypeId = (id) => {
        dispatch(changeSpotDataAction({ property: 'contentTypeId', value: id }));
    };

    // 지역 리스트 로드
    useEffect(() => {
        dispatch(loadAreasAction());
    }, [dispatch]);

    // 지역 선택
    const onChangeAreaIndex = (area) => {
        if (contentTypeId == 0) {
            dispatch(changeFieldAction({ form: 'likeList', name: 'areaCode', value: area.code }));
        } else {
            dispatch(changeSpotDataAction({ property: 'areaCode', value: area.code }));
        }
    };

    // 플래너 키워드 타이핑
    const onChangeField = (e) => {
        const { name, value } = e.target;
        dispatch(changePlannerFieldAction({ form: 'keywordData', name: name, value: value }));
    };
    // 실제적으로 검색된 키워드 저장
    const handleSearchPlanner = () => {
        const keyword = removeSpaceText(curKeyword);
        dispatch(changePlannerFieldAction({ form: 'keywordData', name: 'resultKeyword', value: keyword }));
    };

    const handleCleanKeyword = () => {
        dispatch(changePlannerFieldAction({ form: 'keywordData', name: 'curKeyword', value: '' }));
    };

    // 여행지 키워드로 조회
    useEffect(() => {
        if (resultKeyword.length !== 0) {
            // dispatch(spotInitializeFormAction('spots'));
            const queryString = { areaCode, contentTypeId, keyword: resultKeyword, pageNo: page, numOfRows };
            dispatch(searchSpotAction(queryString));
        }
    }, [dispatch, resultKeyword, page]);

    // 여행지 좋아요리스트 로드
    useEffect(() => {
        if (accountId && contentTypeId === 0) {
            const { areaCode } = { ...likeList };
            const queryString = {
                accountId,
                itemCount: 12,
                sortCriteria: 2,
                keyword: resultKeyword,
                postType: 2,
                pageNum: page,
                areaCode,
            };
            dispatch(spotInitializeFormAction('spots'));
            // dispatch(initializeFormAction('likeList'));
            dispatch(accountLikeSpotListLoadAction(queryString));
        }
    }, [dispatch, accountId, resultKeyword, contentTypeId, page, detail.likeState, likeList.areaCode]);

    // 여행 정보 및 검색 키워드 초기화
    useEffect(() => {
        return () => {
            dispatch(plannerInitializePropertyAction('keywordData'));
            dispatch(initializeAction());
            dispatch(spotInitializeAction());
            dispatch(plannerInitializePropertyAction('plannerError'));
            dispatch(plannerInitializePropertyAction('mapData'));
        };
    }, []);

    const totalCount = useRef();

    useEffect(() => {
        if (Object.keys(spots).length > 0) {
            totalCount.current = spots.totalCount;
        }
        if (Object.keys(likeSpotList).length > 0) {
            totalCount.current = likeSpotList.totalCount;
        }
    }, [likeSpotList, spots, detail.likeState]);

    const onIndexPage = (index) => {
        setPage(index);
    };
    const onNextPage = () => {
        setPage((page) => page + 1);
    };
    const onPreviousPage = () => {
        setPage((page) => page - 1);
    };
    const onFirstPage = (startPage) => {
        setPage(startPage);
    };
    const onLastPage = (maxPage) => {
        setPage(maxPage);
    };

    // 지역, 컨텐츠 변경시 키워드 리셋.
    useEffect(() => {
        setPage(1);
        dispatch(plannerInitializePropertyAction('keywordData'));
    }, [spotData.areaCode, likeList.areaCode, contentTypeId]);

    // 키워드 검색시 페이지 리셋.
    useEffect(() => {
        setPage(1);
    }, [resultKeyword]);

    // 현재 일정 루트 보기
    const onClickDateSchedule = () => {
        dispatch(changeMapDataAction({ property: 'allSchedule', value: false }));
    };

    // window navList toggle
    const onToggleWindowNavList = (bool) => {
        dispatch(changeMapDataAction({ property: 'navList', value: bool }));
    };

    useEffect(() => {
        dispatch(changePlannerDataAction({ property: 'pType', value: '' }));
    }, []);

    return (
        <EditList
            plannerData={plannerData}
            spots={spots}
            areas={areas}
            keywordData={keywordData}
            loading={loading}
            spotData={spotData}
            navList={navList}
            contentTypeList={contentTypeList}
            likeList={likeList}
            totalCount={totalCount.current}
            page={page}
            itemIndex={numOfRows}
            onCreateLocation={onCreateLocation}
            onOpenDetail={onOpenDetail}
            onChangeContentTypeId={onChangeContentTypeId}
            onIndexPage={onIndexPage}
            onPreviousPage={onPreviousPage}
            onNextPage={onNextPage}
            onFirstPage={onFirstPage}
            onLastPage={onLastPage}
            onChangeAreaIndex={onChangeAreaIndex}
            onChangeField={onChangeField}
            onClickSearch={handleSearchPlanner}
            handleCleanKeyword={handleCleanKeyword}
            onClickDateSchedule={onClickDateSchedule}
            onToggleWindowNavList={onToggleWindowNavList}
        />
    );
};

export default EditListContainer;
