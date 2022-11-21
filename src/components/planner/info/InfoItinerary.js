import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus } from '@fortawesome/free-solid-svg-icons';
// import { faTaxi } from '@fortawesome/free-solid-svg-icons';
// import { faPlane } from '@fortawesome/free-solid-svg-icons';
// import { faPersonWalking } from '@fortawesome/free-solid-svg-icons';
// import { faBicycle } from '@fortawesome/free-solid-svg-icons';
// import { faTrainSubway } from '@fortawesome/free-solid-svg-icons';

const ItineraryBlock = styled.div`
  border: 1px solid green;
  width: 30rem;
  height: 40rem;
  text-align: center;
`;

const Route = styled.div`
  border: 1px solid blue;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RouteSpotBox = styled.div`
  flex-direction: column;
  align-items: center;
  display: flex;
  margin: 20px 0;
`;

const RouteSpotName = styled.div`
  background-color: white;
`;

const RouteSpot = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: navy;
  margin-top: 5px;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  width: 2rem;
  height: 2rem;
`;

const InfoItinerary = () => {
  return (
    <ItineraryBlock>
      <p>2020년 11월 11일 ~ 2022년 7월 29일</p>
      <Route>
        <RouteSpotBox>
          <RouteSpotName>서울언저리</RouteSpotName>
          <RouteSpot />
        </RouteSpotBox>
        <StyledFontAwesomeIcon icon={faBus} />
        <RouteSpotBox>
          <RouteSpotName>천안언저리</RouteSpotName>
          <RouteSpot />
        </RouteSpotBox>
      </Route>
    </ItineraryBlock>
  );
};

export default InfoItinerary;
