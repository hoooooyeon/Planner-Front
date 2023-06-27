import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import palette from '../../lib/styles/palette';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import SideNav from './sideNav';
import { useState } from 'react';

const HeaderBlock = styled.div`
    height: 75px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 999;
    padding: 0 9rem;
    a {
        color: black;
        text-decoration: none;
    }
    h1 {
        font-size: 23px;
        @media all and (min-width: 768px) {
            font-size: 24px;
        }
        @media all and (min-width: 1025px) {
            font-size: 25px;
        }
    }
`;

const MenuList = styled.ul`
    list-style: none;
    display: none;
    @media all and (min-width: 768px) {
        display: flex;
    }
    li {
        font-size: 15px;
        margin: 0 30px;
        @media all and (min-width: 1025px) {
            font-size: 17px;
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
            color: gray;
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

    const headerShadow = () => {
        if (window.pageYOffset === 0) {
            headerRef.current.style.boxShadow = 'none';
        } else {
            headerRef.current.style.boxShadow = `1px 5px 7px 1px ${palette.gray[0]}`;
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', headerShadow);

        return () => {
            window.removeEventListener('scroll', headerShadow);
        };
    });

    return (
        <HeaderBlock ref={headerRef}>
            <h1>
                <Link to="/">한국다봄</Link>
            </h1>
            <MenuList>
                <li>
                    <Link to="/PlannerList">플래너</Link>
                </li>
                <li>
                    <Link to="/reviews">여행후기</Link>
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
                        <Link to="/Login">로그인</Link>
                    </li>
                    <li>
                        <Link to="/Register">회원가입</Link>
                    </li>
                </AccountList>
            )}
            <SideNav />
        </HeaderBlock>
    );
};

export default Header;
