import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import SliderImg from './SliderImg';
import { useRef, useState } from 'react';

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
  const [currentIndex, setCurrentIndex] = useState(1);
  const imgsRef = useRef();

  const handleSlide = (currentIndex) => {
    if (currentIndex > 3) {
      currentIndex = 1;
    } else if (currentIndex === 0) {
      currentIndex = 3;
    }
    setCurrentIndex(currentIndex);
  };

  const handleSwipe = (direction) => {
    handleSlide(currentIndex + direction);
  };
  const handlePrev = (direction) => {
    handleSlide(currentIndex + direction);
    console.log('prev' + currentIndex);
    imgsRef.current.style =
      'transform: translateX(-' + 1215 * currentIndex + 'px)';
  };
  const handleNext = (direction) => {
    handleSlide(currentIndex + direction);
    console.log('next' + currentIndex);
    imgsRef.current.style =
      'transform: translateX(' + 1215 * currentIndex + 'px)';
  };
  return (
    <>
      <SpotSliderBlock>
        <SliderImgs ref={imgsRef}>
          <SliderImg />
        </SliderImgs>
      </SpotSliderBlock>
      <PrevButton icon={faAngleLeft} onClick={() => handlePrev(-1)} />
      <NextButton icon={faAngleRight} onClick={() => handleNext(1)} />
    </>
  );
};

export default SpotSlider;
