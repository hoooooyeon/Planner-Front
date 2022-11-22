import { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import SpotList from '../../components/spot/SpotList';
import {
    addLikeSpotAction,
    checkLikeSpotsAction,
    cleanLikeSpotsAction,
    cleanLikeSpotsTogglingAction,
    loadAreasAction,
    loadDetailSpotAction,
    loadSpotsAction,
    removeLikeSpotAction,
    toggleDetailLikeAction,
    unloadDetailSpotAction,
    updateAreaNumAction,
    updateBlockNumAction,
    updateDetailSpotAction,
    updatePageNumAction,
    updateSpotsLikeAction,
} from '../../modules/spotModule';

const SpotListContainer = ({
    areas,
    spots,
    spotError,
    detail,
    currentInfo,
    account,
    likeSpots,
    likeSpot,
    loadAreas,
    loadSpots,
    loadDetailSpot,
    updateAreaNum,
    updatePageNum,
    updateBlockNum,
    checkLikeSpots,
    addLikeSpot,
    removeLikeSpot,
    unloadDetailSpot,
    updateSpotsLike,
    cleanLikeSpots,
    cleanLikeSpotsToggling,
    toggleDetailLike,
    updateDetailSpot,
}) => {
    const { areaNum, pageNum } = currentInfo;

    // 지역 가져오기
    useEffect(() => {
        loadAreas();
    }, [loadAreas]);

    // 여행지 가져오기
    useEffect(() => {
        if (areaNum) {
            loadSpots(areaNum, pageNum);
        }
    }, [loadSpots, areaNum, pageNum]);

    // 여행지 상세정보 모달 열기
    const onOpenDetail = (spot) => {
        loadDetailSpot(spot.info.contentid);
        updateDetailSpot(spot);
    };

    // 여행지 첫페이지
    const onFirstSpotsPage = (e, areaCode) => {
        updateAreaNum(areaCode);
        updatePageNum(1);
        updateBlockNum(0);
    };

    // 사용자의 좋아요 여행지 비교
    useEffect(() => {
        if (spots && account) {
            const { accountId } = account;
            const contentIdArr = spots.list.map((spot) => {
                return spot.info.contentid;
            });
            
            if (!likeSpots) {
                checkLikeSpots(accountId, contentIdArr);
            }
        }
    }, [spots, account, checkLikeSpots, likeSpots]);

    // 여행지 초기화
    useEffect(() => {
        cleanLikeSpots();
    }, [areaNum, pageNum, cleanLikeSpots]);

    // 여행지 좋아요 최신화
    useEffect(() => {
        if (likeSpots) {
            updateSpotsLike(likeSpots);
        }
    }, [likeSpots, updateSpotsLike]);

    // 여행지 좋아요 토글
    const onToggleLikeSpot = (contentId) => {
        const { like } = detail;
        toggleDetailLike();
        if (like === false) {
            addLikeSpot(contentId);
        } else {
            removeLikeSpot(contentId);
        }
    };

    // 여행지 좋아요 토글 시, cleaning 후 updatespotslike
    useEffect(() => {
        cleanLikeSpotsToggling();
    }, [cleanLikeSpotsToggling, detail]);

    return (
        <SpotList
            areas={areas}
            spots={spots}
            spotError={spotError}
            detail={detail}
            currentInfo={currentInfo}
            onFirstSpotsPage={onFirstSpotsPage}
            onUnloadDetailSpot={unloadDetailSpot}
            onToggleLikeSpot={onToggleLikeSpot}
            onOpenDetail={onOpenDetail}
        />
    );
};

const mapStateToProps = (state) => ({
    areas: state.spotReducer.areas,
    spots: state.spotReducer.spots,
    detail: state.spotReducer.detail,
    spotError: state.spotReducer.spotError,
    currentInfo: state.spotReducer.currentInfo,
    likeSpots: state.spotReducer.likeSpots,
    likeSpot: state.spotReducer.likeSpot,
    account: state.authReducer.account,
});
const mapDispatchToProps = (dispatch) => ({
    loadAreas: () => {
        dispatch(loadAreasAction());
    },
    loadSpots: (areaCode, page) => {
        dispatch(loadSpotsAction(areaCode, page));
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
    checkLikeSpots: (accountId, spotId) => {
        dispatch(checkLikeSpotsAction(accountId, spotId));
    },
    addLikeSpot: (spotId) => {
        dispatch(addLikeSpotAction(spotId));
    },
    removeLikeSpot: (spotId) => {
        dispatch(removeLikeSpotAction(spotId));
    },
    updateSpotsLike: (likes) => {
        dispatch(updateSpotsLikeAction(likes));
    },
    toggleDetailLike: () => {
        dispatch(toggleDetailLikeAction());
    },
    cleanLikeSpots: () => {
        dispatch(cleanLikeSpotsAction());
    },
    cleanLikeSpotsToggling: () => {
        dispatch(cleanLikeSpotsTogglingAction());
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(SpotListContainer);
