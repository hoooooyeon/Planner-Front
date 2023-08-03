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
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: none;
    z-index: 999;
    padding: 0;
    margin: 0;
    a {
        text-decoration: none;
        white-space: nowrap;
    }
    h1 {
        font-size: 1.2rem;
        font-weight: bold;
        white-space: nowrap;
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
    a {
        color: white;
        font-weight: bold;
    }
    ${(props) =>
        props.styled &&
        css`
            a {
                color: black;
            }
        `}
`;

const MenuList = styled.ul`
    list-style: none;
    display: none;
    a {
        color: white;
        font-weight: bold;
    }
    @media all and (min-width: 768px) {
        display: flex;
    }
    li {
        font-size: 0.9rem;
        margin: 0 30px;
    }
    ${(props) =>
        props.styled &&
        css`
            a {
                color: black;
            }
        `}
`;

const AccountList = styled.ul`
    align-items: center;
    list-style: none;
    display: none;
    color: white;
    @media all and (min-width: 768px) {
        display: flex;
    }
    li {
        display: flex;
        align-items: center;
        font-size: 0.8rem;
        margin: 0 8px;
        a {
            color: white;
            font-weight: bold;
        }
        ${(props) =>
            props.styled &&
            css`
                color: black;
                a {
                    color: black;
                }
            `}
    }
`;

const Account = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    .user-img {
        border-radius: 10px;
        margin-right: 10px;
        width: 40px;
        height: 40px;
        cursor: pointer;
    }
    color: white;
    font-weight: bold;

    a {
        color: white;
    }
    ${(props) =>
        props.styled &&
        css`
            color: black;
            a {
                color: black;
            }
        `}
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    margin-right: 10px;
    font-size: 1.5rem;
`;

const DropDown = styled.div`
    z-index: 99;
    position: absolute;
    top: 54px;
    right: 144px;
`;

const DropDownMenu = styled.ul`
    line-height: 25px;
    width: 4.4rem;
    z-index: 1000;
    border-radius: 0.5rem;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border: none;
    padding: 0.5rem 1rem;
    margin: 0;
    text-align: center;
    li {
        cursor: pointer;
        font-size: 0.8rem;
        a {
            color: black;
        }
        &:hover {
            font-weight: bold;
        }
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
                                <li>로그아웃</li>
                            </DropDownMenu>
                        </DropDown>
                    )}
                </>
            ) : (
                <AccountList styled={styled}>
                    <li>
                        <StyledFontAwesomeIcon icon={faCircleUser} />
                        <Link to="/Login">로그인</Link>
                    </li>
                    {/* <li>
            <Link to="/Register">회원가입</Link>
          </li> */}
                </AccountList>
            )}
            <SideNav styled={styled} />
        </HeaderBlock>
    );
};

export default Header;
