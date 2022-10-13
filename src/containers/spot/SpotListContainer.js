import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import SpotList from '../../components/spot/SpotList';
import {
    addLikeSpotAction,
    checkLikeSpotsAction,
    cleanLikeSpotsAction,
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
    likeSpots,
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
    updateDetailLike,
    cleanLikeSpots,
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

    // 여행지 첫페이지
    const onFirstSpotsPage = (areaCode) => {
        updateAreaNum(areaCode);
        updatePageNum(1);
        updateBlockNum(0);
    };

    // const [contentIdArr, setContentIdArr] = useState();

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

    // 여행지 좋아요 최신화
    useEffect(() => {
        if (likeSpots) {
            updateSpotsLike(likeSpots);
        }
    }, [likeSpots, updateSpotsLike]);

    useEffect(() => {
        cleanLikeSpots();
    }, [areaNum, pageNum, cleanLikeSpots]);

    // 디테일 좋아요 최신화
    // useEffect(() => {
    //     if (detail) {
    //             spots.list.map((spot) => {
    //                         if (spot.info.contentid === detail.info.contentid) {
    //                 updateDetailLike(spot.like);
    //                         }
    //                 return null;
    //             });
    //     }
    // }, [detail, updateDetailLike]);

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
    likeSpots: state.spotReducer.likeSpots,
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
    checkLikeSpots: (accountId, spotId) => {
        dispatch(checkLikeSpotsAction(accountId, spotId));
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
    cleanLikeSpots: () => {
        dispatch(cleanLikeSpotsAction());
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(SpotListContainer);
