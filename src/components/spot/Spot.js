import styled from 'styled-components';

const SpotBlock = styled.div`
  width: 280px;
  height: 320px;
  margin: 10px;
  text-align: center;
  border: 1px solid blue;
  h3 {
    margin: 10px;
  }
`;

const SimpleImg = styled.div`
  width: 280px;
  height: 270px;
  border: 1px solid red;
`;

const Spot = () => {
  return (
    <SpotBlock>
      <SimpleImg />
      <h3>천안 사거리</h3>
    </SpotBlock>
  );
};

export default Spot;
