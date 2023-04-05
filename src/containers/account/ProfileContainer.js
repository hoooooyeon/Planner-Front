import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Profile from '../../components/account/Profile';
import { changeFieldAction, initializeAction, initializeErrorAction, profileImageUpdateAction, profileLoadAction, profileUpdateAction } from '../../modules/ProfileModule';

const ProfileContainer = () => {
    const dispatch = useDispatch();
    const { loading, accountId, profileField, profile, profileUpdate, profileError } = useSelector(({ loadingReducer, authReducer, profileReducer }) => ({
        loading: loadingReducer.loading,
        accountId: authReducer.account.accountId,
        profileField: profileReducer.profileField,
        profile: profileReducer.profile,
        profileUpdate: profileReducer.profileUpdate,
        profileError: profileReducer.profileError,
    }));

    const onChange = (e) => {
        const { name, value } = e.target;
        dispatch(changeFieldAction({ name, value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const { nickname, phone } = profileField;
        dispatch(initializeErrorAction());
        dispatch(profileUpdateAction({ accountId, nickname, phone }));
    };

    const onImageSubmit = (formData) => {
        dispatch(initializeErrorAction());
        dispatch(profileImageUpdateAction({ accountId, formData }));
    };

    useEffect(() => {
        return () => {
            dispatch(initializeErrorAction());
        };
    }, [dispatch]);

    useEffect(() => {
        dispatch(profileLoadAction(accountId));
    }, [dispatch, accountId, profileUpdate]);

    return <Profile loading={loading} profile={profile} profileError={profileError} onChange={onChange} onSubmit={onSubmit} onImageSubmit={onImageSubmit} />;
};

export default ProfileContainer;
