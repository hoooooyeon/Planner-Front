import { useDispatch, useSelector } from 'react-redux';
import SpotDetailModal from '../../components/spot/SpotDetailModal';
import { resetDetailSpotAction, toggleDetailLikeAction, toggleSpotDetailModalAction } from '../../modules/spotModule';

const SpotDetailModalContainer = () => {
    const dispatch = useDispatch();
    const { detail, plannerError, spotModal } = useSelector(({ spotReducer }) => ({
        detail: spotReducer.detail,
        spotError: spotReducer.spotError,
        spotModal: spotReducer.spotModal,
    }));

    const onToggleSpotDetailModal = () => {
        dispatch(toggleSpotDetailModalAction());
    };

    const onToggleDetailLike = () => {
        dispatch(toggleDetailLikeAction());
    };

    const onResetDetailSpot = () => {
        dispatch(resetDetailSpotAction());
    };

    return <SpotDetailModal spotModal={spotModal} detail={detail} onResetDetailSpot={onResetDetailSpot} onToggleSpotDetailModal={onToggleSpotDetailModal} />;
};

export default SpotDetailModalContainer;
