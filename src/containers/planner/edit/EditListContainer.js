import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditList from '../../../components/planner/edit/EditList';
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
import { profileLikeSpotLoadAction, resetLikeListAction } from '../../../modules/profileModule';

const EditListContainer = () => {
    const dispatch = useDispatch();
    const {
        planner,
        plannerError,
        spots,
        account,
        keyword,
        areas,
        spotData,
        plannerData,
        detail,
        contentTypeList,
        likeSpots,
    } = useSelector(({ plannerReducer, spotReducer, profileReducer, authReducer }) => ({
        account: authReducer.account,
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
        spots: spotReducer.spots,
        areas: spotReducer.areas,
        keyword: plannerReducer.keyword,
        spotData: spotReducer.spotData,
        detail: spotReducer.detail,
        plannerData: plannerReducer.plannerData,
        contentTypeList: spotReducer.contentTypeList,
        likeSpots: profileReducer.likeSpots,
    }));

    const { plannerId, planId, pageNum } = { ...plannerData };
    const { creator } = { ...planner };
    const { accountId, nickname } = { ...account };
    const { areaCode, contentTypeId, contentId } = { ...spotData };
    const { curKeyword, resultKeyword } = { ...keyword };
    const numOfRows = 12;

    const onCreateLocation = (spot) => {
        if (accountId && creator === nickname) {
            if (!planId) {
                alert('일정을 선택하세요.');
                return;
            }

            const { title, contentId, firstImage, firstImage2, addr1, mapx, mapy } = spot;
            const locationContentId = contentId;
            const locationImage = firstImage !== '' ? firstImage : firstImage2;
            const locationTransportation = 1;
            const locationName = title;
            const locationAddr = addr1;
            const locationMapx = mapx;
            const locationMapy = mapy;

            dispatch(
                createLocationAction({
                    plannerId,
                    locationName,
                    locationContentId,
                    locationImage,
                    locationAddr,
                    locationMapx,
                    locationMapy,
                    locationTransportation,
                    planId,
                }),
            );
        }
    };

    // 여행지 불러오기
    useEffect(() => {
        if (contentTypeId !== 0 && areas && resultKeyword.length === 0) {
            const pageNo = pageNum;
            dispatch(resetLikeListAction());
            dispatch(loadSpotsAction({ areaCode, contentTypeId, pageNo, numOfRows }));
        }
    }, [dispatch, areaCode, pageNum, contentTypeId, resultKeyword, areas]);

    // 여행지 상세정보 불러오기
    const onOpenDetail = (spot) => {
        dispatch(changeDetailSpotAction(spot));
        dispatch(changeContentIdAction(spot.contentId));
    };

    useEffect(() => {
        if (contentId) {
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

    // 여행지 키워드 입력
    const onChangeCurKeyword = (keyword) => {
        dispatch(changeKeywordAction(keyword));
    };

    // 여행지 검색
    const onChangeResultKeyword = () => {
        if (curKeyword.length !== 0) {
            dispatch(changeResultKeywordAction(curKeyword));
        }
    };

    // 여행지 키워드로 조회
    useEffect(() => {
        if (resultKeyword.length !== 0) {
            const curKeyword = resultKeyword;
            const pageNo = pageNum;
            dispatch(searchSpotAction({ areaCode, contentTypeId, curKeyword, pageNo, numOfRows }));
        }
    }, [dispatch, resultKeyword, pageNum]);

    // 좋아요여행지리스트
    const [likeKeyword, setLikeKeyword] = useState('');
    const onChangeLikeKeyword = () => {
        setLikeKeyword(curKeyword);
    };

    const itemCount = 12;
    const sortCriteria = 2;
    const postType = 2;
    useEffect(() => {
        if ((accountId && likeKeyword.length !== 0) || contentTypeId === 0) {
            const keyword = likeKeyword;
            dispatch(resetSpotsAction());
            dispatch(profileLikeSpotLoadAction({ accountId, itemCount, sortCriteria, keyword, postType, pageNum }));
        }
    }, [dispatch, likeKeyword, contentTypeId, pageNum]);

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

    // 현재 페이지
    const [page, setPage] = useState(1);
    const totalCount = useRef();

    useEffect(() => {
        if (spots) {
            totalCount.current = spots.totalCount;
        }
        if (likeSpots) {
            totalCount.current = likeSpots.totalCount;
        }
    }, [likeSpots, spots]);

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

    useEffect(() => {
        setPage(1);
        dispatch(changeKeywordAction(''));
        dispatch(changeResultKeywordAction(''));
        setLikeKeyword('');
    }, [areaCode, contentTypeId]);

    useEffect(() => {
        setPage(1);
    }, [resultKeyword, likeKeyword]);

    const onClickDateSchedule = () => {
        dispatch(changeAllScheduleAction(false));
    };

    if (!planner || nickname !== creator) {
        return null;
    }
    return (
        <EditList
            spots={spots}
            areas={areas}
            keyword={keyword}
            detail={detail}
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
