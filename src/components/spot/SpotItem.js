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

const SimpleImg = styled.img`
  width: 280px;
  height: 270px;
  border-radius: 5% 5% 0 0;
`;

const SpotItem = ({ spot, onErrorImg, detailSpot }) => {
  const { title, firstimage, contentid } = spot;
  return (
    <SpotItemBlock onClick={() => detailSpot(contentid)}>
      <SimpleImg src={firstimage} alt={title} onError={onErrorImg} />
      <p>{title}</p>
    </SpotItemBlock>
  );
};

export default SpotItem;
