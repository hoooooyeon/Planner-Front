import styled from 'styled-components';
import Button from '../../common/Button';
import InfoItinerary from './InfoItinerary';
import InfoMap from './InfoMap';

const PlannerInfoBlock = styled.div`
  margin: 75px auto;
  width: 80%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  border: 1px solid red;
`;

const MemoBox = styled.div`
  border: 1px solid yellow;
  width: 100%;
  height: 20rem;
  padding: 10px;
`;

const StyledButton = styled(Button)`
  width: 7rem;
  position: absolute;
  left: 45%;
  top: 20%;
  z-index: 999;
`;

const PlannerInfo = () => {
  return (
    <PlannerInfoBlock>
      <StyledButton big>플래너 수정</StyledButton>
      <InfoMap />
      <InfoItinerary />
      <MemoBox>
        <h2>메모</h2>
        <div />
      </MemoBox>
    </PlannerInfoBlock>
  );
};

export default PlannerInfo;
