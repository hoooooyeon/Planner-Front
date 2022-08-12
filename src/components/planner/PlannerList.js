import styled from 'styled-components';
import PlannerItem from './PlannerItem';

const PlannerListBlock = styled.div`
  margin: 75px auto;
  width: 80%;
`;
const Planners = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  border: 1px solid yellow;
`;

const PlannerList = () => {
  return (
    <PlannerListBlock>
      <h2>나의 플래너</h2>
      <hr />
      <Planners>
        <PlannerItem />
        <PlannerItem />
        <PlannerItem />
        <PlannerItem />
      </Planners>
    </PlannerListBlock>
  );
};

export default PlannerList;
