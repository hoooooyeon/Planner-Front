import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef } from 'react';
import { useState } from 'react';

const SideNavContainer = styled.div`
    width: 300px;
    height: 100%;
    margin: 0;
    padding: 20px 0;
    z-index: 999;
    background-color: rgba(255, 255, 255, 0.7);
    border-left: 2px solid var(--md-sys-color-outline);
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    transform: ${(props) => (props.navOpen ? 'translateX(0px)' : 'translateX(302px)')};
    transition: 0.4s ease;
    @media all and (min-width: 768px) {
        transform: translateX(380px);
    }
`;

const AccountBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
        font-weight: bold;
        font-size: 1.1rem;
    }
`;

const AccountIcon = styled(FontAwesomeIcon)`
    font-size: 3rem;
`;

const NavList = styled.ul`
    list-style: none;
    font-size: 15px;
    font-weight: bold;
    padding: 0;
    li {
        padding: 1rem;
        border-radius: 5px;
        &:hover {
            background-color:  ${(props) => props.theme.hoverBackgroundColor};
            color: ${(props) => props.theme.hoverColor};
            cursor: pointer;
            a {
                color:             color: ${(props) => props.theme.hoverColor};

            }
        }
    }
`;

const AccountList = styled(NavList)`
    border-top: 1px solid ${(props) => props.theme.outlineColor};
    padding: 1rem 0;
`;

const IconBox = styled.div`
    display: inline-block;
    border-radius: 50px;
    background-color: ${(props) => props.theme.primaryColor};
    box-shadow: 0px 0px 2px ${(props) => props.theme.shadowColor};
    position: relative;
    left: -50px;
    z-index: 99;
    cursor: pointer;
    width: 1rem;
    height: 1rem;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        box-shadow: 0px 0px 4px ${(props) => props.theme.shadowColor};
    }
`;

const SideNav = ({ styled, handlePurge, onChangePage, account }) => {
    const navRef = useRef();
    const [navOpen, setNavOpen] = useState(false);
    const { nickname } = { ...account };

    // nav 토글 함수
    const onToggleNav = () => {
        if (navOpen === false) {
            setNavOpen(true);
        } else {
            setNavOpen(false);
        }
    };

    // 창 크기에 따른 nav 자동 종료
    const resizeNavClose = () => {
        if (window.innerWidth > 768) {
            setNavOpen(false);
        }
    };

    // 배경 클릭시 nav 종료
    const navClose = (e) => {
        let navArea = navRef.current;
        if (navArea) {
            let navChildren = navRef.current.contains(e.target);
            if (navOpen && (!navArea || !navChildren)) {
                setNavOpen(false);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('click', navClose);
        window.addEventListener('resize', resizeNavClose);
        return () => {
            window.removeEventListener('click', navClose);
            window.removeEventListener('resize', resizeNavClose);
        };
    });

    return (
        <SideNavContainer ref={navRef} navOpen={navOpen}>
            <div>
                {navOpen ? (
                    <IconBox styled={styled} onClick={onToggleNav}>
                        <FontAwesomeIcon icon={faCaretRight} />
                    </IconBox>
                ) : (
                    <IconBox styled={styled} onClick={onToggleNav}>
                        <FontAwesomeIcon icon={faBars} />
                    </IconBox>
                )}
            </div>
            <AccountBox>
                <AccountIcon icon={faCircleUser} />
                <p>{nickname}</p>
            </AccountBox>
            <NavList>
                <li onClick={() => onChangePage('')}>홈</li>
                <li onClick={() => onChangePage('Planners')}>플래너</li>
                <li onClick={() => onChangePage('Reviews')}>커뮤니티</li>
                <li onClick={() => onChangePage('Spot')}>여행지</li>
            </NavList>

            <AccountList>
                {account ? (
                    <>
                        <li onClick={() => onChangePage('Profile')}>마이페이지</li>
                        <li onClick={handlePurge}>로그아웃</li>
                    </>
                ) : (
                    <li onClick={() => onChangePage('Login')}>로그인</li>
                )}
            </AccountList>
        </SideNavContainer>
    );
};

export default SideNav;
