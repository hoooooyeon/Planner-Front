import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const AuthBlock = styled.div`
  width: 400px;
  text-align: center;
  border: 1px solid lightgray;
  border-radius: 5px;
  margin: 150px auto;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  width: 20rem;
  height: 2rem;
  border-bottom: 1px solid gray;
  font-size: 1rem;
  &::placeholder {
    color: lightgray;
  }
  &:focus {
    color: lightblue;
  }
  & + & {
    margin-top: 0.5rem;
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 2rem;
`;

const Footer = styled.div`
  text-align: right;
  padding: 20px;
  a {
    color: lightblue;
    text-decoration: none;
  }
`;

const AuthType = {
  login: '로그인',
  register: '회원가입',
};

const Auth = ({ type }) => {
  const AuthText = AuthType[type];
  return (
    <AuthBlock>
      <h2>{AuthText}</h2>
      <form>
        <StyledInput name="email" placeholder="이메일" type="email" />
        <StyledInput name="password" placeholder="비밀번호" type="password" />
        {type === 'register' && (
          <>
            <StyledInput name="passwordConfirm" placeholder="비밀번호 확인" type="password" />
            <StyledInput name="username" placeholder="이름" type="text" />
            <StyledInput name="nickname" placeholder="닉네임" type="text" />
          </>
        )}
        <ButtonWithMarginTop big>{AuthText}</ButtonWithMarginTop>
      </form>
      <Footer>{type === 'login' ? <Link to="/Register">회원가입</Link> : <Link to="/Login">로그인</Link>}</Footer>
    </AuthBlock>
  );
};

export default Auth;
