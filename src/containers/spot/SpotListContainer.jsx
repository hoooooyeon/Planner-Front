import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import SpotList from '../../components/spot/SpotList';
import { removeSpaceText } from '../../lib/utils/spaceRemove';
import {
    addSpotLikeAction,
    loadAreasAction,
    loadDetailSpotAction,
    loadSpotsAction,
    removeSpotLikeAction,
    changeSpotDataAction,
    changeDetailSpotAction,
    searchSpotAction,
    LOAD_AREAS_TYPE,
    LOAD_SPOTS_TYPE,
    SEARCH_SPOT_TYPE,
    spotInitializeFormAction,
    spotInitializeAction,
} from '../../modules/spotModule';

const SpotListContainer = ({
    areas,
    spots,
    spotError,
    isLike,
    spotData,
    contentTypeList,
    loading,
    loadAreas,
    loadSpots,
    loadDetailSpot,
    changeSpotData,
    changeDetailSpot,
    searchSpot,
    initialize,
    initializeForm,
    spotValidateField,
}) => {
    const { areaCode, pageNo, contentTypeId, contentId } = { ...spotData };
    const [curKeyword, setCurKeyword] = useState('');
    const [resultKeyword, setResultKeyword] = useState('');

    // 지역 가져오기
    useEffect(() => {
        if (areas.length == 0) {
            loadAreas();
        }
    }, []);

    // 여행지리스트 가져오기
    useEffect(() => {
        if (areas.length > 0 && resultKeyword.length === 0) {
            initializeForm('spots');
            const queryString = {
                areaCode,
                contentTypeId,
                pageNo,
                numOfRows: 12,
            };
            loadSpots(queryString);
        }
    }, [loadSpots, areaCode, resultKeyword, pageNo, areas, contentTypeId]);

    // 여행지 상세정보 모달 열기
    const drag = useRef(false);
    const onOpenDetail = (spotInfo) => {
        if (drag.current) {
            drag.current = true;
            return;
        }
        changeDetailSpot(spotInfo);
        changeSpotData({ property: 'contentId', value: spotInfo.contentId });
    };

    // 여행지 상세정보 로드
    useEffect(() => {
        if (contentId !== '') {
            loadDetailSpot({ contentId });
        }
    }, [loadDetailSpot, contentId, isLike]);

    // 지역  선택
    const onClickArea = (area) => {
        changeSpotData({ property: 'areaCode', value: area.code });
    };

    // 여행지 페이지에서 벗어날 때 정보 초기화
    useEffect(() => {
        return () => {
            initialize();
        };
    }, []);

    // 여행지 키워드 타이핑
    const onChangeCurKeyword = (keyword) => {
        setCurKeyword(keyword);
    };

    // 실제적으로 검색될 키워드 저장
    const onChangeResultKeyword = () => {
        const keyword = removeSpaceText(curKeyword);
        setResultKeyword(keyword);
    };

    // 여행지리스트 키워드로 검색
    useEffect(() => {
        if (resultKeyword.length !== 0) {
            initializeForm('spots');
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
        changeSpotData({ property: 'contentTypeId', value: contentTypeId.code });
    };

    // 지역, 컨텐츠타입, 키워드 변경시 페이지 리셋.
    useEffect(() => {
        changeSpotData({ property: 'pageNo', value: 1 });
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
        initializeForm('spotError');
    };

    const onIndexPage = (index) => {
        changeSpotData({ property: 'pageNo', value: index });
    };
    const onNextPage = () => {
        changeSpotData({ property: 'pageNo', value: pageNo + 1 });
    };
    const onPreviousPage = () => {
        changeSpotData({ property: 'pageNo', value: pageNo - 1 });
    };
    const onFirstPage = (startPage) => {
        changeSpotData({ property: 'pageNo', value: startPage });
    };
    const onLastPage = (maxPage) => {
        changeSpotData({ property: 'pageNo', value: maxPage });
    };

    return (
        <SpotList
            areas={areas}
            spots={spots}
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
            onIndexPage={onIndexPage}
            onNextPage={onNextPage}
            onPreviousPage={onPreviousPage}
            onFirstPage={onFirstPage}
            onLastPage={onLastPage}
        />
    );
};

const mapStateToProps = (state) => ({
    areas: state.spotReducer.areas,
    spots: state.spotReducer.spots,
    spotError: state.spotReducer.spotError,
    spotData: state.spotReducer.spotData,
    contentTypeList: state.spotReducer.contentTypeList,
    isLike: state.spotReducer.isLike,
    loading: {
        areasLoading: state.loadingReducer[LOAD_AREAS_TYPE],
        spotsLoading: state.loadingReducer[LOAD_SPOTS_TYPE],
        searchSpotLoading: state.loadingReducer[SEARCH_SPOT_TYPE],
    },
});
const mapDispatchToProps = (dispatch) => ({
    loadAreas: () => {
        dispatch(loadAreasAction());
    },
    loadSpots: ({ areaCode, contentTypeId, pageNo, numOfRows }) => {
        dispatch(loadSpotsAction({ areaCode, contentTypeId, pageNo, numOfRows }));
    },
    changeSpotData: ({ property, value }) => {
        dispatch(changeSpotDataAction({ property, value }));
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
    initialize: () => {
        dispatch(spotInitializeAction());
    },
    initializeForm: (form) => {
        dispatch(spotInitializeFormAction(form));
    },
    searchSpot: ({ areaCode, contentTypeId, keyword, pageNo, numOfRows }) => {
        dispatch(searchSpotAction({ areaCode, contentTypeId, keyword, pageNo, numOfRows }));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(SpotListContainer);
