import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

const RecommendSpotBlock = styled.div``;

const SpotImg = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid red;
`;

const RecommendSpot = () => {
  return (
    <RecommendSpotBlock>
      {/* <FontAwesomeIcon icon="faAngleRight" />
<FontAwesomeIcon icon="faAngleLeft" /> */}
      <SpotImg />
    </RecommendSpotBlock>
  );
};

export default RecommendSpot;
