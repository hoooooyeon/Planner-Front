import styled from 'styled-components';
import SpotItem from './SpotItem';
import defaultImg from '../../lib/images/defaultImg.jpg';
import SpotDetailModal from './SpotDetailModal';
import { useEffect, useRef, useState } from 'react';

const SpotListBlock = styled.div`
    width: 100%;
    height: 100%;
`;

const Container = styled.div`
    width: 100%;
    height: 100%;
    margin: 10px auto;
    @media all and (min-width: 768px) {
        width: calc(100% - 40px);
        padding: 0 20px;
    }
    @media all and (min-width: 960px) {
        width: 930px;
        padding: 0;
    }
    @media all and (min-width: 1280px) {
        width: 1250px;
        padding: 0;
    }
`;

const MenuTitle = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
    margin-left: 20px;
    @media all and (min-width: 1025px) {
        margin-left: 0;
    }
`;

const Menu = styled.ul`
    width: 100%;
    height: 100%;
    display: flex;
    padding: 0 20px 0 0;
    z-index: 1;
    li {
        white-space: nowrap;
        width: auto;
        margin: 0 15px 5px 0;
        padding: 10px 15px;
        border-radius: 2rem;
        background: #e6e6e6;
        user-select: none;
        &:hover {
            background: lightblue;
            cursor: pointer;
        }
        &[aria-current] {
            background: lightblue;
            font-weight: bold;
            cursor: rever;
        }
    }
`;
const HiddenBox = styled.div`
    margin: 0 auto;
    overflow: hidden;
    z-index: 1;
    @media all and (max-width: 768px) {
        margin-left: 15px;
    }
    @media all and (min-width: 768px) {
        width: calc(100% - 40px);
    }
    @media all and (min-width: 1025px) {
        width: 100%;
    }
`;

const List = styled.ul`
    width: 840px;
    height: 100%;
    margin: 0 auto;
    padding: 0;
    display: inline-block;
    @media all and (min-width: 768px) {
        width: 100%;
    }
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

