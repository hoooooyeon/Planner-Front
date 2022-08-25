import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../common/Button';

const EditMapBlock = styled.div`
  width: 1000px;
  min-width: 200px;
  height: 750px;
`;

const FunctionBox = styled.div`
  position: absolute;
  left: 2%;
  top: 1%;
  z-index: 999;
  display: flex;
  flex-direction: column;
  button {
    margin-bottom: 10px;
  }
`;

const EditMap = () => {
  const { kakao } = window;
  const container = useRef(null);
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3,
  };
  useEffect(() => {
    new kakao.maps.Map(container.current, options);
    return () => {};
  }, []);

  return (
    <EditMapBlock id="map" ref={container}>
      <FunctionBox>
        <Button big>사용 방법</Button>
        <Button big>장소 등록</Button>
      </FunctionBox>
    </EditMapBlock>
  );
};

export default EditMap;
