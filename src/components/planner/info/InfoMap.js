import styled from 'styled-components';

const MapBlock = styled.div`
  border: 1px solid blue;
  width: 40rem;
  height: 40rem;
  div {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;

const InfoMap = () => {
  return (
    <MapBlock>
      <div>
        <h2>천안문 일대기</h2>
        <p>참여 인원: 4명</p>
        <p>여행 자금: 100만원</p>
      </div>
      <div />
    </MapBlock>
  );
};

export default InfoMap;
