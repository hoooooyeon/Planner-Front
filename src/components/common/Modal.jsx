import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Modalbackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalBox = styled.div`
    position: absolute;
    z-index: 1;
    background-color: white;
    min-width: 450px;
    border-radius: 4px;
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 35px;
`;

const ModalTitle = styled.div`
    color: black;
    font-weight: bold;
    margin-left: 20px;
`;

const ModalClose = styled(FontAwesomeIcon)`
    margin-right: 20px;

    &:hover {
        color: skyblue;
    }
`;

const ModalBody = styled.div`
    min-height: 100px;
    margin-top: 10px;
    margin-left: 20px;
    font-weight: bold;
`;

const ModalFooter = styled.div`
    min-height: 50px;
    display: flex;
    justify-content: right;
    align-items: center;

    & > button:last-child {
        margin-right: 20px;
    }
`;

const ModalButton = styled.button`
    background-color: white;
    color: black;
    font-weight: bold;
    width: 80px;
    height: 40px;
    border: none;
    border-radius: 4px;

    &:hover {
        color: skyblue;
        background-color: #ececec;
    }
`;

const Modal = ({ modalVisible, title, children, modalCloseText = '닫기', modalConfirmText = '확인', onModalClose, onModalConfirm }) => {
    if (!modalVisible) return null;
    return (
        <Modalbackground>
            <ModalBox>
                <ModalHeader>
                    <ModalTitle>{title}</ModalTitle>
                    <ModalClose icon={faXmark} onClick={onModalClose} />
                </ModalHeader>
                <ModalBody>{children}</ModalBody>
                <ModalFooter>
                    <ModalButton onClick={onModalClose}>{modalCloseText}</ModalButton>
                    <ModalButton onClick={onModalConfirm}>{modalConfirmText}</ModalButton>
                </ModalFooter>
            </ModalBox>
        </Modalbackground>
    );
};

export default Modal;
