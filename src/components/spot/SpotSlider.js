import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';

const SpotSliderBlock = styled.div`
    margin-top: 100px;
    width: 100%;
    height: 100%;
`;

const Container = styled.div`
    margin: 0 auto;
    overflow: hidden;
    width: 1200px;
    height: 650px;
    
    /* @media all and (min-width: 960px) and (max-width: 1024px) { */
    @media all and (min-width: 960px) and (max-width: 1280px) {
        width: 959px;
        height: 550px;
    }
    @media all and (min-width: 768px) and (max-width: 960px) {
        width: 767px;
        height: 450px;
    }
    @media all and (max-width: 768px) {
        width: 480px;
        height: 350px;
    }
`;

const SliderList = styled.div`
    width: 6000px;
    height: 100%;
`;

const SliderItem = styled.div`
    width: 1200px;
    height: 100%;
    background-color: lightgray;
    float: left;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    h1 {
        color: white;
    }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    z-index: 100;
    font-size: 30px;
    position: absoulte;
    top: 380px;
    &:hover {
        cursor: pointer;
    }
    ${(props) =>
        props.home &&
        css`
            top: 0;
        `}
`;

const PrevButton = styled(StyledFontAwesomeIcon)`
    left: 11%;
`;
const NextButton = styled(StyledFontAwesomeIcon)`
    right: 11%;
`;

const SpotSlider = (props) => {
    const TOTAL_SLIDES = 5;
    const ITEM_SIZE = 1200;
    const [currentIndex, setCurrentIndex] = useState(2);
    const itemRef = useRef();

    // 슬라이더 버튼
    const handleSwipe = (direction) => {
        setCurrentIndex(currentIndex + direction);
    };

    // 무한 슬라이더
    useEffect(() => {
        if (currentIndex === 1) {
            setTimeout(() => {
                itemRef.current.style = 'transform: translateX(-' + ITEM_SIZE * (TOTAL_SLIDES - 2) + 'px)';
                itemRef.current.style.transition = '0s';
                setCurrentIndex(TOTAL_SLIDES - 1);
            }, 800);
        }
        if (currentIndex === TOTAL_SLIDES) {
            setTimeout(() => {
                itemRef.current.style = 'transform: translateX(-' + ITEM_SIZE + 'px)';
                itemRef.current.style.transition = '0s';
                setCurrentIndex(2);
            }, 800);
        }

        // 자동 슬라이더
        const timeoutId = setInterval(() => {
            if (currentIndex < TOTAL_SLIDES) {
                setCurrentIndex((currentIndex) => currentIndex + 1);
            } else {
                setCurrentIndex(1);
            }
        }, 2500);

        return () => clearInterval(timeoutId);
    }, [currentIndex]);

    // 슬라이더 스타일 변경
    useEffect(() => {
        itemRef.current.style = 'transform: translateX(-' + ITEM_SIZE * (currentIndex - 1) + 'px)';
        itemRef.current.style.transition = 'all 0.5s ease-in-out';
    }, [currentIndex]);

    return (
        <SpotSliderBlock>
            <Container>
                <SliderList ref={itemRef}>
                    <SliderItem>
                        <div>clone3</div>
                        <h1>마계인천</h1>
                    </SliderItem>
                    <SliderItem>
                        <div>1</div>
                        <h1>천안시장</h1>
                    </SliderItem>
                    <SliderItem>
                        <div>2</div>
                        <h1>안산드레스</h1>
                    </SliderItem>
                    <SliderItem>
                        <div>3</div>
                        <h1>마계인천</h1>
                    </SliderItem>
                    <SliderItem>
                        <div>clone1</div>
                        <h1>천안시장</h1>
                    </SliderItem>
                </SliderList>
            </Container>
            {/* <PrevButton {...props} icon={faAngleLeft} onClick={() => handleSwipe(-1)} />
            <NextButton {...props} icon={faAngleRight} onClick={() => handleSwipe(1)} /> */}
        </SpotSliderBlock>
    );
};

export default SpotSlider;
