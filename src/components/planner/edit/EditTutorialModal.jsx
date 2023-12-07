import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import tutorialBackground from '../../../lib/images/tutorialBackground.jpg';
import tutorial1 from '../../../lib/images/tutorial1.jpg';
import tutorial2 from '../../../lib/images/tutorial2.jpg';
import tutorial3 from '../../../lib/images/tutorial3.jpg';
import tutorial4 from '../../../lib/images/tutorial4.jpg';
import tutorial5 from '../../../lib/images/tutorial5.jpg';

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    @media all and (max-width: 768px) {
        background-color: rgba(0, 0, 0, 0.9);
    }
`;
const CloseButton = styled(FontAwesomeIcon)`
    width: 3rem;
    height: 3rem;
    position: absolute;
    z-index: 999;
    top: 0;
    right: 0;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
`;

const EditTutorialModalBlock = styled.div`
    background-color: rgba(0, 0, 0, 0.6);
    width: 90%;
    position: relative;
    @media all and (min-width: 769px) {
        width: 80%;
    }
`;

const Container = styled.div`
    margin: 0 auto;
    width: 100%;
    height: 100%;
    padding: 0;
`;

const SliderList = styled.ul`
    display: flex;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
`;

const SliderItem = styled.li`
    width: 100%;
    float: left;
    align-items: flex-end;
    justify-content: center;
    position: relative;
    padding-top: 90%;
    overflow: hidden;
    display: none;
    &[aria-current] {
        display: flex;
    }
    @media all and (min-width: 769px) {
        padding-top: 70%;
    }
    @media all and (min-width: 1025px) {
        padding-top: 50%;
    }
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
`;

const ImgCover = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
`;

const ArrowIcon = styled(FontAwesomeIcon)`
    width: 2rem;
    height: 2rem;
    border-radius: 2rem;
    padding: 0.2rem;
    background-color: rgba(0, 0, 0, 0.6);
    color: rgba(255, 255, 255, 0.6);
    z-index: 1;
    cursor: pointer;
`;

const ArrowRight = styled(ArrowIcon)`
    position: absolute;
    right: 10px;
    top: 45%;
}
`;
const ArrowLeft = styled(ArrowIcon)`
    position: absolute;
    left: 10px;
    top: 45%;
}
`;

const GuideList = styled.ul`
    display: flex;
    margin: 0 auto;
    padding: 0;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.5);
    padding: 0.2rem 0.5rem;
    border-radius: 1rem;
    li + li {
        margin-left: 0.5rem;
    }
`;

const CircleIcon = styled(FontAwesomeIcon)`
    color: rgba(255, 255, 255, 0.6);
    width: 0.8rem;
    height: 0.8rem;
    cursor: pointer;
    &[aria-current] {
        color: var(--md-sys-color-primary-container);
    }
`;

const StepCount = styled.div`
    z-index: 1;
    color: white;
    position: absolute;
    left: 50%;
    top: 5%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.5);
    padding: 0.2rem;
    border-radius: 0.5rem;
`;

const StepImg1 = styled.img`
    position: absolute;
    width: 20%;
    height: 12%;
    top: 83px;
    left: 2px;
    border-radius: 1rem;
    display: none;
    &[aria-current] {
        display: flex;
    }
    @media all and (min-width: 768px) {
        width: 15%;
        height: 12%;
    }
`;
const StepImg2 = styled.img`
    position: absolute;
    width: 10.5%;
    height: 75%;
    top: 164px;
    left: 2px;
    border-radius: 1rem;
    display: none;
    &[aria-current] {
        display: flex;
    }
    @media all and (min-width: 768px) {
        width: 6.5%;
        height: 72%;
    }
`;
const StepImg3 = styled.img`
    position: absolute;
    width: 45%;
    height: 99%;
    top: 2px;
    right: 2px;
    border-radius: 1rem;
    display: none;
    &[aria-current] {
        display: flex;
    }
    @media all and (min-width: 768px) {
        width: 27%;
        height: 99%;
    }
`;
const StepImg4 = styled.img`
    position: absolute;
    width: 55%;
    height: 80%;
    top: 132px;
    left: 2px;
    border-radius: 1rem;
    display: none;
    &[aria-current] {
        display: flex;
    }
    @media all and (min-width: 768px) {
        width: 26%;
        height: 77.5%;
    }
`;
const StepImg5 = styled.img`
    position: absolute;
    width: 53%;
    height: 99%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 1rem;
    display: none;
    &[aria-current] {
        display: flex;
    }
`;

