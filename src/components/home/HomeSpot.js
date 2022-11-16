import styled from 'styled-components';

const HomeSpotBlock = styled.div`
  width: calc(100% - 40px);
  height: 100%;
  margin: 50px auto;
  padding: 0 20px;

`

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
`
const HiddenBox = styled.div`
  margin: 0 auto;
  overflow: hidden;
  z-index: 1;
  @media all and (max-width: 768px) {
    margin-left: 15px;
  }
  @media all and (min-width: 768px) {
    width: calc(100% - 40px);
  }
  @media all and (min-width: 1025px) {
    width: 100%;
  }
`

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
`

const SpotItem = styled.li`
  flex-shrink: 0;
  width: 200px;
  float: left; 
  box-shadow: 3px 3px 7px 1px rgb(0,0,0,30%);
  border-radius: 0.5rem;
  margin: 0.5%;
  @media all and (min-width: 768px) {
    width: 24%;
  }
  &:hover {
    cursor: pointer;
  }
`

const HomeSpot = () => {
  return (
    <HomeSpotBlock>
      <Container>
        <h3>여행지</h3>
        <HiddenBox>
        <SpotList>
          <SpotItem />
        </SpotList>
        </HiddenBox>
      </Container>
    </HomeSpotBlock>
  )
}

export default HomeSpot;