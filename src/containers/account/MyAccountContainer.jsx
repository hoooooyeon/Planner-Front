import { useDispatch, useSelector } from 'react-redux';
import MyAccount from '../../components/account/MyAccount';
import {
    ACCOUNT_IMAGE_UPDATE_TYPE,
    ACCOUNT_LIKE_PLANNER_LIST_LOAD_TYPE,
    ACCOUNT_LIKE_SPOT_LIST_LOAD_TYPE,
    ACCOUNT_LOAD_TYPE,
    ACCOUNT_UPDATE_TYPE,
    accountImageUpdateAction,
    accountLikePlannerListLoadAction,
    accountLikeSpotListLoadAction,
    accountLoadAction,
    accountMyPlannerListLoadAction,
    accountUpdateAction,
    changeFieldAction,
} from '../../modules/accountModule';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import spotReducer, {
    changeContentIdAction,
    changeDetailSpotAction,
    loadDetailSpotAction,
} from '../../modules/spotModule';

const MyAccountContainer = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { loading, auth, account, accountField, likeList, spotData } = useSelector(
        ({ loadingReducer, authReducer, accountReducer, spotReducer }) => ({
            loading: {
                profileLoading: loadingReducer[ACCOUNT_LOAD_TYPE],
                profileUpdateLoading: loadingReducer[ACCOUNT_UPDATE_TYPE],
                profileImageUpdateLoading: loadingReducer[ACCOUNT_IMAGE_UPDATE_TYPE],
                likePlannerListLoading: loadingReducer[ACCOUNT_LIKE_PLANNER_LIST_LOAD_TYPE],
                likeSpotListLoading: loadingReducer[ACCOUNT_LIKE_SPOT_LIST_LOAD_TYPE],
            },
            auth: authReducer.account,
            accountField: accountReducer.accountField,
            likeList: accountReducer.likeList,
            spotData: spotReducer.spotData,
        }),
    );

    const handleProfileLoad = () => {
        if (auth) {
            const { accountId } = auth;
            dispatch(accountLoadAction(accountId));
        }
    };

    const handleLikeListLoad = (data) => {
        if (auth) {
            const { accountId } = auth;
            const queryString = {
                accountId,
                ...data,
            };

            if (data.postType === 1) {
                dispatch(accountLikePlannerListLoadAction(queryString));
            } else if (data.postType === 2) {
                dispatch(accountLikeSpotListLoadAction(queryString));
            }
        }
    };

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        dispatch(changeFieldAction({ form: 'accountField', name, value }));
    };

    const handleProfileUpdate = (e) => {
        e.preventDefault();

        if (auth && accountField) {
            const { accountId } = auth;
            const { nickname, phone } = accountField;
            dispatch(accountUpdateAction({ accountId, nickname, phone }));
        }
    };

    const handleProfileImageUpdate = (formData) => {
        if (auth) {
            const { accountId } = auth;
            dispatch(accountImageUpdateAction({ accountId, formData }));
        }
    };

    const handleLikePlannerClick = (plannerId) => {
        history.push(`/planners/${plannerId}`);
    };

    // 여행지 상세정보 모달 열기
    const handleLikeSpotClick = (spotInfo) => {
        dispatch(changeDetailSpotAction(spotInfo));
        dispatch(changeContentIdAction(spotInfo.contentId));
    };

    // 여행지 상세정보 로드
    const { contentId } = { ...spotData };
    useEffect(() => {
        if (contentId !== '') {
            dispatch(loadDetailSpotAction({ contentId }));
        }
    }, [dispatch, spotData]);

    if (!auth) {
        alert('정상적인 접근이 아닙니다.');
        history.push('/');
    }

    return (
        <MyAccount
            loading={loading}
            account={auth}
            accountField={accountField}
            likeList={likeList}
            onProfileLoad={handleProfileLoad}
            onLikeListLoad={handleLikeListLoad}
            onProfileChange={handleProfileChange}
            onProfileUpdate={handleProfileUpdate}
            onProfileImageUpdate={handleProfileImageUpdate}
            onLikePlannerClick={handleLikePlannerClick}
            onLikeSpotClick={handleLikeSpotClick}
        />
    );
};

export default MyAccountContainer;
