import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import SpotList from '../../components/spot/SpotList';
import {
    addSpotLikeAction,
    resetSpotDataAction,
    resetLikeListAction,
    resetSpotsAction,
    loadAreasAction,
    loadDetailSpotAction,
    loadSpotsAction,
    removeSpotLikeAction,
    toggleDetailLikeAction,
    unloadDetailSpotAction,
    changeAreaIndexAction,
    changeBlockIndexAction,
    changeDetailSpotAction,
    changePageIndexAction,
    changeContentIdAction,
    changeSpotsLikeAction,
    changeKeywordAction,
    resetKeywordAction,
    searchSpotAction,
    changeContentTypeIdAction,
} from '../../modules/spotModule';

const SpotListContainer = ({
    areas,
    spots,
    spotError,
    detail,
    spotData,
    account,
    likeList,
    keyword,
    contentTypeList,
    loadAreas,
    loadSpots,
    loadDetailSpot,
    changeAreaIndex,
    changePageIndex,
    changeBlockIndex,
    addSpotLike,
    removeSpotLike,
    unloadDetailSpot,
    changeSpotsLike,
    resetSpots,
    resetLikeList,
    resetSpotData,
    toggleDetailLike,
    changeDetailSpot,
    changeKeyword,
    searchSpot,
    changeContentTypeId,
    changeContentId,
    resetKeyword,
}) => {
    const { areaIndex, pageIndex, contentTypeId } = spotData;

    // 지역 가져오기
    useEffect(() => {
        if (account) {
            loadAreas();
        }
    }, [loadAreas, account]);

    // 여행지 가져오기
    useEffect(() => {
        if (areas) {
            loadSpots({ areaIndex, contentTypeId, pageIndex });
        }
    }, [loadSpots, areaIndex, pageIndex, areas, contentTypeId, spotData]);

    // 여행지 상세정보 모달 열기
    const drag = useRef(false);
    const onOpenDetail = (spot) => {
        if (drag.current) {
            drag.current = false;
            return;
        }
        changeDetailSpot(spot);
        changeContentId(spot.contentid);
    };
    useEffect(() => {
        if (spotData.contentId) {
            const { contentId } = spotData;
            loadDetailSpot(contentId);
        }
    }, [loadDetailSpot, spotData]);

    // 여행지 첫페이지
    const onClickArea = (areaIndex) => {
        if (drag.current) {
            drag.current = false;
            return;
        }
        changeAreaIndex(areaIndex);
        changePageIndex(1);
        // changeBlockIndex(0);

        resetKeyword();
        setSearchResultText('');
    };

    // 여행지 초기화
    // useEffect(() => {
    //     resetSpots();
    // resetLikeList();
    // }, [areaIndex, pageIndex, resetSpots]);

    // 여행지 페이지에서 벗어날 때 정보 초기화
    useEffect(() => {
        return () => {
            resetSpots();
            // resetLikeList();
            resetSpotData();
        };
    }, [resetSpotData, resetSpots, resetLikeList]);

    // 여행지 좋아요 토글
    const onToggleSpotLike = (contentId) => {
        const { likeState } = detail;

        if (likeState === false) {
            addSpotLike({ contentId });
        } else {
            removeSpotLike({ contentId });
        }
    };

    // 좋아요리스트 초기화
    // 여행지 좋아요 토글 시, reseting 후 changespotslike
    // useEffect(() => {
    //     resetLikeList();
    // }, [resetLikeList, detail]);

    // 여행지 검색할 키워드 타이핑
    const onChangeKeyword = (keyword) => {
        changeKeyword(keyword);
    };
    const onResetKeyword = () => {
        resetKeyword();
    };

    const [searchResultText, setSearchResultText] = useState('');
    const onSearchSpot = () => {
        const pageIndex = 1;
        searchSpot({ areaIndex, contentTypeId, keyword, pageIndex });
        setSearchResultText(keyword);
    };

    const onChangeContentTypeId = (contentTypeId) => {
        changeContentTypeId(contentTypeId);
        resetKeyword();
        setSearchResultText('');
    };

    const sliderSpots = [
        { title: '광안리해수욕장', image: 'http://tong.visitkorea.or.kr/cms/resource/75/2648975_image2_1.jpg', overview: '(부산 관광지)' },
        { title: '강남', image: 'http://tong.visitkorea.or.kr/cms/resource/08/1984608_image2_1.jpg', overview: '(서울 관광지)' },
        { title: '한라산', image: 'http://tong.visitkorea.or.kr/cms/resource/99/2870099_image2_1.jpg', overview: '(제주도 관광지)' },
        { title: '광안리해수욕장', image: 'http://tong.visitkorea.or.kr/cms/resource/75/2648975_image2_1.jpg', overview: '(부산 관광지)' },
        { title: '강남', image: 'http://tong.visitkorea.or.kr/cms/resource/08/1984608_image2_1.jpg', overview: '(서울 관광지)' },
    ];

    return (
        <SpotList
            areas={areas}
            spots={spots}
            spotError={spotError}
            detail={detail}
            spotData={spotData}
            keyword={keyword}
            sliderSpots={sliderSpots}
            contentTypeList={contentTypeList}
            onClickArea={onClickArea}
            onUnloadDetailSpot={unloadDetailSpot}
            onToggleSpotLike={onToggleSpotLike}
            onOpenDetail={onOpenDetail}
            onChangeKeyword={onChangeKeyword}
            onResetKeyword={onResetKeyword}
            onSearchSpot={onSearchSpot}
            onChangeContentTypeId={onChangeContentTypeId}
            drag={drag}
            searchResultText={searchResultText}
        />
    );
};

