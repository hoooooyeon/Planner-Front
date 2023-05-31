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
  position: sticky;
  top: 0;
  z-index: -1;
  /* overflow: hidden; */
`;

const MainBox = styled.div`
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
  color: white;
`;

const Title = styled.div`
  font-size: 1.5rem;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  font-size: 1.2rem;
`;

const MainVideo = styled(ReactPlayer)``;

const StyledLink = styled.a`
  text-decoration: none;
  margin-top: 60px;
  &:hover {
    cursor: pointer;
  }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  margin-left: 10px;
`;

const Main = () => {
  const [isVideo, setIsVideo] = useState();
  useEffect(() => {
    const videoArr = ['/videos/intro_city.mp4', '/videos/intro_train.mp4', '/videos/intro_waterfall.mp4'];
    let num = Math.round(Math.random() * (videoArr.length - 1));

    setIsVideo(videoArr[num]);
  }, []);

  return (
    <MainBlock>
      {/* 
       video와 source 태그 사용이 안됨. 왜??.
      <video  autoPlay muted loop>
        <source src="/videos/intro_city_night.mp4" type="videos/mp4" />
      </video> */}
      <MainVideo playing muted loop url={isVideo} width="100%" height="100%" />
      <MainBox>
        <Text>
          <p>모든 것이 봄 자체 한국 여행의 모든 것을 담았다.</p>
        </Text>
        <Title>여행 계획 플래너</Title>
        <br />
        <Title>한국 다봄</Title>
        <StyledLink to="/PlannerList">
          플래너 생성하러 가기
          <StyledFontAwesomeIcon icon={faChevronRight} />
        </StyledLink>
      </MainBox>
    </MainBlock>
  );
};

export default Main;
