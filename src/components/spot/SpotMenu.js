import styled from 'styled-components';
import Button from '../common/Button';

const SpotMenuBlock = styled.div`
  margin: 50px auto;
  width: 90%;
  height: auto;
  padding: 10px;
  display: flex;
  border: 1px solid lightblue;
  border-radius: 10px;
  div {
    display: flex;
    flex-direction: column;
  }
  ul {
    list-style: none;
    li {
      margin: 0 15px 5px 0;
    }
  }
`;

const CatalogUl = styled.ul`
  width: 70px;
`;

const ListUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const StyledButton = styled(Button)`
  width: auto;
  height: auto;
`;

const SpotMenu = () => {
  return (
    <SpotMenuBlock>
      <div>
        <CatalogUl>
          <li>나라</li>
        </CatalogUl>
        <CatalogUl>
          <li>도시</li>
        </CatalogUl>
        <CatalogUl>
          <li>관광지</li>
        </CatalogUl>
      </div>
      <div>
        <ListUl>
          <li>
            <StyledButton>대한민국</StyledButton>
          </li>
        </ListUl>
        <ListUl>
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
        </ListUl>
        <ListUl>
          <li>
            <StyledButton>천안 시내</StyledButton>
          </li>
          <li>
            <StyledButton>천안 은행나무의 맹세</StyledButton>
          </li>
          <li>
            <StyledButton>천안 시내</StyledButton>
          </li>
          <li>
            <StyledButton>천안 은행나무의 맹세</StyledButton>
          </li>
          <li>
            <StyledButton>천안 시내</StyledButton>
          </li>
          <li>
            <StyledButton>천안 은행나무의 맹세</StyledButton>
          </li>
          <li>
            <StyledButton>천안 시내</StyledButton>
          </li>
          <li>
            <StyledButton>천안 은행나무의 맹세</StyledButton>
          </li>
          <li>
            <StyledButton>천안 시내</StyledButton>
          </li>
          <li>
            <StyledButton>천안 은행나무의 맹세</StyledButton>
          </li>
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
        </ListUl>
      </div>
    </SpotMenuBlock>
  );
};

export default SpotMenu;
