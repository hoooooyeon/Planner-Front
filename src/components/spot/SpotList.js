import { useState } from 'react';
import styled, { css } from 'styled-components';
import SpotItem from './SpotItem';
import SpotModal from './SpotModal';

const SpotListBlock = styled.div`
  margin: 50px auto;
  height: auto;
`;

const MenuTitle = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
`;

const Menu = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 50px;
  list-style: none;
  li {
    margin: 0 15px 5px 0;
    /* background-color: lightblue; */
    padding: 10px;
    border-radius: 2rem;
    background-color: ${(props) => (props.active ? 'red' : 'lightblue')};
  }
`;

const List = styled.div`
  display: felx;
  flex-wrap: wrap;
`;

const SpotList = () => {
  const [showModal, setShowModal] = useState(false);
  const [active, setActive] = useState(true);

  const modalToggle = () => {
    setShowModal(!showModal);
  };

  const focusButton = () => {
    setActive(!active);
  };
  return (
    <SpotListBlock>
      <MenuTitle>추천 여행지</MenuTitle>
      <Menu>
        <li active="true" onClick={focusButton}>
          천안바닷가
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
