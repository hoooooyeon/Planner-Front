import styled from 'styled-components';
// import video from '../../videos/intro_city_night.mp4'

const IntroBlock = styled.div`
  width: 100%;
  height: 650px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  margin-top: 75px;
  div {
    display: flex;
    flex-direction: column;
  }
`;

const Button = styled.button`
  width: 150px;
  height: 50px;
  margin: 50px 0;
  border: none;
  border-radius: 10px;
  background-color: #9AAD67;
  color: white;
font-size: 0.9rem;
font-weight: bold;
`;

// const Video = styled.video`
//   width: 200px;
//   height: 200px;
// `;

const Intro = () => {
  return (
    <IntroBlock>
      <video muted autoPlay loop>
        <source src="videos/intro_city_night.mp4" type="videos.mp4" />
      </video>
      <div>
        <p>가족, 친구 혹은 연인과 함께 여행을 계획해 보세요.</p>
        <p>다른 사람들과 여행 일정을 공유 해보세요.</p>
        <p>다른 사람들이 여행했던 루트를 참고하여 쉽고 빠르게 계획해 보세요.</p>
      </div>
      <Button big>플래너 만들기</Button>
    </IntroBlock>
  );
};

export default Intro;
