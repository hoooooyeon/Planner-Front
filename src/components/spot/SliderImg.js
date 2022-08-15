import styled from 'styled-components';

const ImgBox = styled.div`
  width: 1215px;
  height: 600px;
  background-color: lightgray;
  float: left;
`;

const Img = styled.div``;

const SliderImg = () => {
  return (
    <>
      <ImgBox>
        <Img>1</Img>
        {/* <h1>천안시장</h1> */}
      </ImgBox>
      <ImgBox>
        <Img>2</Img>
        {/* <h1>안산드레스</h1> */}
      </ImgBox>
      <ImgBox>
        <Img>3</Img>
        {/* <h1>마계인천</h1> */}
      </ImgBox>
    </>
  );
};

export default SliderImg;
