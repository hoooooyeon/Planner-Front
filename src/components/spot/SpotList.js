import { useState } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import SpotItem from './SpotItem';
import SpotModal from './SpotModal';

const SpotListBlock = styled.div`
  margin: 50px auto;
  height: auto;
  p {
    font-size: 1.2rem;
    font-weight: bold;
  }
  ul {
    list-style: none;
    li {
      margin: 0 15px 5px 0;
    }
  }
`;

const Menu = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

const StyledButton = styled(Button)`
  width: auto;
  height: auto;
  padding: 10px;
`;

const List = styled.div`
  display: felx;
  flex-wrap: wrap;
`;

const SpotList = () => {
  const [showModal, setShowModal] = useState(false);
  const modalToggle = () => {
    setShowModal(!showModal);
  };
  return (
    <SpotListBlock>
      <p>추천 여행지</p>
      <Menu>
        <li>
          <StyledButton>천안바닷가</StyledButton>
        </li>
        <li>
          <StyledButton>천안바닷가</StyledButton>
        </li>
        <li>
          <StyledButton>천안바닷가</StyledButton>
        </li>
        <li>
          <StyledButton>천안바닷가</StyledButton>
        </li>
        <li>
          <StyledButton>천안바닷가</StyledButton>
        </li>
        <li>
          <StyledButton>천안바닷가</StyledButton>
        </li>
        <li>
          <StyledButton>천안바닷가</StyledButton>
        </li>
        <li>
          <StyledButton>천안바닷가</StyledButton>
        </li>
        <li>
          <StyledButton>천안바닷가</StyledButton>
        </li>
        <li>
          <StyledButton>천안바닷가</StyledButton>
        </li>
        <li>
          <StyledButton>천안바닷가</StyledButton>
        </li>
        <li>
          <StyledButton>천안</StyledButton>
        </li>
        <li>
          <StyledButton>천안</StyledButton>
        </li>
        <li>
          <StyledButton>천안</StyledButton>
        </li>
        <li>
          <StyledButton>천안</StyledButton>
        </li>
        <li>
          <StyledButton>천안</StyledButton>
        </li>
        <li>
          <StyledButton>천안</StyledButton>
        </li>
        <li>
          <StyledButton>천안</StyledButton>
        </li>
        <li>
          <StyledButton>천안</StyledButton>
        </li>
        <li>
          <StyledButton>천안</StyledButton>
        </li>
        <li>
          <StyledButton>천안</StyledButton>
        </li>
        <li>
          <StyledButton>천안</StyledButton>
        </li>
        <li>
          <StyledButton>천안</StyledButton>
        </li>
        <li>
          <StyledButton>천안</StyledButton>
        </li>
        <li>
          <StyledButton>천안</StyledButton>
        </li>
      </Menu>
      <List>
        <SpotItem modalToggle={modalToggle} />
        <SpotItem />
        <SpotItem />
        <SpotItem />
        <SpotItem />
        <SpotItem />
        <SpotItem />
        <SpotItem />
        <SpotItem />
        <SpotItem />
      </List>
      <SpotModal showModal={showModal} modalToggle={modalToggle} />
    </SpotListBlock>
  );
};

export default SpotList;
