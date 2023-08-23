import styled, { css } from 'styled-components';
import EditTutorialModal from './EditTutorialModal';

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
    background-color: ${(props) => props.theme.primaryButtonBackgroundColor};
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    margin-bottom: 10px;
    color: ${(props) => props.theme.secondaryColor};
    &:hover {
        box-shadow: 0px 1px 6px ${(props) => props.theme.shadowColor};
        color: ${(props) => props.theme.hoverColor};
    }
    a {
        display: block;
        color: ${(props) => props.theme.secondaryColor};
        height: 100%;
        line-height: 3rem;
        &:hover {
            color: ${(props) => props.theme.hoverColor};
        }
    }
    ${(props) =>
        props.allSchedule &&
        css`
            color: ${(props) => props.theme.primaryColor};
            background-color: ${(props) => props.theme.clickedButtonBackgroundColor};
            &:hover {
                color: ${(props) => props.theme.primaryColor};
            }
        `}
`;

const EditMap = ({ mapRef, allSchedule, onClickAllSchedule, onSavePlanner, tutorialVisible, onClickTutorialModal }) => {
    return (
        <>
            <EditMapBlock>
                <Map ref={mapRef} />
                <ButtonBox>
                    <Button allSchedule={allSchedule} onClick={onClickAllSchedule}>
                        모든 일정 보기
                    </Button>
                    <Button onClick={onClickTutorialModal}>사용 방법</Button>
                    <Button onClick={onSavePlanner}>일정 저장</Button>
                </ButtonBox>
            </EditMapBlock>
            {tutorialVisible && <EditTutorialModal onClickTutorialModal={onClickTutorialModal} />}
        </>
    );
};

export default EditMap;
