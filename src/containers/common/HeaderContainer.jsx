import Header from '../../components/common/Header';
import { useDispatch, useSelector } from 'react-redux';
import { persistor } from '../../index';
import { useHistory } from 'react-router';
import { accountNotificationLoadAction } from '../../modules/accountModule';
import { useEffect } from 'react';
import { invitationInitializeAction, inviteAcceptAction, inviteRejectAction } from '../../modules/invitationModule';
import { notificationInitializeAction, notifyDeleteAction, notifyReadAction } from '../../modules/notificationModule';
import { initialize, logoutAction } from '../../modules/authModule';

const HeaderContainer = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { loading, account, logout, notifications, invitation, notification } = useSelector(
        ({ loadingReducer, authReducer, accountReducer, invitationReducer, notificationReducer }) => ({
            loading: loadingReducer.loading,
            account: authReducer.account,
            logout: authReducer.logout,
            notifications: accountReducer.notifications,
            invitation: invitationReducer.invitation,
            notification: notificationReducer.notification,
        }),
    );

    const onChangePage = (page) => {
        history.push(`/${page}`);
    };

    const handleLogout = () => {
        dispatch(logoutAction());
    };

    const handleNotificationLoad = () => {
        if (account != null) {
            const accountId = account.accountId;
            dispatch(accountNotificationLoadAction(accountId));
        }
    };

    const handleInviteAccept = (link) => {
        dispatch(inviteAcceptAction(link));
    };

    const handleInviteReject = (link) => {
        dispatch(inviteRejectAction(link));
    };

    const handleInvitationInitialize = () => {
        dispatch(invitationInitializeAction());
    };

    useEffect(() => {
        handleNotificationLoad();
    }, [dispatch, account]);

    const handleNotificationInitialize = () => {
        dispatch(notificationInitializeAction());
    };

    const handleNotifyRead = (notificationId) => {
        dispatch(notifyReadAction({ notificationId }));
    };

    const handleNotifyDelete = (notificationId) => {
        dispatch(notifyDeleteAction({ notificationId }));
    };

    useEffect(() => {
        if (logout) {
            console.log('로그 아웃');
            persistor.purge();
            localStorage.removeItem('accessToken');
            dispatch(initialize());
            history.push('/');
        }
    }, [logout]);

    return (
        <Header
            loading={loading}
            account={account}
            onChangePage={onChangePage}
            onLogout={handleLogout}
            notifications={notifications}
            onNotificationLoad={handleNotificationLoad}
            onInviteReject={handleInviteReject}
            onInviteAccept={handleInviteAccept}
            invitationInfo={invitation}
            onInvitationInitialize={handleInvitationInitialize}
            notificationInfo={notification}
            onNotifyRead={handleNotifyRead}
            onNotifyDelete={handleNotifyDelete}
            onNotificationInitialize={handleNotificationInitialize}
        />
    );
};

export default HeaderContainer;
