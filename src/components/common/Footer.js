import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

// const ClearDiv = styled.div`
//     clear: both;
// `;
const FooterBlock = styled.div`
    transform: translateY(55%);
    background-color: gray;
    position: relative;
    height: 300px;
    display: flex;
    /* color: black; */
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media all and (min-width: 768px) {
        height: 150px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }
`;
const Logo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    div:first-child {
        font-size: 17px;
    }
    div:last-child {
        font-size: 30px;
    }
    margin: 0 50px 0 10%;
`;

const UpButton = styled(FontAwesomeIcon)`
    font-size: 30px;
    position: absolute;
    right: 50px;
    display: none;

    &:hover {
        cursor: pointer;
    }
    @media all and (min-width: 768px) {
        display: block;
    }
`;

const Info = styled.div`
    font-size: 15px;
`;

const Footer = () => {
    const onScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            {/* <ClearDiv /> */}
            <FooterBlock>
                <Logo>
                    <div>대한민국 여행의 전부</div>
                    <div>한국다봄</div>
                </Logo>
                <Info>
                    <p>Phone: 010-****-****, 010-****-****</p>
                    <p>Email: B*******@gmail.com, l******@gmail.com</p>
                </Info>
                <UpButton icon={faArrowUp} onClick={onScrollToTop} />
            </FooterBlock>
        </>
    );
};

export default Footer;
