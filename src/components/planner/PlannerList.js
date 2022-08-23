import styled, { css } from 'styled-components';
import PlannerItem from './PlannerItem';

const PlannerListBlock = styled.div`
  /* margin: 100px auto;
  width: 80%; */
`;
const Planners = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const PlannerType = {
  home: '공유 플래너',
  share: '공유 플래너',
  planner: '나의 플래너',
};
const PlannerList = ({ type }) => {
  const PlannerText = PlannerType[type];
  return (
    <PlannerListBlock {...type}>
      <h2>{PlannerText}</h2>
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
