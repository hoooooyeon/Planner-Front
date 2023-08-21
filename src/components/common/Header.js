import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
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
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    z-index: 999;
    padding: 0;
    margin: 0;
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
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: bold;
    white-space: nowrap;
    color: ${(props) => props.theme.secondaryColor};
    &:hover {
        color: ${(props) => props.theme.mainColor};
    }
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
        text-decoration: none;
        white-space: nowrap;
        cursor: pointer;
        color: ${(props) => props.theme.secondaryColor};
        &:hover {
            color: ${(props) => props.theme.mainColor};
        }
    }
    }
`;

const AccountList = styled.ul`
    align-items: center;
    list-style: none;
    display: none;
    padding: 0;
    li {
        cursor: pointer;
        display: flex;
        align-items: center;
        font-size: 0.8rem;
        font-weight: bold;
        color: ${(props) => props.theme.secondaryColor};
        &:hover {
            color: ${(props) => props.theme.mainColor};
        }
    }
    @media all and (min-width: 768px) {
        display: flex;
    }
`;

const Account = styled.div`
    display: none;
    align-items: center;
    position: relative;
    width: 76px;
    font-weight: bold;
    cursor: pointer;
    color: ${(props) => props.theme.secondaryColor};
    &:hover {
        color: ${(props) => props.theme.mainColor};
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
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    box-shadow: 0px 0px 3px ${(props) => props.theme.shadowColor};
    border: none;
    padding: 0.5rem 1rem;
    margin: 0;
    text-align: center;
    li {
        cursor: pointer;
        font-size: 0.8rem;
        color: ${(props) => props.theme.secondaryColor};
        &:hover {
            color: ${(props) => props.theme.hoverColor};
            font-weight: bold;
        }
    }
`;

const Header = ({ account, handlePurge, onChangePage }) => {
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
            <Logo styled={styled} onClick={() => onChangePage('')}>
                한국다봄
            </Logo>
            <MenuList styled={styled}>
                <li onClick={() => onChangePage('Planners')}>플래너</li>
                <li onClick={() => onChangePage('Reviews')}>커뮤니티</li>
                <li onClick={() => onChangePage('Spot')}>여행지</li>
            </MenuList>
            {account ? (
                <>
                    <Account styled={styled} onClick={onClickDropDown}>
                        {/* <img className="user-img" src="logo192.png"></img> */}
                        <StyledFontAwesomeIcon icon={faCircleUser} />
                        {account.nickname}
                    </Account>
                    {dropDown && (
                        <DropDown>
                            <DropDownMenu>
                                <li onClick={() => onChangePage('Profile')}>마이페이지</li>
                                <li onClick={handlePurge}>로그아웃</li>
                            </DropDownMenu>
                        </DropDown>
                    )}
                </>
            ) : (
                <AccountList styled={styled}>
                    <li onClick={() => onChangePage('Login')}>
                        <StyledFontAwesomeIcon icon={faCircleUser} />
                        <p>로그인</p>
                    </li>
                </AccountList>
            )}
            <SideNav styled={styled} account={account} handlePurge={handlePurge} onChangePage={onChangePage} />
        </HeaderBlock>
    );
};

export default Header;
