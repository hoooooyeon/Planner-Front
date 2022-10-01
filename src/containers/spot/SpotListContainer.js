import { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import SpotList from '../../components/spot/SpotList';
import {
    addFavoritesSpot,
    clearSpotId,
    loadAreas,
    loadDetailSpot,
    loadFavoritesSpot,
    loadSpots,
    removeFavoritesSpot,
    unloadDetailSpot,
    updateAreaNum,
    updateBlockNum,
    updatePageNum,
    updateSpot,
    updateSpotId,
} from '../../modules/spotModule';
import defaultImg from '../../lib/images/defaultImg.jpg';

const SpotListContainer = ({
    areas,
    spots,
    spot,
    spotId,
    detail,
    spotError,
    favoritesSpot,
    account,
    areaNum,
    pageNum,
    blockNum,
    loadAreas,
    loadSpots,
    updateSpot,
    updateSpotId,
    clearSpotId,
    loadDetailSpot,
    unloadDetailSpot,
    loadFavoritesSpot,
    addFavoritesSpot,
    removeFavoritesSpot,
    updateAreaNum,
    updatePageNum,
    updateBlockNum,
}) => {
    // 지역 가져오기
    useEffect(() => {
        loadAreas();
    }, [loadAreas]);

    // 대체 이미지 넣기
    const onChangeErrorImg = (e) => {
        e.target.src = defaultImg;
    };

    // 지역 코드 최신화
    useEffect(() => {
        updateAreaNum();
    }, [updateAreaNum]);

    const onUpdateSpotId = () => {
        if (spots) {
            clearSpotId();
            spots.item.map((spot) => updateSpotId(spot.contentid));
        }
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
            spot={spot}
            spotId={spotId}
            detail={detail}
            spotError={spotError}
            favoritesSpot={favoritesSpot}
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
            onUpdateSpot={updateSpot}
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
    page: state.spotReducer.page,
    favoritesSpot: state.spotReducer.favoritesSpot,
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
    loadFavoritesSpot: (id) => {
        dispatch(loadFavoritesSpot(id));
    },
    addFavoritesSpot: (spotId) => {
        dispatch(addFavoritesSpot(spotId));
    },
    removeFavoritesSpot: (spotId) => {
        dispatch(removeFavoritesSpot(spotId));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(SpotListContainer);
