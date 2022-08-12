import styled from 'styled-components';
import Button from '../common/Button';

const EditProfileBlock = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    li {
      font-size: 1rem;
      margin-top: 20px;
    }
  }
  input {
    border: none;
    outline: none;
    &:focus {
      color: lightblue;
    }
  }
`;

const EditProfile = () => {
  return (
    <EditProfileBlock>
      <ul>
        <li>이메일</li>
        <li>비밀번호</li>
        <li>이름</li>
        <li>닉네임</li>
      </ul>
      <ul>
        <form>
          <li>
            <input
              name="email"
              value="bluebeer@naver.com"
              type="email"
              readOnly
            />
          </li>
          <li>
            <input name="password" value="*********" type="password" />
          </li>
          <li>
            <input name="username" value="길태수" type="text" />
          </li>
          <li>
            <input name="nickname" value="기무짜수" type="text" />
          </li>
        </form>
      </ul>
      <ul>
        <li></li>
        <li>
          <Button>변경</Button>
        </li>
        <li>
          <Button>변경</Button>
        </li>
        <li>
          <Button>변경</Button>
        </li>
      </ul>
    </EditProfileBlock>
  );
};

export default EditProfile;
