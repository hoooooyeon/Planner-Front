import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import SpotList from '../../components/spot/SpotList';
import {
    addLikeSpotAction,
    checkLikeSpotIdAction,
    cleanLikeSpotIdAction,
    loadAreasAction,
    loadDetailSpotAction,
    loadSpotsAction,
    removeLikeSpotAction,
    unloadDetailSpotAction,
    updateAreaNumAction,
    updateBlockNumAction,
    updateDetailLikeAction,
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
    likeSpotId,
    loadAreas,
    loadSpots,
    loadDetailSpot,
    updateAreaNum,
    updatePageNum,
    updateBlockNum,
    checkLikeSpotId,
    addLikeSpot,
    removeLikeSpot,
    unloadDetailSpot,
    updateSpotsLike,
    updateDetailLike,
    cleanLikeSpotId,
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
        cleanLikeSpotId();
    }, [loadSpots, areaNum, pageNum, cleanLikeSpotId]);

    // 여행지 첫페이지
    const onFirstSpotsPage = (areaCode) => {
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
            if (!likeSpotId && spots) {
                checkLikeSpotId(accountId, contentIdArr);
            }
        }
    }, [spots, account, checkLikeSpotId, likeSpotId]);

    // 여행지 좋아요 최신화
    useEffect(() => {
        if (likeSpotId) {
            updateSpotsLike(likeSpotId);
        }
    }, [likeSpotId, updateSpotsLike]);

    // 디테일 좋아요 최신화
    // useEffect(() => {
    //     if (detail && spots) {
    //         spots.list.map((spot) => {
    //             if (spot.info.contentid === detail.info.contentid) {
    //                 updateDetailLike(spot.like);
    //             }
    //             return null;
    //         });
    //     }
    // }, [detail, spots, updateDetailLike]);

    const onLikeToggle = () => {
        // if (detail && detail.like === true && account) {
        //     removeLikeSpot(account.accountId, detail.contentid);
        // } else if (detail && detail.like === false && account) {
        //     addLikeSpot(account.accountId, detail.contentid);
        // }
    };

    return (
        <SpotList
            areas={areas}
            spots={spots}
            spotError={spotError}
            detail={detail}
            currentInfo={currentInfo}
            onLoadDetailSpot={loadDetailSpot}
            onFirstSpotsPage={onFirstSpotsPage}
            onUnloadDetailSpot={unloadDetailSpot}
            onAddLikeSpot={addLikeSpot}
            onLikeToggle={onLikeToggle}
            onUpdateDetailLike={updateDetailLike}
        />
    );
};

const mapStateToProps = (state) => ({
    areas: state.spotReducer.areas,
    spots: state.spotReducer.spots,
    detail: state.spotReducer.detail,
    spotError: state.spotReducer.spotError,
    currentInfo: state.spotReducer.currentInfo,
    likeSpotId: state.spotReducer.likeSpotId,
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
    unloadDetailSpot: () => {
        dispatch(unloadDetailSpotAction());
    },
    checkLikeSpotId: (accountId, spotId) => {
        dispatch(checkLikeSpotIdAction(accountId, spotId));
    },
    addLikeSpot: (accountId, spotId) => {
        dispatch(addLikeSpotAction(accountId, spotId));
    },
    removeLikeSpot: (accountId, spotId) => {
        dispatch(removeLikeSpotAction(accountId, spotId));
    },
    updateSpotsLike: (likes) => {
        dispatch(updateSpotsLikeAction(likes));
    },
    updateDetailLike: (like) => {
        dispatch(updateDetailLikeAction(like));
    },
    cleanLikeSpotId: () => {
        dispatch(cleanLikeSpotIdAction());
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(SpotListContainer);
