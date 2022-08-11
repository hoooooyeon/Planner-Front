import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const AuthBlock = styled.div`
  margin: 75px auto;
  width: 600px;
  border: 1px solid red;
  text-align: center;
  form {
    display: flex;
  }
`;

const StyledInput = styled.input``;

const Footer = styled.div`
  text-align: right;
  a {
    color: lightblue;
    text-decoration: none;
  }
`;

const Auth = (type) => {
  return (
    <AuthBlock>
      <h2>로그인</h2>
      <form>
        <StyledInput name="email" placeholder="이메일" type="email" />
        <StyledInput name="password" placeholder="비밀번호" type="password" />
        {type === 'register' && (
          <>
            <StyledInput
              name="passwordConfirm"
              placeholder="비밀번호 확인"
              type="password"
            />
            <StyledInput name="username" placeholder="이름" type="text" />
            <StyledInput name="nickname" placeholder="닉네임" type="text" />
          </>
        )}
        <Button big>로그인</Button>
      </form>
      <Footer>
        {type === 'login' ? (
          <Link to="/Register">회원가입</Link>
        ) : (
          <Link to="/Login">로그인</Link>
        )}
      </Footer>
    </AuthBlock>
  );
};

export default Auth;