const StepText = styled.div`
    position: absolute;
    top: 12%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 0.2rem;
    border-radius: 0.5rem;
    z-index: 1;
    margin-top: 0.5rem;
    white-space: nowrap;
`;

const EditTutorialModal = ({ onClickTutorialModal }) => {
    const tutorialArr = [
        '1. 여행 출발일을 선택하세요.',
        '2. 날짜를 추가하고, 일정을 추가할 날짜를 선택하세요.',
        '3. 여행지를 검색하고, 리스트에서 여행지를 추가하세요.',
        'Tip! 날짜와 일정의 순서를 바꿀 수 있습니다.',
        'Tip! 지도에서 여행 루트를 확인하세요.',
    ];
    const [currentIndex, setCurrentIndex] = useState(1);
    const listRef = useRef();

    const onClickRight = () => {
        if (currentIndex < tutorialArr.length) {
            setCurrentIndex((currentIndex) => currentIndex + 1);
        }
    };

    const onClickLeft = () => {
        if (currentIndex > 1) {
            setCurrentIndex((currentIndex) => currentIndex - 1);
        }
    };

    return (
        <ModalBackground>
            <EditTutorialModalBlock>
                <ArrowLeft icon={faChevronLeft} onClick={onClickLeft} />
                <Container>
                    <SliderList ref={listRef}>
                        {tutorialArr &&
                            tutorialArr.map((_, i) => (
                                <SliderItem key={i} aria-current={currentIndex === i + 1 ? 'cur' : null}>
                                    <CloseButton icon={faXmark} onClick={onClickTutorialModal} />
                                    <Img alt={i} src={tutorialBackground} />
                                    <ImgCover />
                                    <StepCount>STEP{i + 1}</StepCount>
                                    <StepText>{tutorialArr[i]}</StepText>
                                    <StepImg1
                                        alt={tutorial1}
                                        src={tutorial1}
                                        aria-current={currentIndex === 1 ? 'cur' : null}
                                    />
                                    <StepImg2
                                        alt={tutorial2}
                                        src={tutorial2}
                                        aria-current={currentIndex === 2 ? 'cur' : null}
                                    />
                                    <StepImg3
                                        alt={tutorial3}
                                        src={tutorial3}
                                        aria-current={currentIndex === 3 ? 'cur' : null}
                                    />
                                    <StepImg4
                                        alt={tutorial4}
                                        src={tutorial4}
                                        aria-current={currentIndex === 4 ? 'cur' : null}
                                    />
                                    <StepImg5
                                        alt={tutorial5}
                                        src={tutorial5}
                                        aria-current={currentIndex === 5 ? 'cur' : null}
                                    />
                                </SliderItem>
                            ))}
                    </SliderList>
                </Container>
                <GuideList>
                    {tutorialArr.map((_, i) => (
                        <li key={i} onClick={() => setCurrentIndex(i + 1)}>
                            <CircleIcon icon={faCircle} aria-current={currentIndex === i + 1 ? 'cur' : null} />
                        </li>
                    ))}
                </GuideList>
                <ArrowRight icon={faChevronRight} onClick={onClickRight} />
            </EditTutorialModalBlock>
        </ModalBackground>
    );
};

export default EditTutorialModal;
