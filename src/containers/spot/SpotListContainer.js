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
} from '../../modules/spotModule';

const SpotListContainer = ({
    areas,
    spots,
    spotError,
    detail,
    currentInfo,
    account,
    likeList,
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
}) => {
    const { areaNum, pageNum } = currentInfo;

    // 지역 가져오기
    // const onSpots = useCallback(() => {
    //     if(areaNum){
    //         loadAreas();
    //     }
    // }, [areaNum, loadAreas]);

    // useEffect(() => {
    //     onSpots();
    // }, [onSpots]);

    useEffect(() => {
        if (areaNum) {
            loadAreas();
        }
    }, [loadAreas, areaNum]);

    // 여행지 가져오기
    // const onUpdateSpotsLike = useCallback( new Promise(() => {
    //     // const onUpSpots = new Promise(() => {
    //         if (likeList) {
    //             updateSpotsLike(likeList);
    //         }
    //     // });
    //     // onUpSpots();
    // }), []);

    const onLoadSpots = useCallback(async () => {
        await loadSpots(areaNum, pageNum);
        // await updateSpotsLike();
        const { accountId } = account;
        const contentIdArr = spots.list.map((spot) => {
            return spot.info.contentid;
        });

        if (!likeList) {
            await checkLikeList(accountId, contentIdArr);
        }
        if (likeList) {
            await updateSpotsLike(likeList);
        }
    }, [areaNum, pageNum, loadSpots, updateSpotsLike, likeList, account, checkLikeList, spots]);
    useEffect(() => {
        onLoadSpots();
    }, [onLoadSpots]);
    // const onUpdateSpotsLike = () => {
    //     if (likeList) {
    //         updateSpotsLike(likeList);
    //     }
    // };

    // const onLoadSpots = async () => {
    //     await loadSpots(areaNum, pageNum);
    //     // await onUpdateSpotsLike();
    //     // if (likeList) {
    //     //     await updateSpotsLike(likeList);
    //     // }
    // };
    // useEffect(() => {
    //     if (areas) {
    //         onLoadSpots();
    //     }
    // }, [loadSpots, areaNum, pageNum, areas, likeList, updateSpotsLike]);

    // 여행지 상세정보 모달 열기
    const sDrag = useRef(false);
    const onOpenDetail = (spot) => {
        if (sDrag.current) {
            sDrag.current = false;
            return;
        }
        loadDetailSpot(spot.info.contentid);
        updateDetailSpot(spot);
    };

    // 여행지 첫페이지
    const mDrag = useRef(false);
    const onFirstSpotsPage = (areaCode) => {
        if (mDrag.current) {
            // e.stopPropagation();
            mDrag.current = false;
            return;
        }
        // if (spots) {
        updateAreaNum(areaCode);
        updatePageNum(1);
        updateBlockNum(0);
        // }
    };

    // 사용자의 좋아요 여행지 비교
    useEffect(() => {
        if (spots && account) {
            // const { accountId } = account;
            // const contentIdArr = spots.list.map((spot) => {
            //     return spot.info.contentid;
            // });
            // if (!likeList) {
            //     checkLikeList(accountId, contentIdArr);
            // }
        }
    }, [spots, account, checkLikeList, likeList]);

    // 여행지 초기화
    useEffect(() => {
        cleanSpots();
    }, [areaNum, pageNum, cleanSpots]);

    // 여행지 페이지에서 벗어날 때 정보 초기화
    useEffect(() => {
        return () => {
            cleanSpots();
            cleanCurrentInfo();
        };
    }, [cleanCurrentInfo, cleanSpots]);

    // loadspots시작 cleanspots loadSpots성공 checklikeList시작 성공 updatespotslike
    // 여행지 좋아요 최신화
    // useEffect(() => {
    //     if (likeList) {
    //         updateSpotsLike(likeList);
    //     }
    // }, [likeList, updateSpotsLike]);

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

    return (
        <SpotList
            areas={areas}
            spots={spots}
            spotError={spotError}
            detail={detail}
            currentInfo={currentInfo}
            onFirstSpotsPage={onFirstSpotsPage}
            onUnloadDetailSpot={unloadDetailSpot}
            onToggleSpotLike={onToggleSpotLike}
            onOpenDetail={onOpenDetail}
            mDrag={mDrag}
            sDrag={sDrag}
        />
    );
};

const mapStateToProps = (state) => ({
    areas: state.spotReducer.areas,
    spots: state.spotReducer.spots,
    detail: state.spotReducer.detail,
    spotError: state.spotReducer.spotError,
    currentInfo: state.spotReducer.currentInfo,
    likeList: state.spotReducer.likeList,
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
});
export default connect(mapStateToProps, mapDispatchToProps)(SpotListContainer);
