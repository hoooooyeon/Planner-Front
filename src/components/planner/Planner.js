import styled from 'styled-components';
import PlannerList from './PlannerList';

const PlannerBlock = styled.div`
  margin: 100px auto 0px;
  width: 80%;
`;

const Planner = () => {
  return (
    <PlannerBlock>
      <PlannerList type="planner" />
    </PlannerBlock>
  );
};

export default Planner;
