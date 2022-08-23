import styled from 'styled-components';

const SpotItemBlock = styled.div`
  width: 280px;
  height: 320px;
  margin: 10px;
  text-align: center;
  h3 {
    margin: 10px;
  }
`;

const SimpleImg = styled.div`
  width: 280px;
  height: 270px;
`;

const SpotItem = () => {
  return (
    <SpotItemBlock>
      <SimpleImg />
      <h3>천안 사거리</h3>
    </SpotItemBlock>
  );
};

export default SpotItem;
