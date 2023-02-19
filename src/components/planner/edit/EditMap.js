import { useRef, useEffect } from 'react';
import styled from 'styled-components';

const EditMapBlock = styled.div`
    width: calc(100% - 720px);
    min-width: 200px;
    height: 750px;
    float: left;
`;

const ButtonBox = styled.div`
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 999;
    display: flex;
    flex-direction: column;
    button {
        margin-bottom: 10px;
    }
`;

const Button = styled.button`
    border: none;
    border-radius: 1rem;
    width: 8rem;
    height: 3rem;
    background-color: rgba(255, 203, 193, 80%);
    color: white;
    font-weight: bold;
    &:hover {
        transform: translate(1px, -1px);
    }
    cursor: pointer;
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
            <ButtonBox>
                <Button>사용 방법</Button>
                <Button>멤버 초대</Button>
                <Button>장소 등록</Button>
                <Button>일정 저장</Button>
            </ButtonBox>
        </EditMapBlock>
    );
};

export default EditMap;
