import styled from 'styled-components';
import PlannerItem from '../../planner/PlannerItem';

const Planners = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const LikePlanners = () => {
  return (
    <>
      <h3>플래너</h3>
      <hr />
      <Planners>
        <PlannerItem />
      </Planners>
    </>
  );
};

export default LikePlanners;
