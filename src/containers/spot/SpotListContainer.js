import { useEffect } from 'react';
import { connect } from 'react-redux';
import SpotList from '../../components/spot/SpotList';
import { addLikeSpot, loadAreas, loadDetailSpot, loadSpots, removeLikeSpot, unloadDetailSpot, updateAreaNum, updateBlockNum, updateDetailLike, updatePageNum, updateSpotsLike } from '../../modules/spotModule';
import { likeSpotIdCheckAction } from '../../modules/ProfileModule';

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
    likeSpotIdCheck,
    addLikeSpot,
    removeLikeSpot,
    unloadDetailSpot,
    updateSpotsLike,
    updateDetailLike,
}) => {
    const { areaNum, pageNum } = currentInfo;

    // 지역 가져오기
    useEffect(() => {
        loadAreas();
    }, [loadAreas]);

    // 여행지 가져오기
    useEffect(() => {
        if (areas) {
            loadSpots(areaNum, pageNum);
        }
    }, [areas, loadSpots, areaNum, pageNum]);

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
            likeSpotIdCheck(accountId, contentIdArr);
        }
    }, [spots, likeSpotIdCheck, account]);

    useEffect(() => {
        if (spots && likeSpotId) {
            updateSpotsLike(likeSpotId);
        }
    }, [spots, likeSpotId, updateSpotsLike]);

    useEffect(() => {
        if (detail && spots) {
            spots.list.map((spot) => {
                if (spot.info.contentid === detail.info.contentid) {
                    updateDetailLike(spot.like);
                }
                return null;
            });
        }
    }, [detail, spots, updateDetailLike]);

    const onLikeToggle = () => {
        if (detail && detail.like === true && account) {
            removeLikeSpot(account.accountId, detail.contentid);
        } else if (detail && detail.likk === false && account) {
            addLikeSpot(account.accountId, detail.contentid);
        }
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
        />
    );
};

const mapStateToProps = (state) => ({
    areas: state.spotReducer.areas,
    spots: state.spotReducer.spots,
    detail: state.spotReducer.detail,
    spotError: state.spotReducer.spotError,
    currentInfo: state.spotReducer.currentInfo,
    likeSpotId: state.profileReducer.likeSpotId,
    account: state.authReducer.account,
});
const mapDispatchToProps = (dispatch) => ({
    loadAreas: () => {
        dispatch(loadAreas());
    },
    loadSpots: (areaCode, page) => {
        dispatch(loadSpots(areaCode, page));
    },
    updateAreaNum: (num) => {
        dispatch(updateAreaNum(num));
    },
    updatePageNum: (num) => {
        dispatch(updatePageNum(num));
    },
    updateBlockNum: (num) => {
        dispatch(updateBlockNum(num));
    },
    loadDetailSpot: (id) => {
        dispatch(loadDetailSpot(id));
    },
    unloadDetailSpot: () => {
        dispatch(unloadDetailSpot());
    },
    likeSpotIdCheck: (accountId, spotId) => {
        dispatch(likeSpotIdCheckAction(accountId, spotId));
    },
    addLikeSpot: (accountId, spotId) => {
        dispatch(addLikeSpot(accountId, spotId));
    },
    removeLikeSpot: (accountId, spotId) => {
        dispatch(removeLikeSpot(accountId, spotId));
    },
    updateSpotsLike: (likes) => {
        dispatch(updateSpotsLike(likes));
    },
    updateDetailLike: (like) => {
        dispatch(updateDetailLike(like));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(SpotListContainer);
