import styled from 'styled-components';

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

const  SpotItem = styled.li`
  

`

const HomeSpot = () => {
  return (
    <HomeSpotBlock>
      <Container>
        <h3>여행지</h3>
          <SpotList>
            <SpotItem />
            <SpotItem />
            <SpotItem />
            <SpotItem />
            <SpotItem />
            <SpotItem />
            <SpotItem />
            <SpotItem />
            <SpotItem />
            <SpotItem />
            <SpotItem />
            <SpotItem />
            <SpotItem />
          </SpotList>
      </Container>
    </HomeSpotBlock>
  );
};

export default HomeSpot;
