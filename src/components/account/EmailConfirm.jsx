import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import styled, { css } from 'styled-components';
import LabelTextBox from '../common/LabelTextBox';
import Modal from '../common/Modal';
import Timer from '../common/Timer';
import Loading from '../common/Loading';
import { RegisterStatus } from '../../enum/RegisterStatus';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    /* padding: 5rem 0px; */
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

const FormBox = styled.form`
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
    background-color: ${(props) => props.theme.primaryButtonBackgroundColor};
    color: ${(props) => props.theme.secondaryColor};
    transition: box-shadow 0.1s ease-in;

    &:hover {
        box-shadow: 0px 3px 6px ${(props) => props.theme.shadowColor};
    }

    ${(props) =>
        props.isCode &&
        css`
            background-color: ${(props) => props.theme.secondaryButtonBackgroundColor};
            color: ${(props) => props.theme.primaryColor};
        `}
`;

const LinkBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 0.8rem;
`;

const EmailConfirm = ({
    loading,
    emailConfirm,
    emailCodeRequest,
    onCodeTimerEnd,
    onChange,
    onEmailConfirmClick,
    authError,
}) => {
    const isNormalError = typeof authError === 'string';
    const [modal, setModal] = useState(false);

    const handleModalClose = () => {
        setModal(false);
    };

    const handleModalConfirm = () => {
        setModal(!modal);
    };

    useEffect(() => {
        if (isNormalError) {
            setModal(true);
        }
    }, [isNormalError, authError]);

    return (
        <Container>
            <ContentBox>
                <LogoText>한국다봄</LogoText>
                <FormBox onSubmit={onEmailConfirmClick}>
                    <LabelTextBox
                        type="text"
                        name="email"
                        placeholder="이메일"
                        label="이메일"
                        onChange={onChange}
                        value={emailConfirm.email}
                        error={authError}
                    />
                    {/* 인증 요청 이후에 생성된 input에 인증 코드를 적고 아이디 찾기 클릭 */}
                    {emailCodeRequest && (
                        <LabelTextBox
                            type="text"
                            name="code"
                            placeholder="인증코드"
                            label="인증코드"
                            onChange={onChange}
                            value={emailConfirm.code}
                            error={authError}
                        />
                    )}
                    {emailCodeRequest && (
                        <>
                            <div>이메일에 인증코드를 전송했습니다.</div>
                            <p>
                                인증코드 유효시간: <Timer onTimerEnd={onCodeTimerEnd} />
                            </p>
                        </>
                    )}

                    <Button onClick={onEmailConfirmClick}>
                        {loading.emailCodeRequestLoading || loading.emailCodeCheckLoading ? (
                            <Loading size="small" />
                        ) : !emailCodeRequest ? (
                            '인증코드 전송'
                        ) : (
                            '인증하기'
                        )}
                    </Button>
                </FormBox>
                <LinkBox>
                    <NavLink to="findPassword">비밀번호 찾기</NavLink>
                </LinkBox>
            </ContentBox>
            {isNormalError && (
                <Modal
                    modalVisible={modal}
                    title="알림"
                    onModalClose={handleModalClose}
                    onModalConfirm={handleModalConfirm}
                >
                    <b>{authError}</b>
                </Modal>
            )}
        </Container>
    );
};

export default EmailConfirm;
