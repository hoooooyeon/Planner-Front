import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import styled, { keyframes } from 'styled-components';
import LabelTextBox from '../../common/LabelTextBox';
import Modal from '../../common/Modal';

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

const Error = styled.b`
    font-size: 0.8rem;
    color: ${(props) => props.theme.errorColor};
    margin: 3px 0px;
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

const LinkBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 0.8rem;
`;

const loadingAnimation = keyframes`
    form {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const LoadingCircle = styled.div`
    border-radius: 50%;
    border: 8px solid ${(props) => props.theme.outlineColor};
    border-top: 8px solid ${(props) => props.theme.mainColor};
    width: 16px;
    height: 16px;
    animation: ${loadingAnimation} 1s linear infinite;
    margin: 0px auto;
`;

const FindPassword = ({ form, accountError, pwFinding, loading, onChange, handlePasswordFind }) => {
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
                <FormBox>
                    <LabelTextBox
                        type="email"
                        name="email"
                        placeholder="이메일을 적어주세요."
                        label="아이디(이메일)"
                        onChange={onChange}
                        value={form.email}
                        error={accountError}
                    />
                    {isNormalError && <Error>{accountError}</Error>}

                    <Button onClick={handlePasswordFind}>
                        {loading && pwFinding ? <LoadingCircle /> : '비밀번호 찾기'}
                    </Button>
                </FormBox>
                <LinkBox>
                    <NavLink to="findId">아이디 찾기</NavLink>
                </LinkBox>
            </ContentBox>
            {isNormalError && (
                <Modal modalVisible={modal} title="알림" onModalConfirm={handleModalConfirm}>
                    <b>{accountError}</b>
                </Modal>
            )}
        </Container>
    );
};

export default FindPassword;
