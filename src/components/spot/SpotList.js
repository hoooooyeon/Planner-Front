import styled from 'styled-components';
import Button from '../common/Button';
import SpotItem from './SpotItem';

const SpotListBlock = styled.div`
  margin: 50px auto;
  height: auto;

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
  return (
    <SpotListBlock>
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
        <SpotItem />
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
    </SpotListBlock>
  );
};

export default SpotList;
