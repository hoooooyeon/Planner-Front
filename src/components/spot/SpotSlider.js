import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import SliderImg from './SliderImg';
import { useRef } from 'react';

const SpotSliderBlock = styled.div`
  width: 1215px;
  height: 600px;
  border: 1px solid green;
  overflow: hidden;
  h1 {
    z-index: 100;
    position: absolute;
    top: 80%;
    left: 45%;
    color: white;
  }
`;

const SliderImgs = styled.div`
  width: 3645px;
  height: 600px;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  z-index: 100;
  position: absolute;
  top: 50%;
  font-size: 30px;
  &:hover {
    cursor: pointer;
  }
`;

const PrevButton = styled(StyledFontAwesomeIcon)`
  left: 11%;
`;
const NextButton = styled(StyledFontAwesomeIcon)`
  right: 11%;
`;

const SpotSlider = () => {
  const imgsRef = useRef();
  const imgIndex = useRef(1);

  const prevHandle = () => {
    imgsRef.current.style.transform = 'translate3d(-1215px, 0px, 0px)';
    imgIndex.current -= 1;
    // if (imgIndex > 1) {
    // }
  };

  const nextHandle = () => {
    imgsRef.current.style.transform = 'translate3d(1215px, 0px, 0px)';
    imgIndex.current += 1;
    // if (imgIndex < 3) {
    // }
  };

  return (
    <>
      <SpotSliderBlock>
        <SliderImgs ref={imgsRef}>
          <SliderImg />
        </SliderImgs>
      </SpotSliderBlock>
      <PrevButton icon={faAngleLeft} onClick={prevHandle} />
      <NextButton icon={faAngleRight} onClick={nextHandle} />
    </>
  );
};

export default SpotSlider;
