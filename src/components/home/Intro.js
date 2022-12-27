import styled from 'styled-components';
import ReactPlayer from 'react-player';

const IntroBlock = styled.div`
  width: 100%;
  height: 680px;
  display: flex;
  margin-top: 75px;
  position: relative;
  
  overflow: hidden;
  `;

const TextBox = styled.div`
  width: 250px;
  height: 100%;
  background-color: #CDD9AC;
  display:  flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding:  0 50px;
  position: absolute;
  right: 0;
  top: 0;
`

const IntroText = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  font-weight: bold;
`;

const Button = styled.button`
  width: 150px;
  height: 50px;
  margin: 50px 0;
  border: none;
  border-radius: 10px;
  background-color: #9aad67;
  color: white;
  font-size: 0.9rem;
  font-weight: bold;
`;

const IntroVideo = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 0;
`;

// const Video = styled.video`
//   width: 200px;
//   height: 200px;
// `;

const Intro = () => {
  return (
    <IntroBlock>
      {/* 
       video와 source 태그 사용이 안됨. 이유 아직 모름.
      <video  autoPlay muted loop>
        <source src="/videos/intro_city_night.mp4" type="videos/mp4" />
      </video> */}
      <IntroVideo playing muted loop url={'/videos/intro_city.mp4'} width="1200px" height="100%" />
      <TextBox>
      <IntroText>
        <p>가족, 친구 혹은 연인과 함께 여행을 계획해 보세요.</p>
        <p>다른 이용자들에게 여행 일정을 공유 해보세요.</p>
        <p>다른 이용자들이 여행했던 루트를 참고하여 쉽고 빠르게 계획해 보세요.</p>
      </IntroText>
      <Button big>플래너 만들기</Button>
      </TextBox>
    </IntroBlock>
  );
};

export default Intro;
