import { useDispatch, useSelector } from 'react-redux';
import MyAccount from '../../components/account/MyAccount';
import {
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

const MyAccountContainer = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { loading, auth, account, accountField, likeList } = useSelector(
        ({ loadingReducer, authReducer, accountReducer }) => ({
            loading: loadingReducer.loading,
            auth: authReducer.account,
            accountField: accountReducer.accountField,
            likeList: accountReducer.likeList,
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
        if (auth && account) {
            const { accountId } = auth;
            dispatch(accountImageUpdateAction({ accountId, formData }));
        }
    };

    if (!auth) {
        alert('정상적인 접근이 아닙니다.');
        history.push('/');
    }

    return (
        <MyAccount
            account={auth}
            accountField={accountField}
            likeList={likeList}
            onProfileLoad={handleProfileLoad}
            onLikeListLoad={handleLikeListLoad}
            onProfileChange={handleProfileChange}
            onProfileUpdate={handleProfileUpdate}
            onProfileImageUpdate={handleProfileImageUpdate}
        />
    );
};

export default MyAccountContainer;
