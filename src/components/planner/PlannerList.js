import styled from 'styled-components';
import Button from '../common/Button';
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

const StyledButton = styled(Button)`
  width: 7rem;
  float: right;
`;

const PlannerList = ({ type }) => {
  const PlannerText = PlannerType[type];
  return (
    <PlannerListBlock {...type}>
      <h2>{PlannerText}</h2>
      <hr />
      <StyledButton big>플래너 생성</StyledButton>
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
