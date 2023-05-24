import { useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import styled, { css } from 'styled-components';

const HiddenBox = styled.div`
    margin: 0 auto;
    overflow: hidden;
    z-index: 1;
`;

const List = styled.ul`
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 0 15px;
    display: flex;
    ${(props) =>
        props.scroll &&
        css`
            width: 750px;
            display: inline-block;
            @media all and (min-width: 768px) {
                width: 100%;
            }
        `}
`;

const ScrollBox = styled.div`
    width: calc(100% - 40px);
    height: 4px;
    margin-top: 5px;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: lightgray;
    overflow: hidden;
    z-index: 1;
    opacity: 0;
    @media all and (min-width: 768px) {
        display: none;
    }
`;

const Scroll = styled.div`
    width: 50%;
    height: 100%;
    background-color: gray;
`;

const Slider = ({ children, list, scroll, transition, page, drag, onChangePageIndex, prevPage, nextPage }) => {
    const hiddenBoxRef = useRef();
    const listRef = useRef();

    let isSlide = false; // 슬라이더 이벤트 실행 조건
    let startX = 0; // 마우스 클릭한 x 좌표
    let currentX = 0; // 마우스 이동한 x 좌표
    const moveX = useRef(0);
    const sliderX = useRef(0);

    const TOTAL_SLIDE = 4;

    const scrollBoxRef = useRef();
    const scrollRef = useRef();
    let scrollMoveX = 0;

    // 슬라이드 마우스 다운
    const sliderStart = (e) => {
        isSlide = true;
        startX = e.clientX;
        drag.current = false;
        if (transition) {
            transition.current = true;
        }
    };

    // 슬라이드 마우스 이동
    const sliderMove = (e) => {
        if (isSlide) {
            currentX = e.clientX;
            moveX.current = sliderX.current + currentX - startX;

            listRef.current.style.transform = 'translateX(' + moveX.current + 'px)';
            listRef.current.style.transitionDuration = '0ms';

            scrollMoveX = -((moveX.current / -(hiddenBoxRef.current.clientWidth - listRef.current.clientWidth)) * 100);
            if (scroll) {
                if (scrollMoveX < 0) {
                    scrollMoveX = 0;
                } else if (scrollMoveX > 100) {
                    scrollMoveX = 100;
                }
                scrollBoxRef.current.style.opacity = 1;
                scrollBoxRef.current.style.transitionDuration = '400ms';

                scrollRef.current.style.transform = 'translateX(' + scrollMoveX + '%)';
                scrollRef.current.style.transitionDuration = '0ms';
            }

            if (!drag.current) {
                drag.current = true;
            }
            if (transition) {
                transition.current = false;
            }
        }
    };

    // 슬라이드 마우스 업
    const sliderEnd = (e) => {
        let itemSize = listRef.current.scrollWidth / TOTAL_SLIDE;
        sliderX.current = Math.round(moveX.current / itemSize) * itemSize;

        if (sliderX.current > 0) {
            sliderX.current = 0;
            if (page) {
                prevPage();
            }
        } else if (sliderX.current < hiddenBoxRef.current.clientWidth - listRef.current.scrollWidth) {
            sliderX.current = hiddenBoxRef.current.clientWidth - listRef.current.scrollWidth;

            // } else if (sliderX.current < hiddenBoxRef.current.clientWidth - listRef.current.clientWidth) {
            //     sliderX.current = hiddenBoxRef.current.clientWidth - listRef.current.clientWidth;
            if (page) {
                nextPage();
            }
        }
        listRef.current.style.transform = 'translateX(' + sliderX.current + 'px)';
        listRef.current.style.transitionDuration = ' 1000ms';

        if (scroll) {
            scrollBoxRef.current.style.opacity = 0;
            scrollBoxRef.current.style.transitionDuration = '2000ms';
        }

        isSlide = false;
    };

    // 너비 변경시 슬라이더 조절
    const sliderResize = () => {
        if (sliderX.current > 0) {
            sliderX.current = 0;
        } else if (sliderX.current < listRef.current.clientWidth - listRef.current.scrollWidth) {
            sliderX.current = hiddenBoxRef.current.clientWidth - listRef.current.scrollWidth;
        }
        listRef.current.style.transform = 'translateX(' + sliderX.current + 'px)';
        listRef.current.style.transitionDuration = '0ms';
    };

    useEffect(() => {
        if (list) {
            let refValue = hiddenBoxRef.current;
            refValue.addEventListener('mousedown', sliderStart);
            window.addEventListener('mousemove', sliderMove);
            window.addEventListener('mouseup', sliderEnd);
            window.addEventListener('resize', sliderResize);

            return () => {
                refValue.removeEventListener('mousedown', sliderStart);
                window.removeEventListener('mousemove', sliderMove);
                window.removeEventListener('mouseup', sliderEnd);
                window.removeEventListener('resize', sliderResize);
            };
        }
    });

    return (
        <>
            <HiddenBox ref={hiddenBoxRef} scroll={scroll}>
                <List
                    ref={listRef}
                    scroll={scroll}
                    // draggable
                    // onDragStart={() => {
                    //     setHell(false);
                    // }}
                >
                    {children}
                </List>
            </HiddenBox>
            {scroll && (
                <ScrollBox ref={scrollBoxRef}>
                    <Scroll ref={scrollRef} />
                </ScrollBox>
            )}
        </>
    );
};

export default Slider;
