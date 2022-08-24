import styled from 'styled-components';
import EditCalendar from './EditCalendar';
import EditRoute from './EditRoute';

const EditItineraryBlock = styled.div`
  border: 1px solid red;
`;

const Title = styled.div`
  font-size: 2rem;
`;
const Date = styled.div`
  font-size: 1rem;
`;
const Itinerary = styled.div`
  display: flex;
`;

const EditItinerary = () => {
  return (
    <EditItineraryBlock>
      <>
        <Title>천안 일대기</Title>
        <Date>2020년 11월 11일 ~ 2022년 7월 29일</Date>
      </>
      <Itinerary>
        <EditCalendar />
        <EditRoute />
      </Itinerary>
    </EditItineraryBlock>
  );
};

export default EditItinerary;
