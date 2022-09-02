import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderBlock = styled.div`
  height: 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  z-index: 999;
  padding: 0 80px;
  a {
    color: black;
    text-decoration: none;
  }
`;

const MenuList = styled.ul`
  display: flex;
  list-style: none;
  li {
    font-size: 20px;
    margin: 0 30px;
  }
`;

const AccountList = styled.ul`
  display: flex;
  list-style: none;
  li {
    font-size: 12px;
    margin: 0 8px;
  }
`;

const Account = styled.div`
  display: flex;
  align-items: center;

  .user-img {
    background-color: skyblue;
    border-radius: 10px;
    margin-right: 10px;
    width: 40px;
    height: 40px;
  }
`;

const Header = ({ account }) => {
  return (
    <HeaderBlock>
      <h1>
        <Link to="/">낭만닷컴</Link>
      </h1>
      <MenuList>
        <li>
          <Link to="/PlannerList">플래너</Link>
        </li>
        <li>
          <Link to="/ShareList">공유</Link>
        </li>
        <li>
          <Link to="/ReviewList">여행후기</Link>
        </li>
        <li>
          <Link to="/Spot">여행지</Link>
        </li>
      </MenuList>
      {account ? (
        <Account>
          <div className='user-img'></div>
          <div>{account.nickname}</div>
        </Account>
      ) : (
        <AccountList>
          <li>
            <Link to="/Login">로그인</Link>
          </li>
          <li>
            <Link to="/Register">회원가입</Link>
          </li>
        </AccountList>
      )}
    </HeaderBlock>
  );
};

export default Header;
