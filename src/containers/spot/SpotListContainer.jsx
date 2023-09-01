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
    changeContentIdAction,
    searchSpotAction,
    changeContentTypeIdAction,
    resetDetailSpotAction,
    resetAreasAction,
    resetSpotErrorAction,
} from '../../modules/spotModule';

const SpotListContainer = ({
    areas,
    spots,
    spotError,
    spotModal,
    spotData,
    contentTypeList,
    loading,
    loadAreas,
    loadSpots,
    loadDetailSpot,
    changeAreaIndex,
    resetAreas,
    resetSpots,
    resetSpotData,
    changeDetailSpot,
    searchSpot,
    changeContentTypeId,
    changeContentId,
    resetDetailSpot,
    resetSpotError,
}) => {
    const { areaCode, pageNo, contentTypeId, contentId } = { ...spotData };
    const [curKeyword, setCurKeyword] = useState('');
    const [resultKeyword, setResultKeyword] = useState('');

    // 지역 가져오기
    useEffect(() => {
        loadAreas();
    }, [loadAreas]);

    // 여행지리스트 가져오기
    useEffect(() => {
        if (areas.length > 0 && resultKeyword === '') {
            resetSpots();
            const queryString = {
                areaCode,
                contentTypeId,
                pageNo,
                numOfRows: 12,
            };
            loadSpots(queryString);
        }
    }, [loadSpots, areaCode, resultKeyword, pageNo, areas, contentTypeId, spotData]);

    // 여행지 상세정보 모달 열기
    const drag = useRef(false);
    const onOpenDetail = (spotInfo) => {
        if (drag.current) {
            drag.current = true;
            return;
        }
        changeDetailSpot(spotInfo);
        changeContentId(spotInfo.contentId);
    };

    // 여행지 상세정보 로드
    useEffect(() => {
        if (contentId !== '') {
            loadDetailSpot({ contentId });
        }
    }, [loadDetailSpot, contentId, spotData]);

    // 지역  선택
    const onClickArea = (areaIndex) => {
        changeAreaIndex(areaIndex);
    };

    // 여행지 페이지에서 벗어날 때 정보 초기화
    useEffect(() => {
        return () => {
            resetAreas();
            resetSpots();
            resetSpotData();
            resetDetailSpot();
        };
    }, [resetSpotData, resetSpots, resetDetailSpot, resetAreas]);

    // 여행지 키워드 타이핑
    const onChangeCurKeyword = (keyword) => {
        setCurKeyword(keyword);
    };

    // 실제적으로 검색될 키워드 저장
    const onChangeResultKeyword = () => {
        if (curKeyword !== '') {
            setResultKeyword(curKeyword);
        }
    };

    // 여행지리스트 키워드로 검색
    useEffect(() => {
        if (resultKeyword !== '') {
            resetSpots();
            const queryString = {
                areaCode,
                contentTypeId,
                keyword: resultKeyword,
                pageNo,
                numOfRows: 12,
            };
            searchSpot(queryString);
        }
    }, [resultKeyword, pageNo]);

    // 키워드 리셋.
    useEffect(() => {
        setCurKeyword('');
        setResultKeyword('');
    }, [areaCode, contentTypeId]);

    // 여행지리스트 컨텐츠타입 변경.
    const onChangeContentTypeId = (contentTypeId) => {
        changeContentTypeId(contentTypeId);
    };

    // 지역, 컨텐츠타입, 키워드 변경시 페이지 리셋.
    useEffect(() => {
        changePageIndexAction(1);
    }, [areaCode, contentTypeId, resultKeyword]);

    // 여행지 슬라이더 배열.
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

    // spotError 리셋
    const onCloseError = () => {
        resetSpotError();
    };

    return (
        <SpotList
            areas={areas}
            spots={spots}
            spotModal={spotModal}
            spotData={spotData}
            spotError={spotError}
            sliderSpots={sliderSpots}
            drag={drag}
            curKeyword={curKeyword}
            loading={loading}
            resultKeyword={resultKeyword}
            contentTypeList={contentTypeList}
            onClickArea={onClickArea}
            onOpenDetail={onOpenDetail}
            onChangeCurKeyword={onChangeCurKeyword}
            onChangeResultKeyword={onChangeResultKeyword}
            onChangeContentTypeId={onChangeContentTypeId}
            onCloseError={onCloseError}
        />
    );
};

const mapStateToProps = (state) => ({
    areas: state.spotReducer.areas,
    spots: state.spotReducer.spots,
    spotError: state.spotReducer.spotError,
    spotData: state.spotReducer.spotData,
    contentTypeList: state.spotReducer.contentTypeList,
    spotModal: state.spotReducer.spotModal,
    loading: state.loadingReducer.loading,
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
    resetAreas: () => {
        dispatch(resetAreasAction());
    },
    resetSpots: () => {
        dispatch(resetSpotsAction());
    },
    resetSpotData: () => {
        dispatch(resetSpotDataAction());
    },
    searchSpot: ({ areaCode, contentTypeId, keyword, pageNo, numOfRows }) => {
        dispatch(searchSpotAction({ areaCode, contentTypeId, keyword, pageNo, numOfRows }));
    },
    changeContentTypeId: (contentTypeId) => {
        dispatch(changeContentTypeIdAction(contentTypeId));
    },
    resetDetailSpot: () => {
        dispatch(resetDetailSpotAction());
    },
    resetSpotError: () => {
        dispatch(resetSpotErrorAction());
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(SpotListContainer);
