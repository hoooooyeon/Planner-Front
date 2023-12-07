import { useDispatch, useSelector } from 'react-redux';
import SpotDetailModal from '../../components/spot/SpotDetailModal';
import {
    addSpotLikeAction,
    ADD_SPOT_LIKE_TYPE,
    changeSpotDataAction,
    LOAD_DETAIL_SPOT_TYPE,
    removeSpotLikeAction,
    REMOVE_SPOT_LIKE_TYPE,
    spotInitializeFormAction,
} from '../../modules/spotModule';

const SpotDetailModalContainer = () => {
    const dispatch = useDispatch();
    const { detail, spotData, account, spotError, loading } = useSelector(
        ({ spotReducer, authReducer, loadingReducer }) => ({
            detail: spotReducer.detail,
            spotError: spotReducer.spotError,
            spotData: spotReducer.spotData,
            account: authReducer.account,
            loading: {
                detailSpotLoading: loadingReducer[LOAD_DETAIL_SPOT_TYPE],
                addSpotLikeLoading: loadingReducer[ADD_SPOT_LIKE_TYPE],
                removeSpotLikeLoading: loadingReducer[REMOVE_SPOT_LIKE_TYPE],
            },
        }),
    );

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
        dispatch(changeSpotDataAction({ property: 'contentId', value: '' }));
        dispatch(spotInitializeFormAction('detail'));
    };

    return (
        <SpotDetailModal
            accountId={accountId}
            spotData={spotData}
            spotError={spotError}
            detail={detail}
            loading={loading}
            onResetDetailSpot={onResetDetailSpot}
            onToggleDetailLike={onToggleDetailLike}
        />
    );
};

export default SpotDetailModalContainer;
