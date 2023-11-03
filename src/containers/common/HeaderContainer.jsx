import Header from '../../components/common/Header';
import { useDispatch, useSelector } from 'react-redux';
import { persistor } from '../../index';
import { useHistory } from 'react-router';
import { accountNotificationLoadAction } from '../../modules/accountModule';
import { useEffect } from 'react';
import { invitationInitializeAction, inviteAcceptAction, inviteRejectAction } from '../../modules/invitationModule';
import { notificationInitializeAction, notifyDeleteAction, notifyReadAction } from '../../modules/notificationModule';

const HeaderContainer = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { loading, account, notifications, invitation, notification } = useSelector(
        ({ loadingReducer, authReducer, accountReducer, invitationReducer, notificationReducer }) => ({
            loading: loadingReducer.loading,
            account: authReducer.account,
            notifications: accountReducer.notifications,
            invitation: invitationReducer.invitation,
            notification: notificationReducer.notification,
        }),
    );

    const handlePurge = () => {
        persistor.purge();
        window.localStorage.clear();
    };

    const onChangePage = (page) => {
        history.push(`/${page}`);
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

    return (
        <Header
            loading={loading}
            account={account}
            handlePurge={handlePurge}
            onChangePage={onChangePage}
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
