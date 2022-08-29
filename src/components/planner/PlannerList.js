import styled from 'styled-components';
import Button from '../common/Button';
import PlannerItem from './PlannerItem';

const PageTitle = styled.p`
  font-size: 1.3rem;
`;

const Planners = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 60px;
`;

const StyledButton = styled(Button)`
  width: 7rem;
  float: right;
`;

const PlannerType = {
  home: '공유 플래너',
  share: '공유 플래너',
  planner: '나의 플래너',
};

const PlannerList = ({ type }) => {
  const PlannerText = PlannerType[type];
  return (
    <>
      <PageTitle>{PlannerText}</PageTitle>
      <hr />
      {type === 'planner' && <StyledButton big>플래너 생성</StyledButton>}
      <Planners>
        <PlannerItem />
        <PlannerItem />
        <PlannerItem />
        <PlannerItem />
      </Planners>
    </>
  );
};

export default PlannerList;
