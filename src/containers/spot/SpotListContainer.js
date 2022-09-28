import { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import SpotList from '../../components/spot/SpotList';
import { addFavoritesSpot, favoritesArray, loadAreas, loadDetailSpot, loadFavoritesSpot, loadSpots, removeFavoritesSpot, unloadDetailSpot, updateAreaNum, updateBlockNum, updatePageNum } from '../../modules/spotModule';
import defaultImg from '../../lib/images/defaultImg.jpg';

const SpotListContainer = ({
    areas,
    spots,
    detail,
    spotError,
    favoritesSpot,
    account,
    areaNum,
    pageNum,
    blockNum,
    loadAreas,
    loadSpots,
    loadDetailSpot,
    unloadDetailSpot,
    loadFavoritesSpot,
    addFavoritesSpot,
    removeFavoritesSpot,
    favoritesArray,
    updateAreaNum,
    updatePageNum,
    updateBlockNum,
}) => {
    const onChangeErrorImg = (e) => {
        e.target.src = defaultImg;
    };

    useEffect(() => {
        loadAreas();
    });

    // useEffect(() => {
    //     if (spots) {
    //         listSpots();
    //     }
    // }, [spots, listSpots, pageNum]);

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
        />
    );
};

const mapStateToProps = (state) => ({
    areas: state.spotReducer.areas,
    spots: state.spotReducer.spots,
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
    favoritesArray: () => {
        dispatch(favoritesArray());
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(SpotListContainer);
