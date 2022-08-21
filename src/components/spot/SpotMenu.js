import styled from 'styled-components';
import Button from '../common/Button';

const SpotMenuBlock = styled.div`
  margin: 50px auto;
  border: 1px solid red;
  width: 90%;
  height: 400px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  div {
    display: flex;
  }
  p {
    width: 70px;
  }
  ul {
    list-style: none;
    line-height: 10px;
    li {
      float: left;
      margin: 0 15px 10px 0;
    }
  }
`;

const StyledButton = styled(Button)`
  width: auto;
`;

const SpotMenu = () => {
  return (
    <SpotMenuBlock>
      <div>
        <p>나라</p>
        <ul>
          <li>
            <StyledButton>대한민국</StyledButton>
          </li>
        </ul>
      </div>
      <div>
        <p>도시</p>
        <ul>
          <li>
            <StyledButton>서울</StyledButton>
          </li>
          <li>
            <StyledButton>대전</StyledButton>
          </li>
          <li>
            <StyledButton>대구</StyledButton>
          </li>
          <li>
            <StyledButton>부산</StyledButton>
          </li>
          <li>
            <StyledButton>천안</StyledButton>
          </li>
          <li>
            <StyledButton>성남</StyledButton>
          </li>
        </ul>
      </div>
      <div>
        <p>관광지</p>
        <ul>
          <li>
            <StyledButton>천안 시내</StyledButton>
          </li>
          <li>
            <StyledButton>천안 은행나무의 맹세</StyledButton>
          </li>
          <li>
            <StyledButton>천안 하나로마트</StyledButton>
          </li>
          <li>
            <StyledButton>천안 터미널 깊은 골목 길</StyledButton>
          </li>
          <li>
            <StyledButton>천안 고 김따수 가</StyledButton>
          </li>
          <li>
            <StyledButton>천안 언저리</StyledButton>
          </li>
        </ul>
      </div>
    </SpotMenuBlock>
  );
};

export default SpotMenu;
