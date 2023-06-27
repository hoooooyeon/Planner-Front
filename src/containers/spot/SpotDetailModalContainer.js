import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpotDetailModal from '../../components/spot/SpotDetailModal';
import { addSpotLikeAction, removeSpotLikeAction, resetDetailSpotAction, toggleDetailLikeAction, toggleSpotDetailModalAction } from '../../modules/spotModule';

const SpotDetailModalContainer = () => {
    const dispatch = useDispatch();
    const { detail, plannerError, spotModal } = useSelector(({ spotReducer }) => ({
        detail: spotReducer.detail,
        spotError: spotReducer.spotError,
        spotModal: spotReducer.spotModal,
    }));

    const { likeState, title, image, contentId } = { ...detail };

    const onToggleSpotDetailModal = () => {
        dispatch(toggleSpotDetailModalAction());
    };

    const onToggleDetailLike = () => {
        if (likeState) {
            dispatch(removeSpotLikeAction({ contentId }));
        } else if (!likeState) {
            dispatch(addSpotLikeAction({ title, contentId, image }));
        }
    };

    const onResetDetailSpot = () => {
        dispatch(resetDetailSpotAction());
    };

    return <SpotDetailModal spotModal={spotModal} detail={detail} onResetDetailSpot={onResetDetailSpot} onToggleSpotDetailModal={onToggleSpotDetailModal} onToggleDetailLike={onToggleDetailLike} />;
};

export default SpotDetailModalContainer;
