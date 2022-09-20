import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Profile from "../../components/account/Profile";
import { changeFieldAction, initializeAction, profileLoadAction, profileUpdateAction } from "../../modules/profileModule";

const ProfileContainer = () => {
    const dispatch = useDispatch();
    const { accountId, profile, profileField, profileError } = useSelector(({ authReducer, profileReducer }) => ({
        accountId: authReducer.account.accountId,
        profile: profileReducer.profile,
        profileField: profileReducer.profileField,
        profileError: profileReducer.profileError
    }));

    const onChange = (e) => {
        const { name, value } = e.target;
        dispatch(changeFieldAction({ name, value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const { username, nickname } = profileField;

        dispatch(profileUpdateAction({ accountId, username, nickname }));
    };

    useEffect(() => {
        dispatch(initializeAction());
    }, []);

    useEffect(() => {
        dispatch(profileLoadAction(accountId));
    }, [accountId]);

    return (
        <Profile profile={profile} profileError={profileError} onChange={onChange} onSubmit={onSubmit} />
    );
};

export default ProfileContainer;