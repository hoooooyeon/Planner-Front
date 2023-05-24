import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';

const SpotSliderBlock = styled.div`
    width: 100%;
    height: 100%;
`;

const Container = styled.div`
    margin: 0 auto;
    overflow: hidden;
    width: 100%;
    padding: 0;
    @media all and (min-width: 768px) {
        width: calc(100% - 80px);
    }
    @media all and (min-width: 960px) {
        width: 100%;
    }
`;

const SliderList = styled.ul`
    display: flex;
    width: calc(5 * 100%);
    transform: translateX(-20%);
    margin: 0;
    padding: 0;
`;

const SliderItem = styled.li`
    width: 100%;
    height: 44vw;
    background-color: lightgray;
    float: left;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    position: relative;
    h1 {
        color: white;
        position: absolute;
        top: 80%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
`;

// const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
//     z-index: 100;
//     font-size: 30px;
//     position: absolute;
//     top: 380px;
//     &:hover {
//         cursor: pointer;
//     }
//     ${(props) =>
//         props.home &&
//         css`
//             top: 0;
//         `}
// `;

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

const SpotSlider = ({ sliderSpots }) => {
    const [currentIndex, setCurrentIndex] = useState(2);
    const listRef = useRef();

    // 슬라이더 버튼
    // const handleSwipe = (direction) => {
    //     setCurrentIndex(currentIndex + direction);
    // };

    // 무한 슬라이더
    useEffect(() => {
        if (sliderSpots) {
            const TOTAL_SLIDES = sliderSpots.length;
            if (currentIndex === 1) {
                setTimeout(() => {
                    listRef.current.style = 'transform: translateX(-' + 20 * (TOTAL_SLIDES - 2) + '%)';
                    listRef.current.style.transition = '0s';
                    setCurrentIndex(TOTAL_SLIDES - 1);
                }, 800);
            }
            if (currentIndex === TOTAL_SLIDES) {
                setTimeout(() => {
                    listRef.current.style = 'transform: translateX(-' + 20 + '%)';
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
        }
    }, [currentIndex, sliderSpots]);

    // 슬라이더 스타일 변경
    useEffect(() => {
        listRef.current.style = 'transform: translateX(-' + 20 * (currentIndex - 1) + '%)';
        listRef.current.style.transition = 'all 0.5s ease-in-out';
    }, [currentIndex]);

    return (
        <SpotSliderBlock>
            <Container>
                <SliderList ref={listRef}>
                    {sliderSpots &&
                        sliderSpots.map((s, i) => (
                            <SliderItem key={i}>
                                <Img alt={s.title} src={s.image} />
                                <h1>{s.title}</h1>
                            </SliderItem>
                        ))}
                </SliderList>
                {/* <PrevButton  icon={faAngleLeft} onClick={() => handleSwipe(-1)} />
                <NextButton  icon={faAngleRight} onClick={() => handleSwipe(1)} /> */}
            </Container>
        </SpotSliderBlock>
    );
};

export default SpotSlider;
