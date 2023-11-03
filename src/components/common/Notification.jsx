import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faRectangleXmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal';
import { useEffect } from 'react';
import { forwardRef } from 'react';
import { useRef } from 'react';
import Loading from './Loading';

const Box = styled.div`
    box-sizing: border-box;
    padding: 10px;
    border-radius: 6px;
    @media all and (max-width: 767px) {
        position: absolute;
        left: 0;
    }
`;

const NotificationActionBox = styled.div`
    color: ${(props) => props.theme.secondaryColor};
    &:hover {
        cursor: pointer;
        color: ${(props) => props.theme.hoverColor};
    }
`;

const NotificationBox = styled.div`
    position: absolute;
    margin-top: 20px;
    right: 14px;
    width: 250px;
    height: 260px;
    border-radius: 6px;
    box-shadow: 0px 3px 6px ${(props) => props.theme.shadowColor};
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    @media all and (max-width: 767px) {
        right: 0;
        left: 10px;
        top: 27px;
    }
`;

const NotificationHeader = styled.div`
    /* height: 30px; */
    color: ${(props) => props.theme.primaryColor};
    padding: 10px;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    background-color: ${(props) => props.theme.mainColor};
`;

const NotificationBody = styled.div`
    display: flex;
    flex-direction: column;
    height: 92%;
    overflow: auto;
    background-color: white;
    border-radius: 0.5rem;
`;

const NotificationList = styled.ul`
    padding: 0px;
    margin: 0px;
`;

const NotiBox = styled.li`
    margin: 10px;
    padding: 10px;
    box-shadow: 0px 3px 6px ${(props) => props.theme.shadowColor};
    background-color: ${(props) => props.theme.primaryBackgroundColor};

    &:hover {
        background-color: ${(props) => props.theme.mainColor};
        p {
            color: ${(props) => props.theme.primaryColor};
        }
    }
`;

const NotiContent = styled.a`
    display: block;
    padding: 10px;
    color: ${(props) => (props.read ? props.theme.tertiaryColor : props.theme.secondaryColor)};

    p {
        margin: 0px;
        /* max-height: 60px; */
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 11px;
        font-weight: bolder;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
`;

const NotificationItem = ({ item, onItemClick, onNotifyDelete }) => {
    return (
        <NotiBox onClick={(e) => onItemClick(e, item)}>
            <NotiContent href={item.link} read={item.read}>
                <p>{item.content}</p>
            </NotiContent>
        </NotiBox>
    );
};

const Notification = forwardRef((props, ref) => {
    const {
        loading,
        view,
        notifications,
        onClose,
        onChange,
        onInviteReject,
        onInviteAccept,
        invitationInfo,
        onInvitationInitialize,
        notificationInfo,
        onNotifyRead,
        onNotifyDelete,
        onNotificationInitialize,
    } = props;

    const [isPopup, setIsPopup] = useState(false);
    const [errorModal, setErrorModal] = useState(false);
    const [selectItem, setSeletItem] = useState(null);
    const modalRef = useRef(null);
    const errorModalRef = useRef(null);

    const handleItemClick = (e, item) => {
        if (item.notificationType === 4) {
            e.preventDefault();
            setSeletItem(item);
            setIsPopup(true);
            onNotifyRead(item.id);
        }

        onClose();
    };

    const handleModalClose = () => {
        setIsPopup(false);
    };

    const handleModalCancle = () => {
        setIsPopup(false);
        onInviteReject(selectItem.link);
        onNotifyDelete(selectItem.id);
    };

    const handleModalConfirm = () => {
        onInviteAccept(selectItem.link);
        onNotifyDelete(selectItem.id);
    };

    const handleErrorModalClose = () => {
        setErrorModal(false);
        onInvitationInitialize();
        onNotificationInitialize();
    };

    const modalSideCheck = (state, ref, target, onClose) => {
        if (state && ref.current && !ref.current.contains(target)) {
            onClose();
        }
    };

    const handleSideClick = (e) => {
        modalSideCheck(isPopup, modalRef, e.target, () => setIsPopup(false));
        modalSideCheck(errorModal, errorModalRef, e.target, () => setErrorModal(false));
    };

    useEffect(() => {
        document.addEventListener('click', handleSideClick);
        return () => {
            document.removeEventListener('click', handleSideClick);
        };
    });

    useEffect(() => {
        setIsPopup(false);

        if (invitationInfo.message) {
            setErrorModal(true);
        }
    }, [invitationInfo]);

    return (
        <Box>
            <NotificationActionBox onClick={onChange}>
                <FontAwesomeIcon icon={faBell} size="lg" />
            </NotificationActionBox>
            {view && (
                <NotificationBox ref={ref}>
                    <NotificationHeader>알림</NotificationHeader>
                    <NotificationBody>
                        {loading ? (
                            <Loading size="small" pos="center" />
                        ) : (
                            <NotificationList>
                                {notifications.map((item) => (
                                    <NotificationItem item={item} onItemClick={handleItemClick} />
                                ))}
                            </NotificationList>
                        )}
                    </NotificationBody>
                </NotificationBox>
            )}
            {isPopup && (
                <Modal
                    ref={modalRef}
                    modalVisible={isPopup}
                    title="초대"
                    modalCancleText="거절"
                    modalConfirmText="수락"
                    onModalClose={handleModalClose}
                    onModalCancle={handleModalCancle}
                    onModalConfirm={handleModalConfirm}
                    loading={loading}
                >
                    <p>{selectItem.content}</p>
                </Modal>
            )}
            {errorModal && (
                <Modal
                    ref={errorModalRef}
                    modalVisible={errorModal}
                    title="정보"
                    onModalClose={handleErrorModalClose}
                    onModalCancle={handleErrorModalClose}
                    onModalConfirm={handleErrorModalClose}
                >
                    <p>{invitationInfo.message}</p>
                    <p>{notificationInfo.message}</p>
                </Modal>
            )}
        </Box>
    );
});

export default Notification;
