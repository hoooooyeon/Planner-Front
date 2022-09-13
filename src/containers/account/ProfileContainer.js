import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Profile from "../../components/account/Profile";
import { changeFieldAction, profileLoadAction } from "../../modules/profileModule";

const ProfileContainer = () => {
    const dispatch = useDispatch();
    const { loading, accountId, profileFiled, profile, profileError } = useSelector(({ loadingReducer, authReducer, profileReducer }) => ({
        loading: loadingReducer.loading,
        accountId: authReducer.account.accountId,
        profileFiled: profileReducer.profileFiled,
        profile: profileReducer.profile,
        profileError: profileReducer.profileError
    }));

    const onChange = (e) => {
        const { name, value } = e.target;
        dispatch(changeFieldAction({ name, value }));
    };

    useEffect(() => {
        dispatch(profileLoadAction(accountId));
    }, [accountId]);

    return (
        loading || (
            <Profile profile={profile} profileError={profileError} />
        )
    );
};

export default ProfileContainer;