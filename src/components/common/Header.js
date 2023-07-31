import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import palette from '../../lib/styles/palette';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
// import SideNav from './sideNav';
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
        color: white;
        text-decoration: none;
        font-weight: bold;
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
            a {
                color: black;
            }
        `}
    @media all and (min-width: 768px) {
        justify-content: space-between;
        padding: 0 9rem;
    }
    @media all and (min-width: 1200px) {
        padding: 0 9rem;
    }
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
    }
`;

const AccountList = styled.ul`
    align-items: center;
    list-style: none;
    display: none;
    @media all and (min-width: 768px) {
        display: flex;
    }
    li {
        display: flex;
        align-items: center;
        font-size: 0.8rem;
        margin: 0 8px;
    }
`;

const Account = styled.div`
    display: flex;
    align-items: center;
    .user-img {
        border-radius: 10px;
        margin-right: 10px;
        width: 40px;
        height: 40px;
    }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    margin-right: 10px;
    font-size: 1.5rem;
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

    return (
        <HeaderBlock ref={headerRef} styled={styled}>
            <h1>
                <Link to="/">한국다봄</Link>
            </h1>
            <MenuList>
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
                <Account>
                    {/* <img className="user-img" src="logo192.png"></img> */}
                    <Link to="/Profile">{account.nickname}</Link>
                    <div onClick={handlePurge}>로그아웃?</div>
                </Account>
            ) : (
                <AccountList>
                    <li>
                        <StyledFontAwesomeIcon icon={faCircleUser} />
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

// import styled, { css } from 'styled-components';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
// import { faBars } from '@fortawesome/free-solid-svg-icons';
// import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
// import { useEffect, useRef } from 'react';
// import { useState } from 'react';
// import { Link } from 'react-router-dom';

// const SideNavContainer = styled.div`
//   width: 300px;
//   height: 100%;
//   margin: 0;
//   padding: 20px 0;
//   z-index: 999;
//   background-color: rgba(255, 255, 255, 0.7);
//   border-left: 2px solid gray;
//   position: fixed;
//   right: 0;
//   top: 0;
//   bottom: 0;
//   transform: ${(props) => (props.navOpen ? 'translateX(0px)' : 'translateX(302px)')};
//   transition: 0.4s ease;
//   @media all and (min-width: 768px) {
//     transform: translateX(380px);
//   }
// `;

// const AccountBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   p {
//     font-weight: bold;
//     font-size: 1.1rem;
//   }
// `;

// const AccountIcon = styled(FontAwesomeIcon)`
//   font-size: 3rem;
// `;

// const NavList = styled.ul`
//   list-style: none;
//   font-size: 15px;
//   font-weight: bold;
//   padding: 0;
//   li {
//     padding: 1rem;
//     border-radius: 5px;
//     &:hover {
//       background-color: white;
//       cursor: pointer;
//     }
//   }
// `;
// const IconBox = styled.div`
//   display: inline-block;
//   border-radius: 50px;
//   border: 2px solid gray;
//   padding: 5px 7px;
//   position: relative;
//   left: -50px;
//   background-color: white;
//   z-index: 99;
//   &:hover {
//     cursor: pointer;
//     background-color: lightgray;
//   }
// `;

// const CloseIconBox = styled(IconBox)`
//   padding: 5px 11px;
// `;

// const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
//   font-size: 20px;
// `;

// const SideNav = () => {
//   const navRef = useRef();
//   const [navOpen, setNavOpen] = useState(false);

//   // nav 토글 함수
//   const onToggleNav = () => {
//     if (navOpen === false) {
//       setNavOpen(true);
//     } else {
//       setNavOpen(false);
//     }
//   };

//   // 창 크기에 따른 nav 자동 종료
//   const resizeNavClose = () => {
//     if (window.innerWidth > 768) {
//       setNavOpen(false);
//     }
//   };

//   // 배경 클릭시 nav 종료
//   const navClose = (e) => {
//     let navArea = navRef.current;
//     if (navArea) {
//       let navChildren = navRef.current.contains(e.target);
//       if (navOpen && (!navArea || !navChildren)) {
//         setNavOpen(false);
//       }
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('click', navClose);
//     window.addEventListener('resize', resizeNavClose);
//     return () => {
//       window.removeEventListener('click', navClose);
//       window.removeEventListener('resize', resizeNavClose);
//     };
//   });

//   return (
//     <SideNavContainer ref={navRef} navOpen={navOpen}>
//       <div>
//         {navOpen ? (
//           <CloseIconBox onClick={onToggleNav}>
//             <StyledFontAwesomeIcon icon={faCaretRight} />
//           </CloseIconBox>
//         ) : (
//           <IconBox onClick={onToggleNav}>
//             <StyledFontAwesomeIcon icon={faBars} />
//           </IconBox>
//         )}
//       </div>
//       <AccountBox>
//         <AccountIcon icon={faCircleUser} />
//         <p>블루베어</p>
//       </AccountBox>
//       <NavList>
//         <li>
//           <Link to="/">홈</Link>
//         </li>
//         <li>
//           <Link to="/PlannerList">플래너</Link>
//         </li>
//         <li>
//           <Link to="/ReviewList">커뮤니티</Link>
//         </li>
//         <li>
//           <Link to="/Spot">여행지</Link>
//         </li>
//       </NavList>
//     </SideNavContainer>
//   );
// };

// export default SideNav;
