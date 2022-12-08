import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

const Background = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    background-color: rgba(0, 0, 0, 0.5);
`;

const SideNavContainer = styled.div`
    min-width: 200px;
    height: 100%;
    margin: 0;
    padding: 20px;
    z-index: 999;
    background-color: white;
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    @media all and (min-width: 768px) {
        display: none;
    }
`;

const NavList = styled.ul`
    font-size: 15px;
    font-weight: bold;
    padding: 0;
    li {
        padding: 10px;
        &:hover {
            background-color: lightgray;
            cursor: pointer;
        }
    }
`;
const IconBox = styled.div`
    display: inline-block;
    border-radius: 5px;
    padding: 5px 10px;
    &:hover {
        cursor: pointer;
        background-color: lightgray;
    }
`;

const RightArrow = styled(FontAwesomeIcon)`
    font-size: 30px;
`;

const SideNav = () => {
    return (
        <Background>
            <SideNavContainer>
                <div>
                    <IconBox>
                        <RightArrow icon={faCaretRight} />
                    </IconBox>
                </div>
                <NavList>
                    <li>플래너</li>
                    <li>여행 후기</li>
                    <li>여행지</li>
                </NavList>
            </SideNavContainer>
        </Background>
    );
};

export default SideNav;
