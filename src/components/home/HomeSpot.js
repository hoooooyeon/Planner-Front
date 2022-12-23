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
    width: 1024px;
  }
  h3 {
    margin-left: 20px;
  }
`;

const SpotList = styled.ul`
  list-style-type: none;
  height: 100%;
  margin: 0 auto;
  padding: 0 20px;
  display: inline-block;
  width: calc(100% - 40px);
  @media all and (min-width: 1025px) {
    width: 100%;
  }
`;

const SpotItem = styled.li`
  
  float: left;
  border-radius: 2px;
  box-shadow: 3px 3px 7px 1px gray;
  /* padding: 0 6px 12px; */
  margin: 0.5%;
  width: 24%;
  position: relative;
  &:hover {
    cursor: pointer;
  }
`;

const ImgBox = styled.div`
  background-color: lightgray;
  padding: 0;
  margin: 0;
  overflow: hidden;
`;
const Img = styled.img`
  width: 100%;
  height: 150px;
  border: none;
  margin: auto;
  @media all and (min-width: 960px) {
    height: 200px;
  }
  @media all and (min-width: 1280px) {
    height: 250px;
  }
`;
const Name = styled.div`
  position: relative;
  bottom: 0;
  height: 35px;
  line-height: 35px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 10px;
  font-weight: bold;
  background-color: white;
`;

const HomeSpot = () => {
  return (
    <HomeSpotBlock>
      <Container>
        <h3>여행지</h3>
        <SpotList>
          <SpotItem>
            <ImgBox>
              <Img />
            </ImgBox>
            <Name>title</Name>
          </SpotItem>
          <SpotItem>
            <ImgBox>
              <Img />
            </ImgBox>
            <Name>title</Name>
          </SpotItem>
          <SpotItem>
            <ImgBox>
              <Img />
            </ImgBox>
            <Name>title</Name>
          </SpotItem>
          <SpotItem>
            <ImgBox>
              <Img />
            </ImgBox>
            <Name>title</Name>
          </SpotItem>
          <SpotItem>
            <ImgBox>
              <Img />
            </ImgBox>
            <Name>title</Name>
          </SpotItem>
          <SpotItem>
            <ImgBox>
              <Img />
            </ImgBox>
            <Name>title</Name>
          </SpotItem>
          <SpotItem>
            <ImgBox>
              <Img />
            </ImgBox>
            <Name>title</Name>
          </SpotItem>
          <SpotItem>
            <ImgBox>
              <Img />
            </ImgBox>
            <Name>title</Name>
          </SpotItem>
          <SpotItem>
            <ImgBox>
              <Img />
            </ImgBox>
            <Name>title</Name>
          </SpotItem>
          <SpotItem>
            <ImgBox>
              <Img />
            </ImgBox>
            <Name>title</Name>
          </SpotItem>
          <SpotItem>
            <ImgBox>
              <Img />
            </ImgBox>
            <Name>title</Name>
          </SpotItem>

          <SpotItem>
            <ImgBox>
              <Img />
            </ImgBox>
            <Name>title</Name>
          </SpotItem>
        </SpotList>
      </Container>
    </HomeSpotBlock>
  );
};

export default HomeSpot;
