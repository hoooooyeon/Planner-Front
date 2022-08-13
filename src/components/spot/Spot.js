import styled from 'styled-components';
import SpotSlider from './SpotSlider';
import SpotInfo from './SpotInfo';
import SpotMenu from './SpotMenu';

const SpotBlock = styled.div`
  margin: 100px auto;
  width: 80%;
  border: 1px solid blue;
`;

const Spot = () => {
  return (
    <SpotBlock>
      <SpotSlider />
      <SpotMenu />
      <SpotInfo />
    </SpotBlock>
  );
};

export default Spot;
