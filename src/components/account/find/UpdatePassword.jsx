import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import LabelTextBox from '../../common/LabelTextBox';
import Modal from '../../common/Modal';
import Loading from '../../common/Loading';

const Container = styled.div`
    width: 100%;
    padding: 5rem 0px;
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ContentBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 320px;
    background-color: ${(props) => props.theme.secondaryBackgroundColor};
    border-radius: 6px;
    padding: 20px;
`;

const LogoText = styled.b`
    font-size: 2rem;
`;

const FormBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    color: ${(props) => props.theme.secondaryColor};
`;

const Button = styled.button`
    width: 100%;
    margin: 10px 0px;
    height: 36px;
    border: none;
    border-radius: 6px;
    background-color: ${(props) => props.theme.mainColor};
    color: ${(props) => props.theme.primaryColor};
    transition: box-shadow 0.1s ease-in;

    &:hover {
        box-shadow: 0px 3px 6px ${(props) => props.theme.shadowColor};
    }
`;

const UpdatePassword = ({
    accountError,
    passwordChangeForm,
    onChange,
    handlePasswordChange,
    loading,
    passwordChangeRequest,
}) => {
    const history = useHistory();
    const isNormalError = typeof accountError === 'string';
    const [modal, setModal] = useState(false);

    const handleModalConfirm = () => {
        setModal(!modal);
    };

    useEffect(() => {
        if (isNormalError) {
            setModal(true);
        }
    }, [isNormalError]);

    return (
        <Container>
            <ContentBox>
                <LogoText>한국다봄</LogoText>
                {!passwordChangeRequest ? (
                    <>
                        <FormBox>
                            <LabelTextBox
                                type="password"
                                name="password"
                                placeholder="새 비밀번호"
                                label="새 비밀번호"
                                onChange={onChange}
                                value={passwordChangeForm.newPassword}
                                error={accountError}
                            />
                            <LabelTextBox
                                type="password"
                                name="passwordConfirm"
                                placeholder="새 비밀번호 확인"
                                label="새 비밀번호 확인"
                                onChange={onChange}
                                value={passwordChangeForm.confirmPassword}
                                error={accountError}
                            />
                            <Button onClick={handlePasswordChange}>
                                {loading && !passwordChangeRequest ? <Loading size="small" /> : '비밀번호 변경'}
                            </Button>
                        </FormBox>
                    </>
                ) : (
                    <>
                        <p>비밀번호가 변경되었습니다. 로그인 페이지로 이동합니다.</p>
                        <Button onClick={() => history.push('/login')}>확인</Button>
                    </>
                )}
            </ContentBox>
            {isNormalError && (
                <Modal modalVisible={modal} title="알림" onModalConfirm={handleModalConfirm}>
                    <b>{accountError}</b>
                </Modal>
            )}
        </Container>
    );
};

export default UpdatePassword;
