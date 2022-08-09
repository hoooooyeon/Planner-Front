import styled from 'styled-components';

const PlannerInfoBlock = styled.div`
  margin: 100px auto;
  width: 1300px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: baseline;
  border: 1px solid red;
`;

const MapBox = styled.div`
  border: 1px solid blue;
  width: 40rem;
  height: 40rem;
  div {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;

const RouteBox = styled.div`
  border: 1px solid green;
  width: 30rem;
  height: 40rem;
  text-align: center;
`;

const MemoBox = styled.div`
  border: 1px solid yellow;
  width: 100%;
  height: 20rem;
  padding: 10px;
`;

const PlannerInfo = () => {
  return (
    <PlannerInfoBlock>
      <MapBox>
        <div>
          <h2>천안문 일대기</h2>
          <p>참여 인원: 4명</p>
          <p>여행 자금: 100만원</p>
        </div>
        <div />
      </MapBox>
      <RouteBox>
        <p>2020년 11월 11일 ~ 2022년 7월 29일</p>
      </RouteBox>
      <MemoBox>
        <h2>메모</h2>
        <div />
      </MemoBox>
    </PlannerInfoBlock>
  );
};

export default PlannerInfo;
