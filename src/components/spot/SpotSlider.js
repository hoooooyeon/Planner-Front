import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';

const SpotSliderBlock = styled.div`
  margin-top: 50px;
  width: 100%;
  height: 600px;
  overflow: hidden;
`;

const SliderImgs = styled.div`
  width: 6075px;
  height: 600px;
`;

const SliderImg = styled.div`
  width: 1215px;
  height: 600px;
  background-color: lightgray;
  float: left;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  h1 {
    color: white;
  }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  z-index: 100;
  font-size: 30px;
  position: absolute;
  top: 50%;
  &:hover {
    cursor: pointer;
  }
  ${(props) =>
    props.home &&
    css`
      top: 280%;
    `}
`;

const PrevButton = styled(StyledFontAwesomeIcon)`
  left: 11%;
`;
const NextButton = styled(StyledFontAwesomeIcon)`
  right: 11%;
`;

const TOTAL_SLIDES = 5;
const SpotSlider = (props) => {
  const [currentIndex, setCurrentIndex] = useState(2);
  const imgsRef = useRef();

  // 슬라이더 버튼
  const handleSwipe = (direction) => {
    setCurrentIndex(currentIndex + direction);
  };

  // 무한 슬라이더
  useEffect(() => {
    if (currentIndex === 1) {
      setTimeout(() => {
        imgsRef.current.style = 'transform: translateX(-' + 1215 * (TOTAL_SLIDES - 2) + 'px)';
        imgsRef.current.style.transition = '0s';
        setCurrentIndex(TOTAL_SLIDES - 1);
      }, 800);
    }
    if (currentIndex === TOTAL_SLIDES) {
      setTimeout(() => {
        imgsRef.current.style = 'transform: translateX(-' + 1215 + 'px)';
        imgsRef.current.style.transition = '0s';
        setCurrentIndex(2);
      }, 800);
    }

    // 자동 슬라이더
    const timeoutId = setInterval(() => {
      if (currentIndex < TOTAL_SLIDES) {
        setCurrentIndex((currentIndex) => currentIndex + 1);
      } else {
        setCurrentIndex(1);
      }
    }, 2500);

    return () => clearInterval(timeoutId);
  }, [currentIndex]);

  // 슬라이더 스타일 변경
  useEffect(() => {
    imgsRef.current.style = 'transform: translateX(-' + 1215 * (currentIndex - 1) + 'px)';
    imgsRef.current.style.transition = 'all 0.5s ease-in-out';
  }, [currentIndex]);

  return (
    <>
      <SpotSliderBlock>
        <SliderImgs ref={imgsRef}>
          <SliderImg>
            <div>clone3</div>
            <h1>clone3</h1>
          </SliderImg>
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
          <SliderImg>
            <div>clone1</div>
            <h1>clone1</h1>
          </SliderImg>
        </SliderImgs>
      </SpotSliderBlock>
      <PrevButton {...props} icon={faAngleLeft} onClick={() => handleSwipe(-1)} />
      <NextButton {...props} icon={faAngleRight} onClick={() => handleSwipe(1)} />
    </>
  );
};

export default SpotSlider;
