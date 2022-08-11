import styled from 'styled-components';
import InfoItinerary from './InfoItinerary';
import InfoMap from './InfoMap';

const PlannerInfoBlock = styled.div`
  margin: 75px auto;
  width: 1300px;
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

const PlannerInfo = () => {
  return (
    <PlannerInfoBlock>
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
