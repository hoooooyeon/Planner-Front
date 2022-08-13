import styled from 'styled-components';

const SliderImgBlock = styled.div`
  width: 1215px;
  height: 600px;
  background-color: lightgray;
  float: left;
`;

const ImgBox = styled.div``;

const Img = styled.div``;

const SliderImg = () => {
  return (
    <SliderImgBlock>
      <ImgBox>
        <Img />
        <h1>천안시장</h1>
      </ImgBox>
      <ImgBox>
        <Img />
        <h1>안산드레스</h1>
      </ImgBox>
      <ImgBox>
        <Img />
        <h1>마계인천</h1>
      </ImgBox>
    </SliderImgBlock>
  );
};

export default SliderImg;