const mapStateToProps = (state) => ({
    areas: state.spotReducer.areas,
    spots: state.spotReducer.spots,
    detail: state.spotReducer.detail,
    spotError: state.spotReducer.spotError,
    spotData: state.spotReducer.spotData,
    likeList: state.spotReducer.likeList,
    keyword: state.spotReducer.keyword,
    contentTypeList: state.spotReducer.contentTypeList,
    account: state.authReducer.account,
});
const mapDispatchToProps = (dispatch) => ({
    loadAreas: () => {
        dispatch(loadAreasAction());
    },
    loadSpots: (areaIndex, page) => {
        dispatch(loadSpotsAction(areaIndex, page));
    },
    changeAreaIndex: (index) => {
        dispatch(changeAreaIndexAction(index));
    },
    changePageIndex: (index) => {
        dispatch(changePageIndexAction(index));
    },
    changeBlockIndex: (index) => {
        dispatch(changeBlockIndexAction(index));
    },
    changeContentId: (id) => {
        dispatch(changeContentIdAction(id));
    },
    loadDetailSpot: (id) => {
        dispatch(loadDetailSpotAction(id));
    },
    changeDetailSpot: (spotInfo) => {
        dispatch(changeDetailSpotAction(spotInfo));
    },
    unloadDetailSpot: () => {
        dispatch(unloadDetailSpotAction());
    },
    addSpotLike: (spotId) => {
        dispatch(addSpotLikeAction(spotId));
    },
    removeSpotLike: (spotId) => {
        dispatch(removeSpotLikeAction(spotId));
    },
    changeSpotsLike: (likes) => {
        dispatch(changeSpotsLikeAction(likes));
    },
    toggleDetailLike: () => {
        dispatch(toggleDetailLikeAction());
    },
    resetSpots: () => {
        dispatch(resetSpotsAction());
    },
    resetLikeList: () => {
        dispatch(resetLikeListAction());
    },
    resetSpotData: () => {
        dispatch(resetSpotDataAction());
    },
    changeKeyword: (keyword) => {
        dispatch(changeKeywordAction(keyword));
    },
    resetKeyword: () => {
        dispatch(resetKeywordAction());
    },
    searchSpot: (areaIndex, contentTypeId, keyword, index) => {
        dispatch(searchSpotAction(areaIndex, contentTypeId, keyword, index));
    },
    changeContentTypeId: (contentTypeId) => {
        dispatch(changeContentTypeIdAction(contentTypeId));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(SpotListContainer);
