import styled from 'styled-components';
import RecommendSpot from './RecommendSpot';
import SpotInfo from './SpotInfo';
import SpotMenu from './SpotMenu';

const SpotBlock = styled.div`
  margin: 75px auto;
  width: 80%;
  border: 1px solid blue;
`;

const Spot = () => {
  return (
    <SpotBlock>
      <RecommendSpot />
      <SpotMenu />
      <SpotInfo />
    </SpotBlock>
  );
};

export default Spot;
