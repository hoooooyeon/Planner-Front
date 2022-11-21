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

const Title = styled.p`
  font-size: 1.2rem;
`;

const InfoMap = () => {
  return (
    <MapBlock>
      <div>
        <Title>천안 일대기</Title>
        <p>참여 인원: 4명</p>
        <p>여행 자금: 100만원</p>
      </div>
      <div />
    </MapBlock>
  );
};

export default InfoMap;
