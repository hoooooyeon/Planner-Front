import { Link } from 'react-router-dom';
import styled from 'styled-components';
import EditProfile from './EditProfile';
import Button from '../common/Button';

const ProfileBlock = styled.div`
  margin: 100px auto;
  width: 80%;
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

const My = () => {
  return (
    <ProfileBlock>
      <MyMenu>
        <Link to="/Profile">프로필</Link>
        <Link to="/MyLike">좋아요</Link>
        <hr />
      </MyMenu>
      <EditProfile />
      <StyledButton big>회원 탈퇴</StyledButton>
    </ProfileBlock>
  );
};

export default My;
