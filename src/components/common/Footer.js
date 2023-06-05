import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const FooterBlock = styled.div`
  /* transform: translateY(55%); */
  /* padding-top: 50px; */
  /* width: calc(100% - 8rem); */
  width: 100%;
  height: 500px;
  /* padding: 2rem 8rem; */
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const RelativeDiv = styled.div`
  position: relative;
`;

const FooterBox = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
  padding: 2rem 6rem;
`;

const Img = styled.img`
  width: 100%;
  height: 700px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`;

const Music = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    font-size: 1.2rem;
  }
  p {
    font-size: 0.9rem;
  }
`;

const MusicImg = styled.img`
  background-color: black;
  width: 120px;
  height: 120px;
`;

const MiddleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Writing = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    font-size: 1.2rem;
  }
  p {
    font-size: 0.9rem;
  }
`;

const Logo = styled.div`
  height: 150px;
  padding: 2rem;
  background-color: rgb(216, 206, 192);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div:first-child {
    font-size: 0.9rem;
  }
  div:last-child {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    font-size: 0.9rem;
  }
`;
const UpButton = styled(FontAwesomeIcon)`
  font-size: 30px;
  /* position: absolute;
  right: 50px;
  display: none; */
  float: right;

  &:hover {
    cursor: pointer;
  }
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 10px;
  p {
    margin-bottom: 0;
  }
  p + p {
    margin: 0;
  }
`;

const Footer = () => {
  const onScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <FooterBlock>
      <RelativeDiv>
        <Img alt="footerImg" src={'http://tong.visitkorea.or.kr/cms/resource/28/2774128_image2_1.jpg'} />

        <FooterBox>
          <Music>
            <h3>Currently vibing to:</h3>
            <MusicImg />
            <p>The Weekend (Funk Wav Remix)</p>
            <p>By SZA, Calvin Harris, Funk Wav</p>
          </Music>
          <MiddleBox>
            <Writing>
              <h3>Travel Quotes</h3>
              <p>I am not the same, having seen the moon shine on the other side of the world. </p>
            </Writing>
          </MiddleBox>
          <Info>
            <FlexDiv>
              <p>Tel: </p>
              <ColumnDiv>
                <p> 010-****-****</p>
                <p> 010-****-****</p>
              </ColumnDiv>
            </FlexDiv>
            <FlexDiv>
              <p>Email:</p>
              <ColumnDiv>
                <p> B*******@gmail.com</p>
                <p> l******@gmail.com</p>
              </ColumnDiv>
            </FlexDiv>
          </Info>
        </FooterBox>
      </RelativeDiv>
      <Logo>
        <div>대한민국 여행의 전부</div>
        <div>한국다봄</div>
      </Logo>

      {/* <UpButton icon={faArrowUp} onClick={onScrollToTop} /> */}
    </FooterBlock>
  );
};

export default Footer;
