import styled from 'styled-components';

const PlannerBlock = styled.div`
  width: 280px;
  height: 350px;
  margin: 10px;
  text-align: center;
  border: 1px solid blue;
  h3 {
    margin: 10px;
  }
`;

const SimpleMap = styled.div`
  width: 280px;
  height: 270px;
  border: 1px solid red;
`;

const Planner = () => {
  return (
    <PlannerBlock>
      <SimpleMap />
      <h3>천안문 일대기</h3>
      <p>2020년 11월 11일 ~ 2022년 7월 29일</p>
    </PlannerBlock>
  );
};

export default Planner;
