import { useEffect } from 'react';
import { connect } from 'react-redux';
import SpotList from '../../components/spot/SpotList';
import { loadAreas, loadDetailSpot, loadSpots, unloadDetailSpot, updateAreaNum, updateBlockNum, updatePageNum, updateSpot, updateSpotId, updateTotalCount } from '../../modules/spotModule';
import defaultImg from '../../lib/images/defaultImg.jpg';

const SpotListContainer = ({ areas, spots, detail, spotError, account, currentInfo, loadAreas, loadSpots, loadDetailSpot, unloadDetailSpot, updateAreaNum, updatePageNum, updateBlockNum }) => {
    const { areaNum, pageNum } = currentInfo;

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
        if (areas) {
            loadSpots(areaNum, pageNum);
        }
    }, [areas, loadSpots, areaNum, pageNum]);

    // 여행지 아이디 적출
    useEffect(() => {
        if (spots) {
            const contentIdArr = spots.list.map((spot) => {
                return spot.info.contentid;
            });
        }
    });

    // 여행지 첫페이지
    const onFirstSpotsPage = (areaCode) => {
        updateAreaNum(areaCode);
        updatePageNum(1);
        updateBlockNum(0);
    };

    return (
        <SpotList
            areas={areas}
            spots={spots}
            detail={detail}
            spotError={spotError}
            currentInfo={currentInfo}
            onLoadDetailSpot={loadDetailSpot}
            onUnloadDetailSpot={unloadDetailSpot}
            onChangeErrorImg={onChangeErrorImg}
            onFirstSpotsPage={onFirstSpotsPage}
        />
    );
};

const mapStateToProps = (state) => ({
    areas: state.spotReducer.areas,
    spots: state.spotReducer.spots,
    detail: state.spotReducer.detail,
    spotError: state.spotReducer.spotError,
    account: state.authReducer.account,
    currentInfo: state.spotReducer.currentInfo,
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
});
export default connect(mapStateToProps, mapDispatchToProps)(SpotListContainer);
