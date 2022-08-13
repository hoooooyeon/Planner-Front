import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import SliderImg from './SliderImg';

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
  return (
    <>
      <SpotSliderBlock>
        <SliderImgs>
          <SliderImg />
        </SliderImgs>
      </SpotSliderBlock>
      <PrevButton icon={faAngleLeft} />
      <NextButton icon={faAngleRight} />
    </>
  );
};

export default SpotSlider;
