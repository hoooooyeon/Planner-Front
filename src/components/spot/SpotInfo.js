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

const SpotInfo = () => {
  // if (error) {
  //   if (error.response && error.response.status === 404) {
  //     return <SpotInfoBlock>존재하지 않는 여행지 정보입니다.</SpotInfoBlock>;
  //   }
  //   return <SpotInfoBlock>오류 발생!</SpotInfoBlock>;
  // }
  // if (loading || !spots) {
  //   return null;
  // }
  return (
    <SpotInfoBlock>
      {/* {spots.map((spot) => (
        <div key={spot.spotId}>
          <SpotImg>{spot.spotImage}</SpotImg>
          <div>
            <SpotTitle>{spot.spotName}</SpotTitle>
            <SpotDetail>{spot.detail}</SpotDetail>
          </div>
        </div>
      ))} */}
    </SpotInfoBlock>
  );
};

export default SpotInfo;