const SpotList = ({ areas, spots, spotError, detail, currentInfo, isClick, setIsClick, onFirstSpotsPage, onUnloadDetailSpot, onToggleLikeSpot, onOpenDetail }) => {
    // 대체 이미지 넣기
    const onChangeErrorImg = (e) => {
        e.target.src = defaultImg;
    };

    // ---------- 메뉴 슬라이더 ----------
    const menuRef = useRef();
    const menuBoxRef = useRef();

    let mIsSlide = false;
    let mStartX = 0;
    let mCurrentX = 0;
    let mMoveX = 0;
    let mSliderX = 0;

    const menuSliderStart = (e) => {
        setIsClick(true);
        mStartX = e.clientX;
        mIsSlide = true;
        console.log(isClick);
    };

    const menuSliderMove = (e) => {
        if (mIsSlide) {
            console.log(isClick);
            mCurrentX = e.clientX;
            mMoveX = mSliderX + mCurrentX - mStartX;

            menuRef.current.style.transform = ' translateX(' + mMoveX + 'px)';
            menuRef.current.style.transitionDuration = '0ms';
            setIsClick(false);
        }
    };

    const menuSliderEnd = () => {
        mSliderX = mMoveX;
        if (mSliderX > 0) {
            mSliderX = 0;
        } else if (mSliderX < menuBoxRef.current.clientWidth - menuRef.current.scrollWidth) {
            mSliderX = menuBoxRef.current.clientWidth - menuRef.current.scrollWidth;
        }

        menuRef.current.style.transform = 'translateX(' + mSliderX + 'px)';
        menuRef.current.style.transitionDuration = ' 1000ms';

        mIsSlide = false;
    };

    const menuSliderResize = () => {
        if (mSliderX > 0) {
            mSliderX = 0;
        } else if (mSliderX < menuBoxRef.current.clientWidth - menuRef.current.scrollWidth) {
            mSliderX = menuBoxRef.current.clientWidth - menuRef.current.scrollWidth;
        }
        menuRef.current.style.transform = 'translateX(' + mSliderX + 'px)';
        menuRef.current.style.transitionDuration = ' 1000ms';
    };

    useEffect(() => {
        if (areas) {
            let menuRefValue = menuBoxRef.current;
            menuRefValue.addEventListener('mousedown', menuSliderStart);
            window.addEventListener('mousemove', menuSliderMove);
            window.addEventListener('mouseup', menuSliderEnd);
            window.addEventListener('resize', menuSliderResize);

            return () => {
                menuRefValue.removeEventListener('mousedown', menuSliderStart);
                window.removeEventListener('mousemove', menuSliderMove);
                window.removeEventListener('mouseup', menuSliderEnd);
                window.removeEventListener('resize', menuSliderResize);
            };
        }
    });

    // ---------- 여행지 슬라이더 ----------

    const listRef = useRef();
    const listBoxRef = useRef();

    let lIsSlide = false;
    let lStartX = 0;
    let lCurrentX = 0;
    let lMoveX = 0;
    let lSliderX = 0;
    const TOTAL_SLIDE = 4;

    const scrollBoxRef = useRef();
    const scrollRef = useRef();
    let scrollMoveX = 0;

    const listSliderStart = (e) => {
        lStartX = e.clientX;
        lIsSlide = true;
    };

    const listSliderMove = (e) => {
        if (lIsSlide) {
            lCurrentX = e.clientX;
            lMoveX = lSliderX + lCurrentX - lStartX;

            listRef.current.style.transform = 'translateX(' + lMoveX + 'px)';
            listRef.current.style.transitionDuration = '0ms';

            scrollMoveX = -((lMoveX / -(listBoxRef.current.clientWidth - listRef.current.clientWidth)) * 100);

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
    };

    const listSliderEnd = () => {
        let itemSize = listRef.current.scrollWidth / TOTAL_SLIDE;
        lSliderX = Math.round(lMoveX / itemSize) * itemSize;

        if (lSliderX > 0) {
            lSliderX = 0;
        } else if (lSliderX < listBoxRef.current.clientWidth - listRef.current.scrollWidth) {
            lSliderX = listBoxRef.current.clientWidth - listRef.current.scrollWidth;
        }

        listRef.current.style.transform = 'translateX(' + lSliderX + 'px)';
        listRef.current.style.transitionDuration = ' 1000ms';

        scrollBoxRef.current.style.opacity = 0;
        scrollBoxRef.current.style.transitionDuration = '2000ms';
        lIsSlide = false;
    };

    const listSliderResize = () => {
        if (lSliderX > 0) {
            lSliderX = 0;
        } else if (lSliderX < listBoxRef.current.clientWidth - listRef.current.scrollWidth) {
            lSliderX = listBoxRef.current.clientWidth - listRef.current.scrollWidth;
        }

        listRef.current.style.transform = 'translateX(' + lSliderX + 'px)';
        listRef.current.style.transitionDuration = '1000ms';
    };

    useEffect(() => {
        if (spots) {
            let listRefValue = listRef.current;
            listRefValue.addEventListener('mousedown', listSliderStart);
            window.addEventListener('mousemove', listSliderMove);
            window.addEventListener('mouseup', listSliderEnd);
            window.addEventListener('resize', listSliderResize);

            return () => {
                listRefValue.removeEventListener('mousedown', listSliderStart);
                window.removeEventListener('mousemove', listSliderMove);
                window.removeEventListener('mouseup', listSliderEnd);
                window.removeEventListener('resize', listSliderResize);
            };
        }
    });

    if (spotError) {
        return <SpotListBlock>에러가 발생했습니다.</SpotListBlock>;
    }
    const { areaNum } = currentInfo;
    return (
        <SpotListBlock>
            <Container>
                <MenuTitle>추천 여행지</MenuTitle>
                <HiddenBox ref={menuBoxRef}>
                    {areas && (
                        <Menu ref={menuRef}>
                            {areas.map((area) => (
                                <li key={area.code} onClick={(e) => onFirstSpotsPage(e, area.code)} aria-current={areaNum === area.code ? 'page' : null}>
                                    {area.name}
                                </li>
                            ))}
                        </Menu>
                    )}
                </HiddenBox>
                {spots && (
                    <>
                        <HiddenBox ref={listBoxRef}>
                            <List ref={listRef}>
                                {spots.list.map((spot) => (
                                    <SpotItem spot={spot} key={spot.info.contentid} onChangeErrorImg={onChangeErrorImg} onOpenDetail={onOpenDetail} />
                                ))}
                            </List>
                        </HiddenBox>
                        <ScrollBox ref={scrollBoxRef}>
                            <Scroll ref={scrollRef} />
                        </ScrollBox>
                    </>
                )}
                {detail && <SpotDetailModal detail={detail} onChangeErrorImg={onChangeErrorImg} onUnloadDetailSpot={onUnloadDetailSpot} onToggleLikeSpot={onToggleLikeSpot} />}
            </Container>
        </SpotListBlock>
    );
};

export default SpotList;
