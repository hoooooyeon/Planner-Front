import styled from 'styled-components';
import SpotItem from '../spot/SpotItem';

const HomeSpotBlock = styled.div`
  width: 100%;
  height: 100%;
  margin: 50px auto;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  @media all and (min-width: 768px) {
    width: calc(100% - 40px);
    padding: 0 20px;
  }
  @media all and (min-width: 960px) {
    width: 930px;
    padding: 0;
  }
  @media all and (min-width: 1280px) {
    width: 1250px;
    padding: 0;
  }
  h3 {
    margin-left: 20px;
  }
`;
const HiddenBox = styled.div`
  margin: 0 auto;
  overflow: hidden;
  z-index: 1;
  padding: 0 20px;
  width: calc(100% - 40px);
 
  @media all and (min-width: 1025px) {
    width: 100%;
  }
`;

const SpotList = styled.ul`
  list-style-type: none;
  width: 840px;
  height: 100%;
  margin: 0 auto;
  padding: 0;
  display: inline-block;
  @media all and (min-width: 768px) {
    width: 100%;
  }
`;

const HomeSpot = () => {
  return (
    <HomeSpotBlock>
      <Container>
        <h3>여행지</h3>
        <HiddenBox>
          <SpotList>
            <SpotItem />
            <SpotItem />
            <SpotItem />
            <SpotItem />
            <SpotItem />
            <SpotItem />
            <SpotItem />
            <SpotItem />
          </SpotList>
        </HiddenBox>
      </Container>
    </HomeSpotBlock>
  );
};

export default HomeSpot;
