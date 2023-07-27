import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';

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
    border-radius: 0.5rem;
    padding: 0.5rem 0.5rem 1rem;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 2rem;
    padding: 0 0.5rem;
    margin-bottom: 0.5rem;
`;

const ModalTitle = styled.div`
    font-weight: bold;
`;

const ModalClose = styled(FontAwesomeIcon)`
    cursor: pointer;
    &:hover {
        color: lightgray;
    }
`;

const ModalBody = styled.div`
    padding: 0 0.5rem;
    margin: 0 auto;
`;

const ModalFooter = styled.div`
    height: 2rem;
    display: flex;
    justify-content: right;
    align-items: center;
    padding: 0 0.5rem;
    margin-top: 1rem;
`;

const ModalButton = styled.button`
    background-color: white;
    color: black;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    font-weight: bold;
    width: 80px;
    height: 40px;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    &:hover {
        color: white;
        background-color: #ececec;
    }
    & + & {
        margin-left: 1rem;
    }
`;

const Modal = ({
    modalVisible,
    title,
    children,
    modalCloseText = '닫기',
    modalConfirmText = '확인',
    onModalClose,
    onModalConfirm,
}) => {
    // 모달 외부 스크롤 고정
    useEffect(() => {
        if (modalVisible) {
            document.body.style.cssText = `
            position: fixed; 
            top: -${window.scrollY}px;
            overflow-y: scroll;
            width: 100%;`;
        }
        return () => {
            const scrollY = document.body.style.top;
            document.body.style.cssText = '';
            window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        };
    }, []);

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
