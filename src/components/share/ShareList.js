import styled from 'styled-components';
import PlannerItem from '../planner/PlannerItem';

const ShareListBlock = styled.div`
  margin: 75px auto;
`;
const Shares = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  border: 1px solid yellow;
`;

const ShareList = () => {
  return (
    <ShareListBlock>
      <h2>공유 플래너</h2>
      <hr />
      <Shares>
        <PlannerItem />
        <PlannerItem />
        <PlannerItem />
        <PlannerItem />
      </Shares>
    </ShareListBlock>
  );
};

export default ShareList;
