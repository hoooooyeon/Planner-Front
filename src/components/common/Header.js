import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import palette from '../../lib/styles/palette';

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
        font-size: 1.2rem;
        margin: 0 30px;
    }
`;

const AccountList = styled.ul`
    display: flex;
    list-style: none;
    li {
        font-size: 0.8rem;
        margin: 0 8px;
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
        </HeaderBlock>
    );
};

export default Header;
