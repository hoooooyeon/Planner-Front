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
    background-color: ${({ red }) => (red ? `${red}` : 'lightblue')};
  }
`;
/* background-color: ${(active) => (active.children.map((elm) => elm.props.active) ? 'red' : 'lightblue')}; */

const List = styled.div`
  display: felx;
  flex-wrap: wrap;
`;

const SpotList = () => {
  const arr = ['천안', '성남', '서울', '부산', '머구'];

  const [showModal, setShowModal] = useState(false);
  const [red, setRed] = useState(Array(arr.length).fill('lightblue'));

  const modalToggle = () => {
    setShowModal(!showModal);
  };

  const focusButton = (index) => {
    const newArr = Array(arr.length).fill('lightblue');
    newArr[index] = 'red';
    setRed(newArr);
  };

  return (
    <SpotListBlock>
      <MenuTitle>추천 여행지</MenuTitle>
      <Menu>
        {arr.map((elm, index) => (
          <li key={index} red={red[index]} onClick={() => focusButton(index)}>
            {elm}
            {console.log(red[index])}
          </li>
        ))}
        {/* <li active={active} onClick={focusButton}>
          천안바닷가
        </li> */}
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

// import { useState } from 'react';
// import styled, { css } from 'styled-components';
// import SpotItem from './SpotItem';
// import SpotModal from './SpotModal';

// const SpotListBlock = styled.div`
//   margin: 50px auto;
//   height: auto;
// `;

// const MenuTitle = styled.p`
//   font-size: 1.2rem;
//   font-weight: bold;
// `;

// const Menu = styled.ul`
//   display: flex;
//   flex-wrap: wrap;
//   margin-bottom: 50px;
//   list-style: none;
//   li {
//     margin: 0 15px 5px 0;
//     padding: 10px;
//     border-radius: 2rem;
//     background-color: ${(props) => (props.children.map((elm) => elm.props.active) ? 'red' : 'lightblue')};
//   }
// `;
// /* background-color: ${(active) => (active.children.map((elm) => elm.props.active) ? 'red' : 'lightblue')}; */

// const List = styled.div`
//   display: felx;
//   flex-wrap: wrap;
// `;

// const SpotList = () => {
//   const arr = ['천안', '성남', '서울', '부산', '머구'];

//   const [showModal, setShowModal] = useState(false);
//   const [active, setActive] = useState(Array(arr.length).fill(false));

//   const modalToggle = () => {
//     setShowModal(!showModal);
//   };

//   const focusButton = (index) => {
//     const newArr = Array(arr.length).fill(false);
//     newArr[index] = true;
//     setActive(newArr);
//   };

//   return (
//     <SpotListBlock>
//       <MenuTitle>추천 여행지</MenuTitle>
//       <Menu>
//         {arr.map((elm, index) => (
//           <li key={index} active={active[index]} onClick={() => focusButton(index)}>
//             {elm}
//             {console.log(active[index])}
//           </li>
//         ))}
//         {/* <li active={active} onClick={focusButton}>
//           천안바닷가
//         </li> */}
//       </Menu>
//       <List>
//         <SpotItem modalToggle={modalToggle} />
//         <SpotItem />
//         <SpotItem />
//         <SpotItem />
//         <SpotItem />
//         <SpotItem />
//         <SpotItem />
//         <SpotItem />
//         <SpotItem />
//         <SpotItem />
//       </List>
//       <SpotModal showModal={showModal} modalToggle={modalToggle} />
//     </SpotListBlock>
//   );
// };

// export default SpotList;
