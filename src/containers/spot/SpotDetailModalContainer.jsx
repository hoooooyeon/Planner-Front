import { useDispatch, useSelector } from 'react-redux';
import SpotDetailModal from '../../components/spot/SpotDetailModal';
import { addSpotLikeAction, removeSpotLikeAction, resetDetailSpotAction } from '../../modules/spotModule';

const SpotDetailModalContainer = () => {
    const dispatch = useDispatch();
    const { detail, spotData, account, spotError } = useSelector(({ spotReducer, authReducer }) => ({
        detail: spotReducer.detail,
        spotError: spotReducer.spotError,
        spotData: spotReducer.spotData,
        account: authReducer.account,
    }));

    const { likeState, title, image, contentId } = { ...detail };
    const { accountId } = { ...account };

    // 여행지 좋아요 토글.
    const onToggleDetailLike = () => {
        if (likeState) {
            dispatch(removeSpotLikeAction({ contentId }));
        } else {
            dispatch(addSpotLikeAction({ title, contentId, image }));
        }
    };

    // 모달 닫을 때 detail 리셋.
    const onResetDetailSpot = () => {
        dispatch(resetDetailSpotAction());
    };

    return (
        <SpotDetailModal
            accountId={accountId}
            spotData={spotData}
            spotError={spotError}
            detail={detail}
            onResetDetailSpot={onResetDetailSpot}
            onToggleDetailLike={onToggleDetailLike}
        />
    );
};

export default SpotDetailModalContainer;
