import { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import SpotList from '../../components/spot/SpotList';
import { clearSpotId, loadAreas, loadDetailSpot, loadSpots, unloadDetailSpot, updateAreaNum, updateBlockNum, updatePageNum, updateSpot, updateSpotId } from '../../modules/spotModule';
import defaultImg from '../../lib/images/defaultImg.jpg';

const SpotListContainer = ({
    areas,
    spots,
    spotId,
    detail,
    spotError,
    account,
    areaNum,
    pageNum,
    blockNum,
    loadAreas,
    loadSpots,
    updateSpotId,
    clearSpotId,
    loadDetailSpot,
    unloadDetailSpot,
    updateAreaNum,
    updatePageNum,
    updateBlockNum,
}) => {
    // 대체 이미지 넣기
    const onChangeErrorImg = (e) => {
        e.target.src = defaultImg;
    };

    // 지역 가져오기
    useEffect(() => {
        loadAreas();
    }, [loadAreas]);

    // 여행지 가져오기
    useEffect(() => {
        // if (spots) {
        loadSpots(areaNum, pageNum);
        // }
    }, [loadSpots, areaNum, pageNum]);

    // 지역 코드 최신화
    useEffect(() => {
        updateAreaNum();
    }, [updateAreaNum]);

    const onUpdateSpotId = () => {
        // if (spots) {
        //     clearSpotId();
        //     spots.item.map((spot) => updateSpotId(spot.contentid));
        // }
    };

    // useEffect(() => {
    //     if (account) {
    //         getFavoritesSpot(account.accountId);
    //     }
    // }, [getFavoritesSpot, account]);

    const onToggle = (spotId) => {
        // e.stopPropagation();
        // if ( === false) {
        //     addFavoritesSpot(spotId);
        // } else {
        //     deleteFavoritesSpot(spotId);
        // }
    };

    return (
        <SpotList
            areas={areas}
            spots={spots}
            spotId={spotId}
            detail={detail}
            spotError={spotError}
            areaNum={areaNum}
            pageNum={pageNum}
            blockNum={blockNum}
            onLoadSpots={loadSpots}
            onUpdateAreaNum={updateAreaNum}
            onUpdatePageNum={updatePageNum}
            onUpdateBlockNum={updateBlockNum}
            onLoadDetailSpot={loadDetailSpot}
            onUnloadDetailSpot={unloadDetailSpot}
            onToggle={onToggle}
            onChangeErrorImg={onChangeErrorImg}
            onUpdateSpotId={onUpdateSpotId}
        />
    );
};

const mapStateToProps = (state) => ({
    areas: state.spotReducer.areas,
    spots: state.spotReducer.spots,
    spot: state.spotReducer.spot,
    spotId: state.spotReducer.spotId,
    detail: state.spotReducer.detail,
    spotError: state.spotReducer.spotError,
    account: state.authReducer.account,
    areaNum: state.spotReducer.areaNum,
    pageNum: state.spotReducer.pageNum,
    blockNum: state.spotReducer.blockNum,
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
    updateSpot: (item) => {
        dispatch(updateSpot(item));
    },
    updateSpotId: (id) => {
        dispatch(updateSpotId(id));
    },
    clearSpotId: () => {
        dispatch(clearSpotId());
    },
    loadDetailSpot: (id) => {
        dispatch(loadDetailSpot(id));
    },
    unloadDetailSpot: () => {
        dispatch(unloadDetailSpot());
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(SpotListContainer);
