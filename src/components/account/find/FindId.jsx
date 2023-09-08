import { useState } from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import styled, { css } from 'styled-components';
import LabelTextBox from '../../common/LabelTextBox';

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

const VerificationBox = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const VerificationButton = styled.button`
    width: 75px;
    margin: 10px 0px;
    height: 36px;
    border: none;
    border-radius: 6px;
    background-color: ${(props) => props.theme.primaryButtonBackgroundColor};
    color: ${(props) => props.theme.secondaryColor};
    transition: box-shadow 0.1s ease-in;

    &:hover {
        box-shadow: 0px 3px 6px ${(props) => props.theme.shadowColor};
        background-color: ${(props) => props.theme.hoverColor};
        color: ${(props) => props.theme.primaryColor};
    }
`;

const FindId = ({ code, form, verification, authError, onChange, handlePhoneCodeSend }) => {
    return (
        <Container>
            <ContentBox>
                <LogoText>한국다봄</LogoText>

                <FormBox>
                    {/* 이름과 전화번호를 입력한 뒤 인증 요청 버튼 클릭 */}
                    <LabelTextBox
                        type="text"
                        name="username"
                        placeholder="이름"
                        label="이름"
                        onChange={onChange}
                        value={form.name}
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
                    <VerificationBox>
                        <VerificationButton>인증 요청</VerificationButton>
                    </VerificationBox>
                    {/* 인증 요청 이후에 생성된 input에 인증 코드를 적고 아이디 찾기 클릭 */}
                    {verification && (
                        <LabelTextBox type="text" name="VerificationCode" placeholder="인증코드" label="인증코드" />
                    )}
                    {/* 아이디 찾기 결과 페이지로 이동 */}
                    <Button isCode={code && code.length > 0}>아이디 찾기</Button>
                </FormBox>

                <LinkBox>
                    <NavLink to="findPassword">비밀번호 찾기</NavLink>
                </LinkBox>
            </ContentBox>
        </Container>
    );
};

export default FindId;
