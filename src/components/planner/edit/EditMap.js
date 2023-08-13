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
    background-color: var(--md-sys-color-surface);
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0px 1px 3px -2px var(--md-sys-color-shadow);
    margin-bottom: 10px;
    color: var(--md-sys-color-on-background);

    &:hover {
        box-shadow: 0px 1px 6px -3px var(--md-sys-color-shadow);
        color: var(--md-sys-color-primary);
    }
    a {
        display: block;
        color: var(--md-sys-color-on-background);
        height: 100%;
        line-height: 3rem;
        &:hover {
            color: var(--md-sys-color-primary);
        }
    }
    ${(props) =>
        props.allSchedule &&
        css`
            color: var(--md-sys-color-on-primary-container);
            background-color: var(--md-sys-color-primary-container);
        `}
`;

const EditMap = ({ mapRef, allSchedule, onClickAllSchedule, onSavePlanner, tutorialVisible, onClickTutorialModal }) => {
    return (
        <>
            <EditMapBlock>
                <Map ref={mapRef} />
                <ButtonBox>
                    <Button onClick={onClickTutorialModal}>사용 방법</Button>
                    <Button allSchedule={allSchedule} onClick={onClickAllSchedule}>
                        모든 일정 보기
                    </Button>
                    <Button onClick={onSavePlanner}>일정 저장</Button>
                </ButtonBox>
            </EditMapBlock>
            {tutorialVisible && <EditTutorialModal onClickTutorialModal={onClickTutorialModal} />}
        </>
    );
};

export default EditMap;
