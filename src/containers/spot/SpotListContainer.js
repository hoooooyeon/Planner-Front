import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import SpotList from '../../components/spot/SpotList';
import {
    addSpotLikeAction,
    resetSpotDataAction,
    resetSpotsAction,
    loadAreasAction,
    loadDetailSpotAction,
    loadSpotsAction,
    removeSpotLikeAction,
    changeAreaIndexAction,
    changeDetailSpotAction,
    changePageIndexAction,
    toggleSpotDetailModalAction,
    changeContentIdAction,
    searchSpotAction,
    changeContentTypeIdAction,
} from '../../modules/spotModule';

const SpotListContainer = ({
    areas,
    spots,
    spotError,
    detail,
    spotModal,
    spotData,
    account,
    contentTypeList,
    loadAreas,
    loadSpots,
    loadDetailSpot,
    changeAreaIndex,
    changePageIndex,
    addSpotLike,
    removeSpotLike,
    resetSpots,
    resetSpotData,
    changeDetailSpot,
    searchSpot,
    changeContentTypeId,
    changeContentId,
    toggleSpotDetailModal,
}) => {
    const { areaIndex, pageIndex, contentTypeId, contentId } = { ...spotData };

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
            drag.current = true;
            return;
        }
        changeDetailSpot(spot);
        changeContentId(spot.contentId);
        toggleSpotDetailModal();
    };
    useEffect(() => {
        if (contentId) {
            loadDetailSpot(contentId);
        }
    }, [loadDetailSpot, contentId, spotData]);

    // 지역  선택
    const onClickArea = (areaIndex) => {
        if (drag.current) {
            drag.current = false;
            return;
        }
        changeAreaIndex(areaIndex);
        changePageIndex(1);

        setCurKeyword('');
        setResultKeyword('');
    };

    // 여행지 페이지에서 벗어날 때 정보 초기화
    useEffect(() => {
        return () => {
            resetSpots();
            resetSpotData();
        };
    }, [resetSpotData, resetSpots]);

    // 여행지 좋아요 토글
    const onToggleSpotLike = (contentId) => {
        const { likeState } = detail;

        if (likeState === false) {
            addSpotLike({ contentId });
        } else {
            removeSpotLike({ contentId });
        }
    };

    // 여행지 검색할 키워드 타이핑
    const onChangeKeyword = (keyword) => {
        setCurKeyword(keyword);
    };

    const [curKeyword, setCurKeyword] = useState('');
    const [resultKeyword, setResultKeyword] = useState('');
    const onSearchSpot = () => {
        const pageIndex = 1;
        searchSpot({ areaIndex, contentTypeId, curKeyword, pageIndex });
        setResultKeyword(curKeyword);
    };

    const onChangeContentTypeId = (contentTypeId) => {
        changeContentTypeId(contentTypeId);
        setCurKeyword('');
        setResultKeyword('');
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
            spotModal={spotModal}
            spotData={spotData}
            sliderSpots={sliderSpots}
            drag={drag}
            curKeyword={curKeyword}
            resultKeyword={resultKeyword}
            contentTypeList={contentTypeList}
            onClickArea={onClickArea}
            onToggleSpotLike={onToggleSpotLike}
            onOpenDetail={onOpenDetail}
            onChangeKeyword={onChangeKeyword}
            onSearchSpot={onSearchSpot}
            onChangeContentTypeId={onChangeContentTypeId}
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
    spotModal: state.spotReducer.spotModal,
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
    changeContentId: (id) => {
        dispatch(changeContentIdAction(id));
    },
    loadDetailSpot: (id) => {
        dispatch(loadDetailSpotAction(id));
    },
    changeDetailSpot: (spotInfo) => {
        dispatch(changeDetailSpotAction(spotInfo));
    },
    addSpotLike: (spotId) => {
        dispatch(addSpotLikeAction(spotId));
    },
    removeSpotLike: (spotId) => {
        dispatch(removeSpotLikeAction(spotId));
    },
    resetSpots: () => {
        dispatch(resetSpotsAction());
    },
    resetSpotData: () => {
        dispatch(resetSpotDataAction());
    },
    searchSpot: (areaIndex, contentTypeId, keyword, index) => {
        dispatch(searchSpotAction(areaIndex, contentTypeId, keyword, index));
    },
    changeContentTypeId: (contentTypeId) => {
        dispatch(changeContentTypeIdAction(contentTypeId));
    },
    toggleSpotDetailModal: () => {
        dispatch(toggleSpotDetailModalAction());
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(SpotListContainer);
