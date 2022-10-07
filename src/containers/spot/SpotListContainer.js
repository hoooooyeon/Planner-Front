import { useEffect } from 'react';
import { connect } from 'react-redux';
import SpotList from '../../components/spot/SpotList';
import { addLikeSpot, loadAreas, loadDetailSpot, loadSpots, removeLikeSpot, unloadDetailSpot, updateAreaNum, updateBlockNum, updatePageNum } from '../../modules/spotModule';
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
            spots.list.map((spot, i) => (spot.like = likeSpotId[i].state));
        }
    }, [spots, likeSpotId]);

    // useEffect(() => {
    //     if (detail && likeSpotId) {
    //         likeSpotId.map((spotId) => {
    //             if (spotId.contentId === detail.contentid) {
    //                 detail.like = true;
    //             }
    //             return null;
    //         });
    //     }
    // });

    return (
        <SpotList
            areas={areas}
            spots={spots}
            spotError={spotError}
            detail={detail}
            currentInfo={currentInfo}
            likeSpotId={likeSpotId}
            onLoadDetailSpot={loadDetailSpot}
            onFirstSpotsPage={onFirstSpotsPage}
            onUnloadDetailSpot={unloadDetailSpot}
            onAddLikeSpot={addLikeSpot}
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
});
export default connect(mapStateToProps, mapDispatchToProps)(SpotListContainer);
