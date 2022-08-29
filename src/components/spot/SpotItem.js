import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const SpotItemBlock = styled.div`
  width: 280px;
  height: 320px;
  margin: 10px;
  /* text-align: center; */
  border: 1px solid ${palette.ivory[0]};
  border-radius: 5%;
  box-shadow: 3px 3px 7px 1px ${palette.gray[1]};
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
