import { useCallback, useMemo, useRef, useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import SpotList from '../../components/spot/SpotList';
import {
    addSpotLikeAction,
    checkLikeListAction,
    cleanCurrentInfoAction,
    cleanLikeListAction,
    cleanSpotsAction,
    loadAreasAction,
    loadDetailSpotAction,
    loadSpotsAction,
    removeSpotLikeAction,
    toggleDetailLikeAction,
    unloadDetailSpotAction,
    updateAreaNumAction,
    updateBlockNumAction,
    updateDetailSpotAction,
    updatePageNumAction,
    updateSpotsLikeAction,
    changeKeywordAction,
    resetKeywordAction,
    searchSpotAction,
    updateContentTypeIdAction,
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
    updateAreaNum,
    updatePageNum,
    updateBlockNum,
    checkLikeList,
    addSpotLike,
    removeSpotLike,
    unloadDetailSpot,
    updateSpotsLike,
    cleanSpots,
    cleanLikeList,
    cleanCurrentInfo,
    toggleDetailLike,
    updateDetailSpot,
    changeKeyword,
    searchSpot,
    updateContentTypeId,
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
    }, [loadSpots, areaIndex, pageIndex, areas, contentTypeId]);

    // 여행지 상세정보 모달 열기
    const drag = useRef(false);
    const onOpenDetail = (spot) => {
        if (drag.current) {
            drag.current = false;
            return;
        }
        loadDetailSpot(spot.info.contentid);
        updateDetailSpot(spot);
    };

    // 여행지 첫페이지
    const onFirstSpotsPage = (areaIndex) => {
        if (drag.current) {
            // e.stopPropagation();
            drag.current = false;
            return;
        }
        // if (spots) {
        updateAreaNum(areaIndex);
        updatePageNum(1);
        updateBlockNum(0);
        // }
    };

    // 사용자의 좋아요 여행지 비교
    useEffect(() => {
        if (spots && account) {
            const { accountId } = account;
            const contentIdArr = spots.list.map((spot) => {
                return spot.info.contentid;
            });
            if (!likeList) {
                // 여행지 좋아요 여부를 확인해 받아와 likeList에 넣는다.
                checkLikeList(accountId, contentIdArr);
            }
        }
    }, [spots, account, checkLikeList, updateSpotsLike, likeList]);

    // loadspots시작 cleanspots loadSpots성공 checklikeList시작 성공 updatespotslike
    // 여행지 좋아요 최신화
    useEffect(() => {
        if (spots && likeList) {
            // 받아온 좋아요(likeList)를 여행지 데이터에 넣어준다.
            updateSpotsLike(likeList);
        }
    }, [likeList, updateSpotsLike]);

    // 여행지 초기화
    useEffect(() => {
        cleanSpots();
    }, [areaIndex, pageIndex, cleanSpots]);

    // 여행지 페이지에서 벗어날 때 정보 초기화
    useEffect(() => {
        return () => {
            cleanSpots();
            cleanCurrentInfo();
        };
    }, [cleanCurrentInfo, cleanSpots]);

    // 여행지 좋아요 토글
    const onToggleSpotLike = (contentId) => {
        const { like } = detail.info;
        toggleDetailLike();
        if (like === false) {
            addSpotLike(contentId);
        } else {
            removeSpotLike(contentId);
        }
    };

    // 좋아요리스트 초기화
    // 여행지 좋아요 토글 시, cleaning 후 updatespotslike
    useEffect(() => {
        cleanLikeList();
    }, [cleanLikeList, detail]);

    // 여행지 검색할 키워드 타이핑
    const onChangeKeyword = (keyword) => {
        changeKeyword(keyword);
    };
    const onResetKeyword = () => {
        resetKeyword();
    };

    const onSearchSpot = () => {
        const pageIndex = 1;
        searchSpot({ areaIndex, contentTypeId, keyword, pageIndex });
    };

    const onUpdateContentTypeId = (contentTypeId) => {
        updateContentTypeId(contentTypeId);
    };

    const sliderSpots = [
        { title: '광안리해수욕장', image: 'http://tong.visitkorea.or.kr/cms/resource/75/2648975_image2_1.jpg' },
        { title: '강남', image: 'http://tong.visitkorea.or.kr/cms/resource/08/1984608_image2_1.jpg' },
        { title: '한라산', image: 'http://tong.visitkorea.or.kr/cms/resource/99/2870099_image2_1.jpg' },
        { title: '광안리해수욕장', image: 'http://tong.visitkorea.or.kr/cms/resource/75/2648975_image2_1.jpg' },
        { title: '강남', image: 'http://tong.visitkorea.or.kr/cms/resource/08/1984608_image2_1.jpg' },
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
            onFirstSpotsPage={onFirstSpotsPage}
            onUnloadDetailSpot={unloadDetailSpot}
            onToggleSpotLike={onToggleSpotLike}
            onOpenDetail={onOpenDetail}
            onChangeKeyword={onChangeKeyword}
            onResetKeyword={onResetKeyword}
            onSearchSpot={onSearchSpot}
            onUpdateContentTypeId={onUpdateContentTypeId}
            drag={drag}
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
    updateAreaNum: (num) => {
        dispatch(updateAreaNumAction(num));
    },
    updatePageNum: (num) => {
        dispatch(updatePageNumAction(num));
    },
    updateBlockNum: (num) => {
        dispatch(updateBlockNumAction(num));
    },
    loadDetailSpot: (id) => {
        dispatch(loadDetailSpotAction(id));
    },
    updateDetailSpot: (spotInfo) => {
        dispatch(updateDetailSpotAction(spotInfo));
    },
    unloadDetailSpot: () => {
        dispatch(unloadDetailSpotAction());
    },
    checkLikeList: (accountId, spotId) => {
        dispatch(checkLikeListAction(accountId, spotId));
    },
    addSpotLike: (spotId) => {
        dispatch(addSpotLikeAction(spotId));
    },
    removeSpotLike: (spotId) => {
        dispatch(removeSpotLikeAction(spotId));
    },
    updateSpotsLike: (likes) => {
        dispatch(updateSpotsLikeAction(likes));
    },
    toggleDetailLike: () => {
        dispatch(toggleDetailLikeAction());
    },
    cleanSpots: () => {
        dispatch(cleanSpotsAction());
    },
    cleanLikeList: () => {
        dispatch(cleanLikeListAction());
    },
    cleanCurrentInfo: () => {
        dispatch(cleanCurrentInfoAction());
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
    updateContentTypeId: (contentTypeId) => {
        dispatch(updateContentTypeIdAction(contentTypeId));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(SpotListContainer);
