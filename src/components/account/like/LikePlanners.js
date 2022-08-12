import styled from 'styled-components';
import PlannerItem from '../../planner/PlannerItem';

const Planners = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  border: 1px solid yellow;
`;

const LikePlanners = () => {
  return (
    <>
      <h2>플래너</h2>
      <hr />
      <Planners>
        <PlannerItem />
      </Planners>
    </>
  );
};

export default LikePlanners;
