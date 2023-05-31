import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const FooterBlock = styled.div`
  /* transform: translateY(55%); */
  /* padding-top: 50px; */
  background-color: lightgray;
  position: relative;
  /* width: calc(100% - 8rem); */
  height: 300px;
  display: flex;
  justify-content: space-between;
  padding: 2rem 8rem;
`;

const Music = styled.div`
  display: flex;
  flex-direction: column;
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
`;

const Info = styled.div`
  font-size: 15px;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div:first-child {
    font-size: 17px;
  }
  div:last-child {
    font-size: 30px;
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

const Footer = () => {
  const onScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <FooterBlock>
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
        <Logo>
          <div>대한민국 여행의 전부</div>
          <div>한국다봄</div>
        </Logo>
      </MiddleBox>
      <Info>
        <p>Tel: 010-****-****, 010-****-****</p>
        <p>Email: B*******@gmail.com, l******@gmail.com</p>
      </Info>
      {/* <UpButton icon={faArrowUp} onClick={onScrollToTop} /> */}
    </FooterBlock>
  );
};

export default Footer;
