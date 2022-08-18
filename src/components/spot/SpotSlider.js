import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';

const SpotSliderBlock = styled.div`
  width: 1215px;
  height: 600px;
  border: 1px solid green;
  overflow: hidden;
  h1 {
    color: white;
  }
`;

const SliderImgs = styled.div`
  width: 3645px;
  height: 600px;
`;

const SliderImg = styled.div`
  width: 1215px;
  height: 600px;
  background-color: lightgray;
  float: left;
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

const TOTAL_SLIDES = 3;
const SpotSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const imgsRef = useRef();

  const handleSlide = (currentIndex) => {
    if (currentIndex > TOTAL_SLIDES) {
      currentIndex = 1;
    } else if (currentIndex === 0) {
      currentIndex = TOTAL_SLIDES;
    }
    setCurrentIndex(currentIndex);
    imgsRef.current.style = 'transform: translateX(-' + 1215 * (currentIndex - 1) + 'px)';
    imgsRef.current.style.transition = 'all 0.5s ease-in-out';
  };

  const handleSwipe = (direction) => {
    handleSlide(currentIndex + direction);
  };

  return (
    <>
      <SpotSliderBlock>
        <SliderImgs ref={imgsRef}>
          <SliderImg>
            <div>1</div>
            <h1>천안시장</h1>
          </SliderImg>
          <SliderImg>
            <div>2</div>
            <h1>안산드레스</h1>
          </SliderImg>
          <SliderImg>
            <div>3</div>
            <h1>마계인천</h1>
          </SliderImg>
        </SliderImgs>
      </SpotSliderBlock>
      <PrevButton icon={faAngleLeft} onClick={() => handleSwipe(-1)} />
      <NextButton icon={faAngleRight} onClick={() => handleSwipe(1)} />
    </>
  );
};

export default SpotSlider;
