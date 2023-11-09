import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import LabelTextBox from '../common/LabelTextBox';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import Modal from '../common/Modal';
import Loading from '../common/Loading';

const Container = styled.div`
    width: 100%;
    /* margin-top: 5rem; */
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
    /* box-shadow: 0px 3px 6px var(--md-sys-color-shadow); */
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

const Auth = ({ loading, type, form, onChange, onSubmit, authError }) => {
    const isRegister = type == 'register';
    const isNormalError = typeof authError === 'string';
    const [modal, setModal] = useState(false);

    const handleModalConfirm = () => {
        setModal(!modal);
    };

    useEffect(() => {
        if (isRegister && isNormalError) {
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
                        placeholder="이메일"
                        label="아이디"
                        onChange={onChange}
                        value={form.email}
                        error={authError}
                    />
                    <LabelTextBox
                        type="password"
                        name="password"
                        placeholder="비밀번호"
                        label="비밀번호"
                        onChange={onChange}
                        value={form.password}
                        error={authError}
                    />
                    {isRegister && (
                        <>
                            <LabelTextBox
                                type="password"
                                name="passwordConfirm"
                                placeholder="비밀번호 확인"
                                label="비밀번호 확인"
                                onChange={onChange}
                                value={form.passwordConfirm}
                                error={authError}
                            />
                            <LabelTextBox
                                type="text"
                                name="username"
                                placeholder="이름"
                                label="이름"
                                onChange={onChange}
                                value={form.username}
                                error={authError}
                            />
                            <LabelTextBox
                                type="text"
                                name="nickname"
                                placeholder="닉네임"
                                label="닉네임"
                                onChange={onChange}
                                value={form.nickname}
                                error={authError}
                            />
                            <LabelTextBox
                                type="text"
                                name="phone"
                                placeholder="전화번호"
                                label="전화번호"
                                onChange={onChange}
                                value={form.phone}
                                error={authError}
                            />
                        </>
                    )}

                    {!isRegister && isNormalError && <Error>{authError}</Error>}
                    <Button onClick={onSubmit}>
                        {!loading ? !isRegister ? '로그인' : '회원가입' : <Loading size="small" />}
                    </Button>
                </FormBox>
                {isRegister || (
                    <LinkBox>
                        <NavLink to="/findId">아이디/비밀번호 찾기</NavLink>
                        <NavLink to="/register">회원가입</NavLink>
                    </LinkBox>
                )}
            </ContentBox>
            {isNormalError && (
                <Modal modalVisible={modal} title="알림" onModalConfirm={handleModalConfirm}>
                    <b>{authError}</b>
                </Modal>
            )}
        </Container>
    );
};

export default Auth;
