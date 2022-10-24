import styled from 'styled-components';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';

const AuthBlock = styled.div`
  width: 600px;
  height: 600px;
  text-align: center;
  border: 1px solid ${palette.gray[0]};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const StyledForm = styled.form`
  width: 300px;
`;

const StyledInputFiledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px 0px;
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  height: 2rem;
  text-indent: 10px;
  border-radius: 5px;
  font-size: 0.7rem;
  background-color: ${palette.ivory[1]};
  &::placeholder {
    color: ${palette.gray[0]};
  }
  &:focus {
    color: ${palette.blue[1]};
  }
  & + & {
    margin-top: 0.5rem;
  }
`;

const VaildMsg = styled.span`
  display: block;
  width: 100%;
  text-align: start;
  color: red;
  font-size: 8px;
`;

const ButtonWithMarginTop = styled(Button)`
  display: block;
  margin: 2rem auto;
`;

const ChangeRegister = styled.div`
  background-color: ${palette.blue[1]};
  border: 1px solid ${palette.blue[1]};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 600px;
  p {
    color: ${palette.gray[0]};
  }
  a {
    width: 120px;
    height: 40px;
    border-radius: 50px;
    background-color: ${palette.ivory[0]};
    color: ${palette.blue[1]};
    text-decoration: none;
    text-align: center;
    line-height: 40px;
    font-weight: bold;
  }
`;

const ErrorDiv = styled.div`
  color: red;
  margin-top: 2rem;
`;


const AuthType = {
  login: '로그인',
  register: '회원가입',
};


const Auth = ({ type, form, onChange, onSubmit, valid, authError }) => {
  const AuthText = AuthType[type];

  return (
    <>
      {type === 'login' && (
        <ChangeRegister>
          <h2>Welcome Back!</h2>
          <p>아직 회원이 아니신가요?</p>
          <Link to="/Register">회원가입</Link>
        </ChangeRegister>
      )}
      <AuthBlock>
        <h2>{AuthText}</h2>
        <StyledForm onSubmit={onSubmit}>
          <StyledInputFiledContainer>
            <StyledInput name="email" placeholder="이메일" type="email" onChange={onChange} value={form.email} />
            {type === 'register' && form.email && valid && !valid.email && <VaildMsg>이메일 형식이 아닙니다.</VaildMsg>}
          </StyledInputFiledContainer>
          <StyledInputFiledContainer>
            <StyledInput name="password" placeholder="비밀번호" type="password" onChange={onChange} value={form.password} />
            {type === 'register' && form.password && valid && !valid.password && <VaildMsg>비밀번호 형식이 아닙니다.</VaildMsg>}
          </StyledInputFiledContainer>
          {type === 'register' && (
            <>
              <StyledInputFiledContainer>
                <StyledInput name="passwordConfirm" placeholder="비밀번호 확인" type="password" onChange={onChange} value={form.passwordConfirm} />
                {form.passwordConfirm && valid && !valid.passwordConfirm && <VaildMsg>비밀번호가 동일하지 않습니다.</VaildMsg>}
              </StyledInputFiledContainer>
              <StyledInputFiledContainer>
                <StyledInput name="userName" placeholder="이름" type="text" onChange={onChange} value={form.username} />
                {form.userName && valid && !valid.userName && <VaildMsg>이름 형식이 아닙니다.</VaildMsg>}
              </StyledInputFiledContainer>
              <StyledInputFiledContainer>
                <StyledInput name="nickName" placeholder="닉네임" type="text" onChange={onChange} value={form.nickname} />
                {form.nickName && valid && !valid.nickName && <VaildMsg>닉네임 형식이 아닙니다.</VaildMsg>}
              </StyledInputFiledContainer>
              <StyledInputFiledContainer>
                <StyledInput name="phone" placeholder="전화번호" type="text" onChange={onChange} value={form.phone} />
                {form.phone && valid && !valid.phone && <VaildMsg>전화번호 형식이 아닙니다.</VaildMsg>}
              </StyledInputFiledContainer>
            </>
          )}
          {authError && <ErrorDiv>{authError}</ErrorDiv>}
          <ButtonWithMarginTop big>{AuthText}</ButtonWithMarginTop>
        </StyledForm>
      </AuthBlock>
      {type === 'register' && (
        <ChangeRegister>
          <h2>Hello, Guest!</h2>
          <p>이미 회원이신가요?</p>
          <Link to="/Login">로그인</Link>
        </ChangeRegister>
      )}
    </>
  );
};

export default Auth;
