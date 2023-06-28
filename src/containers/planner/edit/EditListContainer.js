import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditList from '../../../components/planner/edit/EditList';
import { changeKeywordAction, changePageNumAction, changePlanLocationAction, changeResultKeywordAction, createLocationAction } from '../../../modules/plannerModule';
import { loadDetailSpotAction, loadSpotsAction, unloadDetailSpotAction, changeContentTypeIdAction, changeDetailSpotAction, changeAreaIndexAction, loadAreasAction, searchSpotAction } from '../../../modules/spotModule';
import * as common from '../../../lib/utils/CommonFunction';
import { loadLikeListAction } from '../../../modules/ProfileModule';

const EditListContainer = () => {
    const dispatch = useDispatch();
    const { plannerError, spots, account, keyword, areas, spotData, plannerData, detail, map, contentTypeList, likeList } = useSelector(({ plannerReducer, spotReducer, profileReducer, authReducer }) => ({
        account: authReducer.account,
        plannerError: plannerReducer.plannerError,
        spots: spotReducer.spots,
        areas: spotReducer.areas,
        keyword: plannerReducer.keyword,
        spotData: spotReducer.spotData,
        detail: spotReducer.detail,
        plannerData: plannerReducer.plannerData,
        map: plannerReducer.map,
        contentTypeList: spotReducer.contentTypeList,
        likeList: profileReducer.likeList,
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

    // 여행지 불러오기
    const { areaIndex, pageIndex, contentTypeId } = { ...spotData };
    const [menuIndex, setMenuIndex] = useState(0);

    const onChangeMenuIndex = (index) => {
        setMenuIndex(index);
    };

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

    const onChangeContentTypeId = (id) => {
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

    const { curKeyword, resultKeyword } = { ...keyword };
    // 여행지 키워드 입력
    const onChangeCurKeyword = (keyword) => {
        dispatch(changeKeywordAction(keyword));
    };

    // 여행지 검색
    const onChangeResultKeyword = () => {
        dispatch(changeResultKeywordAction(curKeyword));
    };

    useEffect(() => {
        if (resultKeyword.length !== 0) {
            const keyword = resultKeyword;
            dispatch(searchSpotAction({ areaIndex, contentTypeId, keyword, pageIndex }));
        }
    }, [resultKeyword]);

    const [likeKeyword, setLikeKeyword] = useState('');
    const { accountId } = { ...account };

    const onChangeLikeKeyword = () => {
        setLikeKeyword(curKeyword);
    };

    useEffect(() => {
        const itemCount = 12;
        const sortCriteria = 2;
        const postType = 2;
        const keyword = likeKeyword;

        dispatch(loadLikeListAction({ accountId, itemCount, sortCriteria, keyword, postType, pageNum }));
    }, [likeKeyword]);

    const { totalCount } = { ...spots };
    const { pageLastIndex } = { ...likeList };
    const { pageNum } = { ...plannerData };

    // 뿌려줄 페이지 배열
    const [pageArr, setPageArr] = useState([]);
    // 페이지의 10단위
    const [block, setBlock] = useState(0);
    // 보여질 페이지네이션의 개수
    const limitIndex = 10;
    // 마지막 페이지
    const maxPage = useRef();
    // const maxPage = Math.ceil(totalCount / limitIndex);

    // 현재 페이지
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (spots) {
            maxPage.current = Math.ceil(totalCount / limitIndex);
        }
        if (likeList) {
            maxPage.current = pageLastIndex;
        }
    });

    // 페이지네이션 배열 생성 함수
    useEffect(() => {
        const arr = Array.from({ length: maxPage }, (_, i) => i + 1);

        setPageArr(arr.slice(limitIndex * block, limitIndex * (block + 1)));
    }, [block, maxPage]);

    useEffect(() => {
        if (pageNum === 1) {
            setBlock(0);
        } else if (pageNum === maxPage) {
            setBlock(Math.ceil(maxPage / limitIndex - 1));
        }
    }, [pageNum, maxPage]);

    const onIndexPage = (index) => {
        setPage(index);
    };
    const onNextPage = () => {
        if (!(page === maxPage)) {
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
        setPage(maxPage);
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
            likeKeyword={likeKeyword}
            onChangePlanLocation={onChangePlanLocation}
            onCreateLocation={onCreateLocation}
            onOpenDetail={onOpenDetail}
            onCloseDetail={onCloseDetail}
            onChangeContentTypeId={onChangeContentTypeId}
            menuIndex={menuIndex}
            onChangeMenuIndex={onChangeMenuIndex}
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
