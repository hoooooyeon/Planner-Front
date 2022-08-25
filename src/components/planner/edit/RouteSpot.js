import styled from 'styled-components';
import Button from '../../common/Button';

const RouteSpotBlock = styled.div`
  border: 1px solid lightblue;
  /* border-radius: 10%; */
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 300px;
  height: 90px;
`;

const Img = styled.div`
  border-radius: 5%;
  border: 1px solid blue;
  width: 80px;
  height: 80px;
`;

const SpotName = styled.div`
  width: 120px;
  height: 2.4em;
  overflow-y: auto;
  white-space: wrap;
  line-height: 1.2;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const RouteSpot = ({ type }) => {
  return (
    <RouteSpotBlock>
      <Img />
      <SpotName>천안 사거리</SpotName>
      {type === 'add' ? <Button>추가</Button> : <Button>삭제</Button>}
    </RouteSpotBlock>
  );
};

export default RouteSpot;
