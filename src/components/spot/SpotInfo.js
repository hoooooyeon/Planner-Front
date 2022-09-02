import styled from 'styled-components';

const SpotInfoBlock = styled.div`
  margin: auto;
  width: 90%;
  height: auto;
  display: flex;
  justify-content: space-around;
`;

const SpotImg = styled.div`
  width: 500px;
  height: 500px;
`;

const SpotTitle = styled.div`
  width: 500px;
  height: 50px;
  text-align: center;
  font-size: 1.5rem;
  margin-top: 10px;
`;
const SpotDetail = styled.div`
  width: 500px;
  height: auto;
`;

const SpotInfo = ({ spot, error, loading, readSpot }) => {
  if (error) {
    if (error.response && error.response.status === 404) {
      return <SpotInfoBlock>존재하지 않는 여행지 정보입니다.</SpotInfoBlock>;
    }
    return <SpotInfoBlock>오류 발생!</SpotInfoBlock>;
  }
  if (loading || !spot) {
    return null;
  }
  const { spotName, spotImage, detail } = spot;
  return (
    <SpotInfoBlock>
      <SpotImg>{spotImage}</SpotImg>
      <div>
        <SpotTitle>{spotName}</SpotTitle>
        <SpotDetail>{detail}</SpotDetail>
      </div>
    </SpotInfoBlock>
  );
};

export default SpotInfo;
