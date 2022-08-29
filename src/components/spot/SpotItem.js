import styled from 'styled-components';

const SpotItemBlock = styled.div`
  width: 280px;
  height: 320px;
  margin: 10px;
  text-align: center;
  p {
    margin: 10px;
    font-size: 1.2rem;
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
      <p>천안 사거리</p>
    </SpotItemBlock>
  );
};

export default SpotItem;
