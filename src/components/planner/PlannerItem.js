import styled from 'styled-components';

const PlannerItemBlock = styled.div`
  width: 280px;
  height: 350px;
  margin: 10px;
  text-align: center;
  h3 {
    margin: 10px;
  }
`;

const SimpleMap = styled.div`
  width: 280px;
  height: 270px;
`;

const PlannerItem = () => {
  return (
    <PlannerItemBlock>
      <SimpleMap />
      <h3>천안문 일대기</h3>
      <p>2020년 11월 11일 ~ 2022년 7월 29일</p>
    </PlannerItemBlock>
  );
};

export default PlannerItem;
