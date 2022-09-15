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
    padding: 10px;
    border-radius: 2rem;
  }
`;
/* background-color: ${(active) => (active.children.map((elm) => elm.props.active) ? 'red' : 'lightblue')}; */

const List = styled.div`
  display: felx;
  flex-wrap: wrap;
`;

const SpotList = ({ areas, spots, spotError, listSpots }) => {
  const [showModal, setShowModal] = useState(false);
  const modalToggle = () => {
    setShowModal(!showModal);
  };

  // const [active, setActive] = useState(Array(arr.length).fill(false));

  // const focusButton = (index) => {
  //   const newArr = Array(arr.length).fill(false);
  //   newArr[index] = true;
  //   setActive(newArr);
  // };

  if (spotError) {
    return <SpotListBlock>에러가 발생했습니다.</SpotListBlock>;
  }
  return (
    <SpotListBlock>
      <MenuTitle>추천 여행지</MenuTitle>
      {areas && (
        <Menu>
          {areas.map((area) => (
            <li key={area.code}>{area.name}</li>
          ))}
        </Menu>
      )}
      <List>
        {spots && spots.map((spot) => <SpotItem spot={spot} key={spot.contentid} />)}
        {/* <SpotItem modalToggle={modalToggle} /> */}
      </List>
      <SpotModal showModal={showModal} modalToggle={modalToggle} />
    </SpotListBlock>
  );
};

export default SpotList;
