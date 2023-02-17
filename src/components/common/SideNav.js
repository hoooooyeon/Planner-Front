import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const SideNavContainer = styled.div`
    width: 200px;
    height: 100%;
    margin: 0;
    padding: 20px;
    z-index: 999;
    background-color: rgba(255, 255, 255, 0.7);
    border-left: 2px solid gray;
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    transform: ${(props) => (props.navOpen ? 'translateX(0px)' : 'translateX(242px)')};
    transition: 0.4s ease;
    @media all and (min-width: 768px) {
        transform: translateX(280px);
    }
`;

const NavList = styled.ul`
    font-size: 15px;
    font-weight: bold;
    padding: 0;
    li {
        padding: 10px;
        border-radius: 5px;
        &:hover {
            background-color: #ebe9e9;
            cursor: pointer;
        }
    }
`;
const IconBox = styled.div`
    display: inline-block;
    border-radius: 50px;
    border: 2px solid gray;
    padding: 5px 7px;
    position: relative;
    left: -60px;
    background-color: white;
    z-index: 99;
    &:hover {
        cursor: pointer;
        background-color: lightgray;
    }
`;

const CloseIconBox = styled(IconBox)`
    padding: 5px 11px;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    font-size: 20px;
`;

const SideNav = () => {
    const navRef = useRef();
    const [navOpen, setNavOpen] = useState(false);

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
    const navClose =  (e) => {
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
                    <CloseIconBox onClick={onToggleNav}>
                        <StyledFontAwesomeIcon icon={faCaretRight} />
                    </CloseIconBox>
                ) : (
                    <IconBox onClick={onToggleNav}>
                        <StyledFontAwesomeIcon icon={faBars} />
                    </IconBox>
                )}
            </div>
            <NavList>
                <li>
                    <Link to="/">홈</Link>
                </li>
                <li>
                    <Link to="/PlannerList">플래너</Link>
                </li>
                <li>
                    <Link to="/ReviewList">여행후기</Link>
                </li>
                <li>
                    <Link to="/Spot">여행지</Link>
                </li>
            </NavList>
        </SideNavContainer>
    );
};

export default SideNav;
