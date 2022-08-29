import styled from 'styled-components';
import EditCalendar from './EditCalendar';
import RouteSpot from './RouteSpot';
import RouteTransport from './RouteTransport';

const EditItineraryBlock = styled.div`
  border: 1px solid red;
  width: 370px;
`;

const Title = styled.div`
  text-align: center;
  font-size: 1.4rem;
`;
const Date = styled.div`
  text-align: center;
  font-size: 1rem;
`;
const Itinerary = styled.div`
  display: flex;
  border: 2px solid lightgray;
  padding: 5px;
`;

const Route = styled.div`
  /* padding: 5px; */
`;

const EditItinerary = () => {
  return (
    <EditItineraryBlock>
      <Title>
        <Title>천안 일대기</Title>
        <Date>2020년 11월 11일 ~ 2022년 7월 29일</Date>
      </Title>
      <Itinerary>
        <EditCalendar />
        <Route>
          <RouteSpot type="delete" />
          <RouteTransport />
          <RouteSpot type="delete" />
          <RouteTransport />
          <RouteSpot type="delete" />
        </Route>
      </Itinerary>
    </EditItineraryBlock>
  );
};

export default EditItinerary;
