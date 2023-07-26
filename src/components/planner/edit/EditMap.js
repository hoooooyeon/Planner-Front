import styled, { css } from 'styled-components';

const EditMapBlock = styled.div`
    width: calc(100% - 392px);
    height: 100vh;
    float: left;
    position: relative;
`;

const Map = styled.div`
    width: 100%;
    height: 100%;
`;

const ButtonBox = styled.div`
    position: fixed;
    left: 405px;
    top: 10px;
    z-index: 150;
    display: flex;
    flex-direction: column;
`;

const Button = styled.button`
    border: none;
    border-radius: 2rem;
    width: 8rem;
    height: 3rem;
    color: gray;
    background-color: white;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
    margin-bottom: 10px;
    &:hover {
        transition: transform 0.3s ease;
        transform: scale(1.05);
    }
    a {
        display: block;
        color: gray;
        height: 100%;
        line-height: 3rem;
    }
    ${(props) =>
        props.allSchedule &&
        css`
            background-color: #ebdede;
        `}
`;

const EditMap = ({ mapRef, allSchedule, onClickAllSchedule, onSavePlanner }) => {
    return (
        <EditMapBlock>
            <Map ref={mapRef} />
            <ButtonBox>
                <Button>사용 방법</Button>
                <Button allSchedule={allSchedule} onClick={onClickAllSchedule}>
                    모든 일정 보기
                </Button>
                <Button onClick={onSavePlanner}>일정 저장</Button>
            </ButtonBox>
        </EditMapBlock>
    );
};

export default EditMap;
