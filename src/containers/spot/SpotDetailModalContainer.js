import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import SpotDetailModal from '../../components/spot/SpotDetailModal';
import { addSpotLikeAction, removeSpotLikeAction, resetDetailSpotAction } from '../../modules/spotModule';

const SpotDetailModalContainer = () => {
    const dispatch = useDispatch();
    const { detail, plannerError, spotData, account } = useSelector(({ spotReducer, authReducer }) => ({
        detail: spotReducer.detail,
        spotError: spotReducer.spotError,
        spotData: spotReducer.spotData,
        account: authReducer.account,
    }));
    const history = useHistory();

    const { likeState, title, image, contentId } = { ...detail };
    const { accountId } = { ...account };

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
            spotData={spotData}
            detail={detail}
            onResetDetailSpot={onResetDetailSpot}
            onToggleDetailLike={onToggleDetailLike}
        />
    );
};

export default SpotDetailModalContainer;
