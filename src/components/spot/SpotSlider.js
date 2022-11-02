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
    /* width: 1200px;
    height: 650px; */
    /* @media all and (min-width: 960px) and (m-width: 1280px) {
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
    } */
    @media all and (min-width: 620px) {
        max-width: 480px;
        height: 350px;
    }
    @media all and (min-width: 1025px) {
        max-width: 1112px;
        height: 550px;
    }
    @media all and (min-width: 1280px) {
        max-width: 1280px;
        height: 650px;
    }
`;

const SliderList = styled.div`
    width: calc(5 * 1200px);
    height: 100%;
    @media all and (min-width: 960px) and (max-width: 1280px) {
        width: calc(5 * 959px);
    }
    @media all and (min-width: 768px) and (max-width: 960px) {
        width: calc(5 * 767px);
    }
    @media all and (max-width: 768px) {
        width: calc(5 * 480px);
    }
`;

const SliderItem = styled.div`
    width: 1200px;
    height: 100%;
    background-color: lightgray;
    float: left;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    @media all and (min-width: 960px) and (max-width: 1280px) {
        width: 959px;
    }
    @media all and (min-width: 768px) and (max-width: 960px) {
        width: 767px;
    }
    @media all and (max-width: 768px) {
        width: 480px;
    }
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

// const PrevButton = styled(StyledFontAwesomeIcon)`
//     left: 10%;
//     position: absolute;
//     bottom: 50%;
// `;
// const NextButton = styled(StyledFontAwesomeIcon)`
// right: 10%
// position: absolute;
// bottom: 50%;
// `;

const SpotSlider = () => {
    const TOTAL_SLIDES = 5;
    const [currentIndex, setCurrentIndex] = useState(2);
    const listRef = useRef();
    const itemRef = useRef();

    // 슬라이더 버튼
    // const handleSwipe = (direction) => {
    //     setCurrentIndex(currentIndex + direction);
    // };

    // 무한 슬라이더
    useEffect(() => {
        if (currentIndex === 1) {
            setTimeout(() => {
                listRef.current.style = 'transform: translateX(-' + itemRef.current.clientWidth * (TOTAL_SLIDES - 2) + 'px)';
                listRef.current.style.transition = '0s';
                setCurrentIndex(TOTAL_SLIDES - 1);
            }, 800);
        }
        if (currentIndex === TOTAL_SLIDES) {
            setTimeout(() => {
                listRef.current.style = 'transform: translateX(-' + itemRef.current.clientWidth + 'px)';
                listRef.current.style.transition = '0s';
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
        listRef.current.style = 'transform: translateX(-' + itemRef.current.clientWidth * (currentIndex - 1) + 'px)';
        listRef.current.style.transition = 'all 0.5s ease-in-out';
    }, [currentIndex]);

    return (
        <SpotSliderBlock>
            <Container>
                <SliderList ref={listRef}>
                    <SliderItem ref={itemRef}>
                        <h1>clone마계인천</h1>
                    </SliderItem>
                    <SliderItem>
                        <h1>천안시장</h1>
                    </SliderItem>
                    <SliderItem>
                        <h1>안산드레스</h1>
                    </SliderItem>
                    <SliderItem>
                        <h1>마계인천</h1>
                    </SliderItem>
                    <SliderItem>
                        <h1>clone천안시장</h1>
                    </SliderItem>
                </SliderList>
                {/* <PrevButton  icon={faAngleLeft} onClick={() => handleSwipe(-1)} />
                <NextButton  icon={faAngleRight} onClick={() => handleSwipe(1)} /> */}
            </Container>
        </SpotSliderBlock>
    );
};

export default SpotSlider;
