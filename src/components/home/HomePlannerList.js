import { useRef } from 'react';
import styled from 'styled-components';
import Slider from '../common/Slider';

const HomePlannerListBlock = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: white;
`;

const Container = styled.div`
  margin: 0 auto;
  padding: 6rem;
  @media all and (min-width: 768px) {
    padding: 6rem 9rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 6rem;
  h3 {
    margin: 0;
  }
`;

const PlannerList = styled.ul`
  list-style-type: none;
  height: 100%;
  width: 100%;
  padding: 0;
  display: flex;
  margin: 0 auto;
`;

const PlannerItem = styled.li`
  width: 24%;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  background-color: white;
  cursor: pointer;
  & + & {
    margin-left: 1rem;
  }
  &:hover {
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  }
`;

const MapBox = styled.div`
  background-color: lightgray;
  margin: 0;
  overflow: hidden;
  position: relative;
  padding-top: 90%;
  width: 100%;
  border-radius: 0.5rem 0.5rem 0 0;
  @media all and (max-width: 767px) {
    padding-top: 75%;
  }
`;

const Map = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const InfoBox = styled.div`
  height: 2.5rem;
  margin: 0;
  padding: 0.5rem;
  box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Title = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
  overflow: hidden;
`;
const Date = styled.div`
  font-size: 0.4rem;
  color: lightgray;
  margin-top: 0.5rem;
  overflow: hidden;
`;

const HomePlannerList = () => {
  const itemRef = useRef();

  return (
    <HomePlannerListBlock>
      <Container>
        <Header>
          <h3>다른 여행객들의 플래너</h3>
          <p>먼저 여행을 끝마친 여행객들의 플래너를 구경 해보세요.</p>
        </Header>
        {/* <Slider           list={}          itemRef={itemRef}           drag={drag}        > */}
        <PlannerList>
          <PlannerItem ref={itemRef}>
            <MapBox>{/* <Map /> */}</MapBox>
            <InfoBox>
              <Title>너어디에있었어여기 서울에 널찾아 헤맸어 그게 내 행복이야</Title>
              <Date>2020년 11월 11일 ~ 2022년 17월 29일</Date>
            </InfoBox>
          </PlannerItem>{' '}
          <PlannerItem>
            <MapBox>{/* <Map /> */}</MapBox>
            <InfoBox>
              <Title>너어디에있었어여기 서울에 널찾아 헤맸어 그게 내 행복이야</Title>
              <Date>2020년 11월 11일 ~ 2022년 17월 29일</Date>
            </InfoBox>
          </PlannerItem>{' '}
          <PlannerItem>
            <MapBox>{/* <Map /> */}</MapBox>
            <InfoBox>
              <Title>너어디에있었어여기 서울에 널찾아 헤맸어 그게 내 행복이야</Title>
              <Date>2020년 11월 11일 ~ 2022년 17월 29일</Date>
            </InfoBox>
          </PlannerItem>{' '}
          <PlannerItem>
            <MapBox>{/* <Map /> */}</MapBox>
            <InfoBox>
              <Title>너어디에있었어여기 서울에 널찾아 헤맸어 그게 내 행복이야</Title>
              <Date>2020년 11월 11일 ~ 2022년 17월 29일</Date>
            </InfoBox>
          </PlannerItem>
        </PlannerList>
        {/* </Slider> */}
      </Container>
    </HomePlannerListBlock>
  );
};

export default HomePlannerList;
