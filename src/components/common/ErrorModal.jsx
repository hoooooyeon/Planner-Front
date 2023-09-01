import styled from 'styled-components';
import Modal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

const ErrorBox = styled.div`
    width: 17rem;
    height: 10rem;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`;

const ErrorIcon = styled(FontAwesomeIcon)`
    width: 3rem;
    height: 3rem;
    color: ${(props) => props.theme.errorColor};
`;

const ErrorText = styled.div`
    font-size: 1rem;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ErrorModal = ({ errorState, errorMessage, onCloseError }) => {
    return (
        <Modal modalVisible={errorState} title="에러 발생!" onModalClose={onCloseError} onModalConfirm={onCloseError}>
            <ErrorBox>
                <ErrorIcon icon={faTriangleExclamation} />
                <ErrorText>{errorMessage}</ErrorText>
            </ErrorBox>
        </Modal>
    );
};

export default ErrorModal;
