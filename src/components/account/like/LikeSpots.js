import styled from 'styled-components';
import Spot from '../../spot/Spot';

const Spots = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  border: 1px solid yellow;
`;

const LikeSpots = () => {
  return (
    <>
      <h2>여행지</h2>
      <hr />
      <Spots>
        <Spot />
        <Spot />
        <Spot />
        <Spot />
      </Spots>
    </>
  );
};

export default LikeSpots;
