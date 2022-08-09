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

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

const Header = () => {
  return (
    <HeaderBlock>
      <h1>
        <StyledLink to="/">낭만닷컴</StyledLink>
      </h1>
      <MenuList>
        <li>
          <StyledLink to="/PlannerList">플래너</StyledLink>
        </li>
        <li>
          <StyledLink to="/ShareList">공유</StyledLink>
        </li>
        <li>
          <StyledLink to="/ReviewList">여행후기</StyledLink>
        </li>
        <li>
          <StyledLink to="/Spot">여행지</StyledLink>
        </li>
      </MenuList>
      <AccountList>
        <li>
          <StyledLink to="/Login">로그인</StyledLink>
        </li>
        <li>
          <StyledLink to="/Register">회원가입</StyledLink>
        </li>
      </AccountList>
    </HeaderBlock>
  );
};

export default Header;
