import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import palette from '../../lib/styles/palette';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import SideNav from './SideNav.jsx';
import { useState } from 'react';

const HeaderBlock = styled.div`
    height: 75px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    background-color: var(--md-sys-color-on-secondary);
    z-index: 999;
    padding: 0;
    margin: 0;
    a {
        text-decoration: none;
        white-space: nowrap;
        color: var(--md-sys-color-on-background);
        &:hover {
            color: var(--md-sys-color-secondary);
        }
    }
    h1 {
        font-size: 1.2rem;
        font-weight: bold;
        white-space: nowrap;
        color: var(--md-sys-color-on-background);
        &:hover {
            color: var(--md-sys-color-primary);
        }
    }
    ${(props) =>
        props.styled &&
        css`
            background-color: rgba(255, 255, 255, 0.8);
        `}
    @media all and (min-width: 768px) {
        justify-content: space-between;
        padding: 0 9rem;
    }
    @media all and (min-width: 1200px) {
        padding: 0 9rem;
    }
`;

const Logo = styled.h1`
    font-size: 1.2rem;
    font-weight: bold;
    white-space: nowrap;
`;

const MenuList = styled.ul`
    list-style: none;
    display: none;
    padding: 0;
    @media all and (min-width: 768px) {
        display: flex;
    }
    li {
        font-size: 0.9rem;
        margin: 0 30px;
        font-weight: bold;
    }
`;

const AccountList = styled.ul`
    align-items: center;
    list-style: none;
    display: none;
    padding: 0;
    @media all and (min-width: 768px) {
        display: flex;
    }
    a {
        display: flex;
        align-items: center;
        font-size: 0.8rem;
        font-weight: bold;
        color: var(--md-sys-color-on-background);
        &:hover {
            color: var(--md-sys-color-secondary);
        }
    }
`;

const Account = styled.div`
    display: none;
    align-items: center;
    position: relative;
    width: 76px;
    color: var(--md-sys-color-on-background);
    font-weight: bold;
    cursor: pointer;
    &:hover {
        color: var(--md-sys-color-secondary);
    }
    .user-img {
        border-radius: 10px;
        margin-right: 10px;
        width: 40px;
        height: 40px;
    }
    @media all and (min-width: 768px) {
        display: flex;
    }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    margin-right: 10px;
    font-size: 1.5rem;
`;

const DropDown = styled.div`
    z-index: 99;
    position: absolute;
    top: 54px;
    right: 188px;
`;

const DropDownMenu = styled.ul`
    line-height: 25px;
    width: 4.4rem;
    z-index: 1000;
    border-radius: 0.5rem;
    background-color: var(--md-sys-color-background);
    box-shadow: 0px 0px 3px -2px var(--md-sys-color-shadow);
    border: none;
    padding: 0.5rem 1rem;
    margin: 0;
    text-align: center;
    li {
        cursor: pointer;
        font-size: 0.8rem;
        color: var(--md-sys-color-on-background);
        &:hover {
            color: var(--md-sys-color-secondary);
        }
        a {
            color: var(--md-sys-color-on-background);
            &:hover {
                color: var(--md-sys-color-secondary);
            }
        }
        &:hover {
            font-weight: bold;
        }
    }
`;

const Header = ({ account, handlePurge }) => {
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
        headerStyling();
        return () => {
            window.removeEventListener('scroll', headerStyling);
        };
    }, []);

    const [dropDown, setDropDown] = useState(false);

    const onClickDropDown = () => {
        setDropDown(!dropDown);
    };

    const onCloseDropDown = () => {
        if (dropDown) {
            setDropDown(false);
        }
    };

    useEffect(() => {
        window.addEventListener('click', onCloseDropDown);
        return () => window.removeEventListener('click', onCloseDropDown);
    });

    return (
        <HeaderBlock ref={headerRef} styled={styled}>
            <Logo styled={styled}>
                <Link to="/">한국다봄</Link>
            </Logo>
            <MenuList styled={styled}>
                <li>
                    <Link to="/Planners">플래너</Link>
                </li>
                <li>
                    <Link to="/ReviewList">커뮤니티</Link>
                </li>
                <li>
                    <Link to="/Spot">여행지</Link>
                </li>
            </MenuList>
            {account ? (
                <>
                    <Account styled={styled} onClick={onClickDropDown}>
                        {/* <img className="user-img" src="logo192.png"></img> */}
                        {account.nickname}
                    </Account>
                    {dropDown && (
                        <DropDown>
                            <DropDownMenu>
                                <li>
                                    <Link to="/Profile">마이페이지</Link>
                                </li>
                                <li onClick={handlePurge}>로그아웃</li>
                            </DropDownMenu>
                        </DropDown>
                    )}
                </>
            ) : (
                <AccountList styled={styled}>
                    <li>
                        <Link to="/Login">
                            <StyledFontAwesomeIcon icon={faCircleUser} />
                            <p>로그인</p>
                        </Link>
                    </li>
                </AccountList>
            )}
            <SideNav styled={styled} handlePurge={handlePurge} />
        </HeaderBlock>
    );
};

export default Header;
