import styled from 'styled-components';

const PlannerListBlock = styled.div`
  margin: 100px auto;
  width: 1300px;
`;

const PlannerBoxs = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  border: 1px solid yellow;
`;

const PlannerBox = styled.div`
  width: 300px;
  height: 350px;
  margin: 10px;
  text-align: center;
  border: 1px solid blue;
  h3 {
    margin: 10px;
  }
`;

const SimpleMap = styled.div`
  width: 300px;
  height: 270px;
  border: 1px solid red;
`;

const PlannerList = () => {
  return (
    <PlannerListBlock>
      <h2>나의 플래너</h2>
      <hr />
      <PlannerBoxs>
        <PlannerBox>
          <SimpleMap />
          <h3>천안문 일대기</h3>
          <p>2020년 11월 11일 ~ 2022년 7월 29일</p>
        </PlannerBox>
        <PlannerBox>
          <SimpleMap />
          <h3>천안문 일대기</h3>
          <p>2020년 11월 11일 ~ 2022년 7월 29일</p>
        </PlannerBox>
        <PlannerBox>
          <SimpleMap />
          <h3>천안문 일대기</h3>
          <p>2020년 11월 11일 ~ 2022년 7월 29일</p>
        </PlannerBox>
        <PlannerBox>
          <SimpleMap />
          <h3>천안문 일대기</h3>
          <p>2020년 11월 11일 ~ 2022년 7월 29일</p>
        </PlannerBox>
        <PlannerBox>
          <SimpleMap />
          <h3>천안문 일대기</h3>
          <p>2020년 11월 11일 ~ 2022년 7월 29일</p>
        </PlannerBox>
      </PlannerBoxs>
    </PlannerListBlock>
  );
};

export default PlannerList;
