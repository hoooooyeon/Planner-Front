import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const MainBlock = styled.div`
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    position: relative;
    background-color: ${(props) => props.theme.secondaryBackgroundColor};
`;

const MainBox = styled.div`
    z-index: 99;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 50%;
    top: 55%;
    transform: translate(-50%, -50%);
    font-weight: bold;
`;

const Text = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 1rem;
    color: ${(props) => props.theme.primaryColor};
    @media all and (max-width: 768px) {
        font-size: 0.9rem;
    }
    @media all and (max-width: 480px) {
        font-size: 0.8rem;
    }
`;
const Title = styled.div`
    font-size: 1.2rem;
    color: ${(props) => props.theme.primaryColor};
    margin: 1rem 0 2rem;
    @media all and (max-width: 768px) {
        font-size: 1rem;
    }
    @media all and (max-width: 480px) {
        font-size: 0.9rem;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: ${(props) => props.theme.primaryColor};
    box-sizing: border-box;
    padding: 1rem;
    border-radius: 2rem;
    &:hover {
        color: ${(props) => props.theme.hoverColor};
        background-color: ${(props) => props.theme.hoverBackgroundColor};
        cursor: pointer;
    }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    margin-left: 10px;
`;

const Main = () => {
    const [isVideo, setIsVideo] = useState();
    useEffect(() => {
        const videoArr = ['/videos/Main1.mp4', '/videos/Main2.mp4', '/videos/Main3.mp4'];
        const num = Math.round(Math.random() * (videoArr.length - 1));

        setIsVideo(videoArr[num]);
    }, []);

    return (
        <MainBlock>
            <ReactPlayer playing muted loop url={isVideo} width="100%" height="100%" />

            <MainBox>
                <Text>모든 곳이 봄이다</Text>
                <Title>한국을 모두 담은 여행 플래너</Title>
                <StyledLink to="/Planners">
                    플래너 만들기
                    <StyledFontAwesomeIcon icon={faChevronRight} />
                </StyledLink>
            </MainBox>
        </MainBlock>
    );
};

export default Main;
