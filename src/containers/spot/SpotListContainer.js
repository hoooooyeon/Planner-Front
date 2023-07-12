import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
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
    const { areaCode, pageNo, contentTypeId, contentId } = { ...spotData };

    // 지역 가져오기
    useEffect(() => {
        loadAreas();
    }, [loadAreas]);

    const numOfRows = 12;
    // 여행지 가져오기
    useEffect(() => {
        if (areas) {
            loadSpots({ areaCode, contentTypeId, pageNo, numOfRows });
        }
    }, [loadSpots, areaCode, pageNo, areas, contentTypeId, spotData]);

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
            loadDetailSpot({ contentId });
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

    const [curKeyword, setCurKeyword] = useState('');
    const [resultKeyword, setResultKeyword] = useState('');
    // 여행지 키워드로 검색
    const onChangeCurKeyword = (keyword) => {
        setCurKeyword(keyword);
    };
    const onChangeResultKeyword = () => {
        if (curKeyword.lenght !== 0) {
            setResultKeyword(curKeyword);
        }
    };

    useEffect(() => {
        if (resultKeyword.length !== 0) {
            const pageNo = 1;
            searchSpot({ areaCode, contentTypeId, curKeyword, pageNo, numOfRows });
        }
    }, [resultKeyword]);

    const onChangeContentTypeId = (contentTypeId) => {
        changeContentTypeId(contentTypeId);
        setCurKeyword('');
        setResultKeyword('');
    };

    const sliderSpots = [
        {
            title: '광안리해수욕장',
            image: 'http://tong.visitkorea.or.kr/cms/resource/75/2648975_image2_1.jpg',
            overview: '(부산 관광지)',
        },
        {
            title: '강남',
            image: 'http://tong.visitkorea.or.kr/cms/resource/08/1984608_image2_1.jpg',
            overview: '(서울 관광지)',
        },
        {
            title: '한라산',
            image: 'http://tong.visitkorea.or.kr/cms/resource/99/2870099_image2_1.jpg',
            overview: '(제주도 관광지)',
        },
        {
            title: '광안리해수욕장',
            image: 'http://tong.visitkorea.or.kr/cms/resource/75/2648975_image2_1.jpg',
            overview: '(부산 관광지)',
        },
        {
            title: '강남',
            image: 'http://tong.visitkorea.or.kr/cms/resource/08/1984608_image2_1.jpg',
            overview: '(서울 관광지)',
        },
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
            onOpenDetail={onOpenDetail}
            onChangeCurKeyword={onChangeCurKeyword}
            onChangeResultKeyword={onChangeResultKeyword}
            onChangeContentTypeId={onChangeContentTypeId}
        />
    );
};

const mapStateToProps = (state) => ({
    areas: state.spotReducer.areas,
    spots: state.spotReducer.spots,
    detail: state.spotReducer.detail,
    account: state.authReducer.account,
    spotError: state.spotReducer.spotError,
    spotData: state.spotReducer.spotData,
    likeList: state.spotReducer.likeList,
    keyword: state.spotReducer.keyword,
    contentTypeList: state.spotReducer.contentTypeList,
    spotModal: state.spotReducer.spotModal,
});
const mapDispatchToProps = (dispatch) => ({
    loadAreas: () => {
        dispatch(loadAreasAction());
    },
    loadSpots: ({ areaCode, contentTypeId, pageNo, numOfRows }) => {
        dispatch(loadSpotsAction({ areaCode, contentTypeId, pageNo, numOfRows }));
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
    searchSpot: ({ areaCode, contentTypeId, curKeyword, pageNo, numOfRows }) => {
        dispatch(searchSpotAction({ areaCode, contentTypeId, curKeyword, pageNo, numOfRows }));
    },
    changeContentTypeId: (contentTypeId) => {
        dispatch(changeContentTypeIdAction(contentTypeId));
    },
    toggleSpotDetailModal: () => {
        dispatch(toggleSpotDetailModalAction());
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(SpotListContainer);
