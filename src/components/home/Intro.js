import styled from 'styled-components';
import Button from '../common/Button';

const IntroBlock = styled.div`
  width: 100%;
  height: 650px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  div {
    display: flex;
    flex-direction: column;
  }
`;

const StyledButton = styled(Button)`
  width: 150px;
  margin: 50px 0;
`;

const Intro = () => {
  return (
    <IntroBlock>
      <div>
        <p>가족, 친구 혹은 연인과 함께 여행을 계획해 보세요.</p>
        <p>다른 사람들과 여행 일정을 공유 해보세요.</p>
        <p>다른 사람들이 여행했던 루트를 참고하여 쉽고 빠르게 계획해 보세요.</p>
      </div>
      <StyledButton big>플래너 만들기</StyledButton>
    </IntroBlock>
  );
};

export default Intro;
