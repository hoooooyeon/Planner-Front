import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import palette from '../../lib/styles/palette';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
// import SideNav from './sideNav';
import { useState } from 'react';

const HeaderBlock = styled.div`
  /* width: 100%; */
  height: 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: none;
  z-index: 999;
  padding: 0 40px;
  margin: 0;
  a {
    color: white;
    text-decoration: none;
  }
  h1 {
    font-size: 1.2rem;
    font-weight: bold;
    @media all and (min-width: 768px) {
      font-size: 24px;
    }
    @media all and (min-width: 1025px) {
      font-size: 25px;
    }
  }
  ${(props) =>
    props.styled &&
    css`
      background-color: rgba(255, 255, 255, 0.8);
      a {
        color: black;
      }
    `}
`;

const MenuList = styled.ul`
  list-style: none;
  display: none;
  @media all and (min-width: 768px) {
    display: flex;
  }
  li {
    font-size: 0.9rem;
    margin: 0 30px;
    @media all and (min-width: 1025px) {
      font-size: 1rem;
    }
  }
`;

const AccountList = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  li {
    font-size: 11px;
    margin: 0 8px;
    @media all and (min-width: 768px) {
      font-size: 12px;
    }
    @media all and (min-width: 1025px) {
      font-size: 13px;
    }
    a {
      /* color: gray; */
    }
  }
`;

const Account = styled.div`
  display: flex;
  align-items: center;

  .user-img {
    //background-color: skyblue;
    border-radius: 10px;
    margin-right: 10px;
    width: 40px;
    height: 40px;
  }
`;

const Header = ({ account }) => {
  const headerRef = useRef();
  const [styled, setStyled] = useState(false);

  const headerStyling = () => {
    if (window.pageYOffset === 0) {
      setStyled(false);
    } else {
      setStyled(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', headerStyling);

    return () => {
      window.removeEventListener('scroll', headerStyling);
    };
  });

  return (
    <HeaderBlock ref={headerRef} styled={styled}>
      <h1>
        <Link to="/">한국다봄</Link>
      </h1>
      <MenuList>
        <li>
          <Link to="/PlannerList">플래너</Link>
        </li>
        <li>
          <Link to="/ReviewList">커뮤니티</Link>
        </li>
        <li>
          <Link to="/Spot">여행지</Link>
        </li>
      </MenuList>
      {account ? (
        <Account>
          {/* <img className="user-img" src="logo192.png"></img> */}
          <Link to="/Profile">{account.nickname}</Link>
        </Account>
      ) : (
        <AccountList>
          <li>
            <FontAwesomeIcon icon={faCircleUser} />
            <Link to="/Login">로그인</Link>
          </li>
          {/* <li>
            <Link to="/Register">회원가입</Link>
          </li> */}
        </AccountList>
      )}
      {/* <SideNav /> */}
    </HeaderBlock>
  );
};

export default Header;
