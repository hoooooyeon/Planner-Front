import styled from 'styled-components';
import Button from '../../common/Button';

const EditRouteBlock = styled.div`
  /* border: 1px solid blue; */
`;

const RouteSpot = styled.div`
  border: 1px solid lightblue;
  border-radius: 10%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 300px;
  height: 90px;
`;
const RouteTransport = styled.div`
  border: 1px solid lightblue;
  border-radius: 10%;
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

const EditRoute = () => {
  return (
    <EditRouteBlock>
      <RouteSpot>
        <Img />
        <SpotName>천안 사거리</SpotName>
        <Button>삭제</Button>
      </RouteSpot>
      <RouteSpot>
        <Img />
        <SpotName>천안 광장</SpotName>
        <Button>삭제</Button>
      </RouteSpot>
      <RouteSpot>
        <Img />
        <SpotName>천안 기무따수의 동상천안 기무따수의 동상천안 기무따수의 동상천안 기무따수의 동상</SpotName>
        <Button>삭제</Button>
      </RouteSpot>
      <RouteTransport />
    </EditRouteBlock>
  );
};

export default EditRoute;
