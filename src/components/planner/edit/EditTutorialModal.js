import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import { useEffect } from 'react';

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
`;
const CloseButton = styled(FontAwesomeIcon)`
    width: 3rem;
    height: 3rem;
    position: absolute;
    z-index: 999;
    top: 2rem;
    right: 2rem;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
`;

const EditTutorialModalBlock = styled.div`
    background-color: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    position: relative;
    @media all and (min-width: 768px) {
        width: 80%;
        height: 80%;
    }
`;

const Container = styled.div`
    margin: 0 auto;
    overflow: hidden;
    width: 100%;
    padding: 0;
`;

const SliderList = styled.ul`
    display: flex;
    width: calc(5 * 100%);
    margin: 0;
    padding: 0;
`;

const SliderItem = styled.li`
    width: 100%;
    float: left;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    position: relative;
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
    /* object-fit: cover; */
`;

const ArrowIcon = styled(FontAwesomeIcon)`
    width: 2rem;
    height: 2rem;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
`;

const ArrowRight = styled(ArrowIcon)`
    position: absolute;
    right: 10px;
    top: 50%;
}
`;
const ArrowLeft = styled(ArrowIcon)`
    position: absolute;
    left: 10px;
    top: 50%;
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
    li + li {
        margin-left: 0.5rem;
    }
`;

const CircleIcon = styled(FontAwesomeIcon)`
    color: rgba(255, 255, 255, 0.6);
    width: 0.8rem;
    height: 0.8rem;
    cursor: pointer;
    ${(props) =>
        props.cur &&
        css`
            color: lightblue;
        `}
    &[aria-current] {
        color: lightblue;
    }
`;

const Step = styled.div`
    color: white;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

const EditTutorialModal = ({ onClickTutorialModal }) => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const listRef = useRef();
    const arr = [1, 2, 3, 4, 5];

    const onClickRight = () => {
        if (currentIndex < arr.length) {
            setCurrentIndex((currentIndex) => currentIndex + 1);
        }
    };

    const onClickLeft = () => {
        if (currentIndex > 1) {
            setCurrentIndex((currentIndex) => currentIndex - 1);
        }
    };

    // 슬라이더 스타일 변경
    useEffect(() => {
        listRef.current.style = 'transform: translateX(-' + 20 * (currentIndex - 1) + '%)';
        listRef.current.style.transition = '0s';
    }, [currentIndex]);
    return (
        <ModalBackground>
            <CloseButton icon={faXmark} onClick={onClickTutorialModal} />
            <EditTutorialModalBlock>
                <ArrowLeft icon={faChevronLeft} onClick={onClickLeft} />
                <Container>
                    <SliderList ref={listRef}>
                        {arr &&
                            arr.map((i) => (
                                <SliderItem key={i}>
                                    <Step>STEP{i}</Step>
                                    <Img alt={i} />
                                    {i}
                                </SliderItem>
                            ))}
                    </SliderList>
                </Container>
                <GuideList>
                    {arr.map((i) => (
                        <li onClick={() => setCurrentIndex(i)}>
                            <CircleIcon icon={faCircle} aria-current={currentIndex === i ? 'cur' : null} />
                        </li>
                    ))}
                </GuideList>
                <ArrowRight icon={faChevronRight} onClick={onClickRight} />
            </EditTutorialModalBlock>
        </ModalBackground>
    );
};

export default EditTutorialModal;
