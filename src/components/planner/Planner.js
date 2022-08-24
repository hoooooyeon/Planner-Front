import styled from 'styled-components';
import PlannerList from './PlannerList';

const PlannerBlock = styled.div`
  margin: 100px auto;
  width: 80%;
  height: auto;
  min-height: 100%;
  padding-bottom: 170px;
`;

const Planner = () => {
  return (
    <PlannerBlock>
      <PlannerList type="planner" />
    </PlannerBlock>
  );
};

export default Planner;
