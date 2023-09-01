import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditList from '../../../components/planner/edit/EditList';
import { accountLikeSpotListLoadAction, resetLikeSpotListAction } from '../../../modules/accountModule';
import {
    changeAllScheduleAction,
    changeKeywordAction,
    changePageNumAction,
    changeResultKeywordAction,
    createLocationAction,
} from '../../../modules/plannerModule';
import {
    loadDetailSpotAction,
    loadSpotsAction,
    resetDetailSpotAction,
    changeContentTypeIdAction,
    changeDetailSpotAction,
    changeAreaIndexAction,
    loadAreasAction,
    searchSpotAction,
    resetSpotsAction,
    resetSpotDataAction,
    changeContentIdAction,
} from '../../../modules/spotModule';

const EditListContainer = () => {
    const dispatch = useDispatch();
    const {
        planner,
        spots,
        account,
        keyword,
        areas,
        spotData,
        plannerData,
        detail,
        contentTypeList,
        likeList,
        loading,
    } = useSelector(({ plannerReducer, spotReducer, accountReducer, authReducer, loadingReducer }) => ({
        account: authReducer.account,
        planner: plannerReducer.planner,
        plannerData: plannerReducer.plannerData,
        keyword: plannerReducer.keyword,
        spots: spotReducer.spots,
        areas: spotReducer.areas,
        spotData: spotReducer.spotData,
        detail: spotReducer.detail,
        contentTypeList: spotReducer.contentTypeList,
        likeList: accountReducer.likeList,
        loading: loadingReducer.loading,
    }));

    const { plannerId, planId, pageNum } = { ...plannerData };
    const { accountId } = { ...account };
    const { areaCode, contentTypeId, contentId } = { ...spotData };
    const { curKeyword, resultKeyword } = { ...keyword };
    const { likeSpots } = { ...likeList };
    const numOfRows = 12;

    // 로케이션 추가
    const onCreateLocation = (spot) => {
        if (accountId === planner.accountId) {
            if (!planId) {
                alert('일정을 선택하세요.');
                return;
            }

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
    useEffect(() => {
        if (contentTypeId !== 0 && areas.length > 0 && resultKeyword.length === 0) {
            const queryString = { areaCode, contentTypeId, pageNo: pageNum, numOfRows };
            dispatch(resetLikeSpotListAction());
            dispatch(resetSpotsAction());
            dispatch(loadSpotsAction(queryString));
        }
    }, [dispatch, areaCode, pageNum, contentTypeId, resultKeyword, areas]);

    // 여행지 상세정보 모달 열기
    const onOpenDetail = (spotInfo) => {
        dispatch(changeDetailSpotAction(spotInfo));
        dispatch(changeContentIdAction(spotInfo.contentId));
    };

    // 여행지 상세정보 로드
    useEffect(() => {
        if (contentId !== '') {
            dispatch(loadDetailSpotAction({ contentId }));
        }
    }, [dispatch, contentId, spotData]);

    // 여행지 타입 변경
    const onChangeContentTypeId = (id) => {
        dispatch(changeContentTypeIdAction(id));
    };

    // 지역 리스트 로드
    useEffect(() => {
        dispatch(loadAreasAction());
    }, [dispatch]);

    // 지역 선택
    const onChangeAreaIndex = (num) => {
        dispatch(changeAreaIndexAction(num));
    };

    // 키워드 입력
    const onChangeCurKeyword = (keyword) => {
        dispatch(changeKeywordAction(keyword));
    };

    // 실제로 검색될 키워드 저장
    const onChangeResultKeyword = () => {
        if (curKeyword.length !== 0) {
            dispatch(changeResultKeywordAction(curKeyword));
        }
    };

    // 여행지 키워드로 조회
    useEffect(() => {
        if (resultKeyword.length !== 0) {
            dispatch(resetSpotsAction());
            const queryString = { areaCode, contentTypeId, keyword: resultKeyword, pageNo: pageNum, numOfRows };
            dispatch(searchSpotAction(queryString));
        }
    }, [dispatch, resultKeyword, pageNum]);

    // 여행지 좋아요리스트 검색 키워드 저장
    const [likeKeyword, setLikeKeyword] = useState('');
    const onChangeLikeKeyword = () => {
        setLikeKeyword(curKeyword);
    };

    // 여행지 좋아요리스트 로드
    useEffect(() => {
        if (accountId && contentTypeId === 0) {
            const queryString = {
                accountId,
                itemCount: 12,
                sortCriteria: 2,
                keyword: likeKeyword,
                postType: 2,
                pageNum,
            };
            dispatch(resetSpotsAction());
            dispatch(resetLikeSpotListAction());
            dispatch(accountLikeSpotListLoadAction(queryString));
        }
    }, [dispatch, accountId, likeKeyword, contentTypeId, pageNum, detail.likeState]);

    // 여행 정보 및 검색 키워드 초기화
    useEffect(() => {
        return () => {
            dispatch(changeKeywordAction(''));
            dispatch(changeResultKeywordAction(''));
            dispatch(resetSpotDataAction());
            dispatch(resetSpotsAction());
            dispatch(resetDetailSpotAction());
        };
    }, [dispatch]);

    const [page, setPage] = useState(1);
    const totalCount = useRef();

    useEffect(() => {
        if (Object.keys(spots).length > 0) {
            totalCount.current = spots.totalCount;
        }
        if (Object.keys(likeSpots).length > 0) {
            totalCount.current = likeSpots.totalCount;
        }
    }, [likeSpots, spots, detail.likeState]);

    const onIndexPage = (index) => {
        setPage(index);
    };
    const onNextPage = (maxPage) => {
        if (page < maxPage) {
            setPage((index) => index + 1);
        }
    };
    const onPreviousPage = () => {
        if (page > 1) {
            setPage((index) => index - 1);
        }
    };
    const onFirstPage = () => {
        setPage(1);
    };
    const onLastPage = (maxPage) => {
        setPage(maxPage);
    };

    useEffect(() => {
        dispatch(changePageNumAction(page));
    }, [page, dispatch]);

    // 지역, 컨텐츠 변경시 키워드 리셋.
    useEffect(() => {
        setPage(1);
        dispatch(changeKeywordAction(''));
        dispatch(changeResultKeywordAction(''));
        setLikeKeyword('');
    }, [areaCode, contentTypeId]);

    // 키워드 검색시 페이지 리셋.
    useEffect(() => {
        setPage(1);
    }, [resultKeyword, likeKeyword]);

    // 현재 일정 루트 보기
    const onClickDateSchedule = () => {
        dispatch(changeAllScheduleAction(false));
    };

    if (accountId !== planner.accountId) {
        return null;
    }
    return (
        <EditList
            spots={spots}
            areas={areas}
            keyword={keyword}
            loading={loading}
            spotData={spotData}
            contentTypeList={contentTypeList}
            likeSpots={likeSpots}
            likeKeyword={likeKeyword}
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
            onChangeCurKeyword={onChangeCurKeyword}
            onChangeResultKeyword={onChangeResultKeyword}
            onChangeLikeKeyword={onChangeLikeKeyword}
            onClickDateSchedule={onClickDateSchedule}
        />
    );
};

export default EditListContainer;
