import { Link } from 'react-router-dom';
import styled from 'styled-components';
import EditProfile from './EditProfile';
import Button from '../common/Button';

const ProfileBlock = styled.div`
  margin: 100px auto 0px;
  width: 80%;
  height: auto;
  min-height: 100%;
  padding-bottom: 210px;
`;
const MyMenu = styled.div`
  a {
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: bold;
    color: black;
  }
  a + a {
    margin-left: 30px;
    color: lightgray;
  }
`;

const StyledButton = styled(Button)`
  color: lightblue;
  background-color: white;
  margin-top: 30px;
  float: right;
`;

const EditProfileBlock = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  .nick {
    text-align: center;
  }

  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    border: 2px solid silver;
    border-radius: 6px;
    padding: 20px;
    width: 350px;

    li {
      /* display: flex;
      flex-direction: row;
      justify-content: space-between; */
      font-size: 1rem;
      margin: 20px 0px;
    }

    li label {
      display: block;
      margin-bottom: 10px;
    }

  }

  input {
    width: 100%;
    border: none;
    outline: none;
    border-bottom: 2px solid silver;

    &:read-only {
      border-bottom: 2px solid #F38181;
    }
  }
`;

const ButtonBlock = styled.div`
  text-align: right;
`;

const My = () => {
  return (
    <ProfileBlock>
      <MyMenu>
        <Link to="/Profile">프로필</Link>
        <Link to="/MyLike">좋아요</Link>
        <hr />
      </MyMenu>
      <EditProfileBlock>
        <div>
          <img src='logo192.png' alt='프로필 이미지' />
          <div className='nick'>별명</div>
        </div>
        <form>
          <ul>
            <li>
              <label for="email">이메일</label>
              <input id="email" name="email" type="email" value="test@naver.com" readOnly />
            </li>
            <li>
              <label for="username">이름</label>
              <input id="username" name="username" type="text" value="aaa" readOnly />
            </li>
            <li>
              <label for="nickname" type="text">별명</label>
              <input id="nickname" name="nickname" type="text" value="aaa" />
            </li>
            <li>
              <label for="phone" type="text">전화번호</label>
              <input id="phone" name="phone" type="text" value="01012345678" />
            </li>
          </ul>
          <ButtonBlock>
            <Button big>저장</Button>
          </ButtonBlock>
        </form>
      </EditProfileBlock>
      {/* <EditProfile /> */}
      {/* <StyledButton big>회원 탈퇴</StyledButton> */}
    </ProfileBlock>
  );
};

export default My;
