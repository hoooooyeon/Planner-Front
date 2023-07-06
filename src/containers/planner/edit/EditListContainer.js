import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditList from '../../../components/planner/edit/EditList';
import { changeKeywordAction, changePageNumAction, changePlanLocationAction, changeResultKeywordAction, createLocationAction } from '../../../modules/plannerModule';
import {
    loadDetailSpotAction,
    loadSpotsAction,
    unloadDetailSpotAction,
    changeContentTypeIdAction,
    changeDetailSpotAction,
    changeAreaIndexAction,
    loadAreasAction,
    searchSpotAction,
    resetSpotsAction,
    resetSpotDataAction,
} from '../../../modules/spotModule';
import { loadLikeListAction, resetLikeListAction } from '../../../modules/ProfileModule';

const EditListContainer = () => {
    const dispatch = useDispatch();
    const { planner, plannerError, spots, account, keyword, areas, spotData, plannerData, detail, contentTypeList, likeList } = useSelector(({ plannerReducer, spotReducer, profileReducer, authReducer }) => ({
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
        likeList: profileReducer.likeList,
    }));

    const { plannerId, planId, pageNum } = { ...plannerData };

    const onCreateLocation = (spot) => {
        const { title, contentId, firstImage, firstImage2, addr1, mapx, mapy } = spot;
        const locationContentId = contentId;
        const locationImage = firstImage !== '' ? firstImage : firstImage2;
        const locationTransportation = 1;
        const locationName = title;
        const locationAddr = addr1;
        const locationMapx = mapx;
        const locationMapy = mapy;

        dispatch(createLocationAction({ plannerId, locationName, locationContentId, locationImage, locationAddr, locationMapx, locationMapy, locationTransportation, planId }));
    };

    const { areaIndex, contentTypeId } = { ...spotData };
    const { accountId } = { ...account };
    const { curKeyword, resultKeyword } = { ...keyword };

    // 여행지 불러오기
    useEffect(() => {
        if (contentTypeId !== 0) {
            const pageIndex = pageNum;
            dispatch(resetLikeListAction());
            dispatch(loadSpotsAction({ areaIndex, contentTypeId, pageIndex }));
        }
    }, [dispatch, areaIndex, pageNum, contentTypeId]);

    // 여행지 상세정보 불러오기
    const onOpenDetail = (spot) => {
        dispatch(loadDetailSpotAction(spot.contentid));
        dispatch(changeDetailSpotAction(spot));
    };

    // 여행지 상세정보 모달 닫기
    const onCloseDetail = () => {
        dispatch(unloadDetailSpotAction());
    };

    // 여행지 타입 변경
    const onChangeContentTypeId = (id) => {
        dispatch(changeContentTypeIdAction(id));
        dispatch(changeKeywordAction(''));
        dispatch(changeResultKeywordAction(''));
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
        dispatch(changeResultKeywordAction(curKeyword));
    };

    // 여행지 키워드로 조회
    useEffect(() => {
        if (resultKeyword.length !== 0) {
            const pageIndex = pageNum;
            const keyword = resultKeyword;
            dispatch(searchSpotAction({ areaIndex, contentTypeId, keyword, pageIndex }));
        }
    }, [dispatch, resultKeyword]);

    // 좋아요여행지리스트
    const [likeKeyword, setLikeKeyword] = useState('');
    const onChangeLikeKeyword = () => {
        setLikeKeyword(curKeyword);
    };

    const itemCount = 10;
    const sortCriteria = 2;
    const postType = 2;
    useEffect(() => {
        if (likeKeyword.length !== 0 || contentTypeId === 0) {
            const keyword = likeKeyword;
            dispatch(resetSpotsAction());
            dispatch(loadLikeListAction({ accountId, itemCount, sortCriteria, keyword, postType, pageNum }));
        }
    }, [dispatch, likeKeyword, contentTypeId, pageNum]);

    // 검색 키워드 초기화
    useEffect(() => {
        dispatch(changeKeywordAction(''));
        dispatch(changeResultKeywordAction(''));
        dispatch(resetSpotDataAction());
        dispatch(resetSpotsAction());
    }, [dispatch]);

    // 뿌려줄 페이지 배열
    const [pageArr, setPageArr] = useState([]);
    // 페이지의 10단위
    const [block, setBlock] = useState(0);
    // 보여질 페이지네이션의 개수
    const limitIndex = 10;
    // 마지막 페이지
    const maxPage = useRef();
    // const { totalCount } = { ...spots };
    // maxPage.current = Math.ceil(totalCount / limitIndex);

    // 현재 페이지
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (spots) {
            const { totalCount } = { ...spots };
            maxPage.current = Math.ceil(totalCount / limitIndex);
        }
        if (likeList) {
            const { totalCount } = { ...likeList };
            maxPage.current = Math.ceil(totalCount / limitIndex);
        }
    }, [likeList, spots]);

    // 페이지네이션 배열 생성 함수
    useEffect(() => {
        if (maxPage.current) {
            const arr = Array.from({ length: maxPage.current }, (_, i) => i + 1);

            setPageArr(arr.slice(limitIndex * block, limitIndex * (block + 1)));
        }
    }, [block, maxPage.current]);

    useEffect(() => {
        if (pageNum === 1) {
            setBlock(0);
        } else if (pageNum === maxPage.current) {
            setBlock(Math.ceil(maxPage.current / limitIndex - 1));
        }
    }, [pageNum, maxPage]);

    const onIndexPage = (index) => {
        setPage(index);
    };
    const onNextPage = () => {
        if (!(page === maxPage.current)) {
            setPage((index) => index + 1);
            if (pageNum % limitIndex === 0) {
                setBlock((block) => block + 1);
            }
        }
    };
    const onPreviousPage = () => {
        if (!(page === 1)) {
            setPage((index) => index - 1);
            if (page % limitIndex === 1) {
                setBlock((block) => block - 1);
            }
        }
    };
    const onFirstPage = () => {
        setPage(1);
    };
    const onLastPage = () => {
        setPage(maxPage.current);
    };

    useEffect(() => {
        dispatch(changePageNumAction(page));
    }, [page, dispatch]);

    return (
        <EditList
            spots={spots}
            areas={areas}
            keyword={keyword}
            detail={detail}
            spotData={spotData}
            contentTypeList={contentTypeList}
            pageArr={pageArr}
            likeList={likeList}
            likeKeyword={likeKeyword}
            onCreateLocation={onCreateLocation}
            onOpenDetail={onOpenDetail}
            onCloseDetail={onCloseDetail}
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
        />
    );
};

export default EditListContainer;