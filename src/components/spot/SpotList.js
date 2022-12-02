import styled from 'styled-components';
import SpotItem from './SpotItem';
import defaultImg from '../../lib/images/defaultImg.jpg';
import SpotDetailModal from './SpotDetailModal';
import { useEffect, useRef } from 'react';
import * as sliderFunction from '../../lib/utils/sliderFunction';
import { useState } from 'react';

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
    padding: 20px 20px 20px 0;
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

const ListScrollBox = styled.div`
    width: calc(100% - 40px);
    height: 4px;
    border-radius: 10px;
    /* margin: 0 auto; */
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: lightgray;
    z-index: 1;
    overflow: hidden;
    @media all and (min-width: 768px) {
        display: none;
    }
`;

const ListScroll = styled.div`
    background-color: gray;
    width: 50%;
    height: 100%;
    z-index: 0;
`;

const SpotList = ({ areas, spots, spotError, detail, currentInfo, onFirstSpotsPage, onUnloadDetailSpot, onToggleLikeSpot, onOpenDetail }) => {
    // 대체 이미지 넣기
    const onChangeErrorImg = (e) => {
        e.target.src = defaultImg;
    };

    const menuRef = useRef();
    const menuBoxRef = useRef();
    const listRef = useRef();
    const listBoxRef = useRef();

    // let sliderStartX = 0; // mousedown: 마우스 다운된 좌표
    // let currentPosition = 0; // 이전에 이동한 좌표
    // let listSliderStatus = false; // mouseMove 실행 조건
    // let sliderMoving = 0; // mousemove: 이전 좌표 + 현재 마우스가 이동한 좌표

    // ---------- 메뉴 슬라이더 ----------
    let menuSliderStartX = 0;
    let menuCurPos = 0;
    let menuSliderStatus = false;
    let menuSliderMoving = 0;

    // 슬라이드 마우스 다운
    const menuSliderStart = (e) => {
        menuSliderStartX = e.clientX;
        menuSliderStatus = true;
    };

    // 슬라이드 마우스 이동
    const menuSliderMove = (e) => {
        if (menuSliderStatus) {
            menuSliderMoving = menuCurPos + e.clientX - menuSliderStartX;
            menuRef.current.style.transform = 'translateX(' + menuSliderMoving + 'px)';
            menuRef.current.style.transitionDuration = '0s';
        }
    };

    // 슬라이드 마우스 업
    const menuSliderEnd = (e) => {
        let itemBoxSize = menuBoxRef.current.getBoundingClientRect().width;
        let sliderEndX = menuSliderMoving;

        if (sliderEndX > 0) {
            sliderEndX = 0;
        } else if (sliderEndX < itemBoxSize - menuRef.current.scrollWidth) {
            sliderEndX = itemBoxSize - menuRef.current.scrollWidth;
        }

        menuRef.current.style.transform = ' translateX(' + sliderEndX + 'px)';
        menuRef.current.style.transitionDuration = ' 1s';
        menuCurPos = sliderEndX;
        menuSliderStatus = false;
    };

    useEffect(() => {
        if (areas) {
            let curMenuRef = menuRef.current;

            curMenuRef.addEventListener('mousedown', menuSliderStart);
            window.addEventListener('mousemove', menuSliderMove);
            window.addEventListener('mouseup', menuSliderEnd);

            return () => {
                curMenuRef.removeEventListener('mousedown', menuSliderStart);
                window.removeEventListener('mousemove', menuSliderMove);
                window.removeEventListener('mouseup', menuSliderEnd);
            };
        }
    });

    // ---------- 여행지 슬라이더 ----------
    let listSliderStartX = 0;
    let listCurPos = 0;
    let listSliderStatus = false;
    let listSliderMoving = 0;
    let listSliderEndX = 0;

    // 슬라이드 마우스 다운
    const listSliderStart = (e) => {
        listSliderStartX = e.clientX;
        listSliderStatus = true;
    };

    // 슬라이드 마우스 이동
    const listSliderMove = (e) => {
        if (listSliderStatus) {
            listSliderMoving = listCurPos + e.clientX - listSliderStartX;

            listRef.current.style.transform = 'translateX(' + listSliderMoving + 'px)';
            listRef.current.style.transitionDuration = '0s';
        }
    };

    // 슬라이드 마우스 업
    const listSliderEnd = () => {
        let itemBoxSize = listBoxRef.current.getBoundingClientRect().width;
        listSliderEndX = listSliderMoving;

        if (listSliderEndX > 0) {
            listSliderEndX = 0;
        } else if (listSliderEndX < itemBoxSize - listRef.current.scrollWidth) {
            listSliderEndX = itemBoxSize - listRef.current.scrollWidth;
        }

        listRef.current.style.transform = 'translateX(' + listSliderEndX + 'px)';
        listRef.current.style.transitionDuration = ' 1s';
        listCurPos = listSliderEndX;
        listSliderStatus = false;
    };

    useEffect(() => {
        if (spots) {
            let curListRef = listRef.current;

            curListRef.addEventListener('mousedown', listSliderStart);
            window.addEventListener('mousemove', listSliderMove);
            window.addEventListener('mouseup', listSliderEnd);

            return () => {
                curListRef.removeEventListener('mousedown', listSliderStart);
                window.removeEventListener('mousemove', listSliderMove);
                window.removeEventListener('mouseup', listSliderEnd);
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
                                <li
                                    key={area.code}
                                    onClick={(e) => onFirstSpotsPage(e, area.code)}
                                    aria-current={areaNum === area.code ? 'page' : null}
                                >
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
                        <ListScrollBox ref={scrollBoxRef}>
                            <ListScroll ref={scrollRef} />
                        </ListScrollBox>
                    </>
                )}
                {detail && <SpotDetailModal detail={detail} onChangeErrorImg={onChangeErrorImg} onUnloadDetailSpot={onUnloadDetailSpot} onToggleLikeSpot={onToggleLikeSpot} />}
            </Container>
        </SpotListBlock>
    );
};

export default SpotList;
