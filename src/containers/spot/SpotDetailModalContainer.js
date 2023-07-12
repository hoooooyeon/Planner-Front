import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import SpotDetailModal from '../../components/spot/SpotDetailModal';
import {
    addSpotLikeAction,
    removeSpotLikeAction,
    resetDetailSpotAction,
    toggleDetailLikeAction,
    toggleSpotDetailModalAction,
} from '../../modules/spotModule';

const SpotDetailModalContainer = () => {
    const dispatch = useDispatch();
    const { detail, plannerError, spotModal, account } = useSelector(({ spotReducer, authReducer }) => ({
        detail: spotReducer.detail,
        spotError: spotReducer.spotError,
        spotModal: spotReducer.spotModal,
        account: authReducer.account,
    }));
    const history = useHistory();

    const { likeState, title, image, contentId } = { ...detail };
    const { accountId } = { ...account };

    const onToggleSpotDetailModal = () => {
        dispatch(toggleSpotDetailModalAction());
    };

    const onToggleDetailLike = () => {
        if (accountId) {
            if (likeState) {
                dispatch(removeSpotLikeAction({ contentId }));
            } else if (!likeState) {
                dispatch(addSpotLikeAction({ title, contentId, image }));
            }
        } else {
            alert('로그인이 필요합니다.');
            history.push('/login');
        }
    };

    const onResetDetailSpot = () => {
        dispatch(resetDetailSpotAction());
    };

    return (
        <SpotDetailModal
            spotModal={spotModal}
            detail={detail}
            onResetDetailSpot={onResetDetailSpot}
            onToggleSpotDetailModal={onToggleSpotDetailModal}
            onToggleDetailLike={onToggleDetailLike}
        />
    );
};

export default SpotDetailModalContainer;
