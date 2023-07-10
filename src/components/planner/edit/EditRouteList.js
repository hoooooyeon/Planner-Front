import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import * as common from '../../../lib/utils/CommonFunction';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus } from '@fortawesome/free-solid-svg-icons'; // 버스
import { faTaxi } from '@fortawesome/free-solid-svg-icons'; // 택시
import { faPlane } from '@fortawesome/free-solid-svg-icons'; // 비행기
import { faPersonWalking } from '@fortawesome/free-solid-svg-icons'; // 도보
import { faBicycle } from '@fortawesome/free-solid-svg-icons'; // 자전거 or 오토바이
import { faTrainSubway } from '@fortawesome/free-solid-svg-icons'; // 지하철 or 기차
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { cloneElement } from 'react';

const EditRouteListBlock = styled.div`
    margin-left: 0.2rem;
    height: 30.5rem;
    overflow: auto;
    border-radius: 1rem;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const RouteList = styled.div`
    display: none;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding: 0 0.5rem;
    &[aria-current] {
        display: flex;
    }
`;

const RouteItem = styled.div`
    display: none;
    flex-direction: column;
    align-items: center;
    position: relative;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 1rem;
    cursor: pointer;
    margin-bottom: 1rem;
    padding: 2rem 1.4rem 0.5rem 1.4rem;
    z-index: 100;
    &[aria-current] {
        display: flex;
    }
    &:hover {
        background-color: rgb(240, 240, 240);
    }
`;

const CloneItem = styled.div`
    width: 224px;
    height: 72px;
    margin-bottom: 1rem;
    padding: 2rem 1.4rem 0.5rem 1.4rem;
    background: red;
    position: relative;
    ${(props) =>
        props.cloneElStyle &&
        css`
            top: ${props.cloneElStyle}px;
        `}
`;

const TransItem = styled.div`
    position: absolute;
    top: 12px;
    border-radius: 1rem;
    width: 2.5rem;
    height: 2.5rem;
    z-index: 100;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        transition: transform 0.3s ease;
        transform: scale(1.05);
    }
`;

const DropDown = styled.div`
    position: relative;
`;

const DropDownMenu = styled.ul`
    display: flex;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -87%);
    z-index: 103;
    overflow: hidden;
    border-radius: 1rem;
    padding: 0.7rem 0.5rem;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
    background-color: white;
    align-items: center;
    justify-content: space-around;
    @keyframes fade-in {
        0% {
            width: 3rem;
        }
        100% {
            width: 8rem;
        }
    }
    animation: fade-in 0.5s ease-in-out;

    li {
        display: flex;
        flex-direction: column;
        align-items: center;
        &:hover {
            transition: transform 0.3s ease;
            transform: translate(0, -5px);
        }
    }
`;
const TransIcon = styled(FontAwesomeIcon)`
    border-radius: 2rem;
    padding: 0.3rem;
`;

const TransName = styled.div`
    font-size: 0.1rem;
    padding: 0.2rem 0.4rem;
    font-weight: bold;
    color: gray;
    white-space: nowrap;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    background-color: white;
    border-radius: 1rem;
    position: absolute;
    top: 20px;
`;

const SpotItem = styled.div`
    border-radius: 1rem;
    display: flex;
    align-items: center;

    padding: 0.5rem;
    width: 13rem;
    height: 3.5rem;
    background-color: white;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    z-index: 99;
`;

const Img = styled.img`
    border-radius: 0.5rem;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    width: 3.5rem;
    height: 3.5rem;
`;

const TextInfo = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-left: 0.5rem;
`;

const Name = styled.div`
    width: 8rem;
    height: 1rem;
    overflow: hidden;
    white-space: wrap;
    font-size: 0.8rem;
    margin-bottom: 0.3rem;
    text-overflow: ellipsis;
`;

const Address = styled.div`
    width: 8rem;
    height: 1rem;
    overflow: hidden;
    white-space: wrap;
    font-size: 0.1rem;
    color: lightgray;
    text-overflow: ellipsis;
`;

const DeleteButton = styled.div`
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    position: absolute;
    top: 28px;
    left: 235px;
    z-index: 100;
`;

const DeleteIcon = styled(FontAwesomeIcon)`
    font-size: 1.2rem;
    background-color: white;
    border-radius: 2rem;
    color: rgb(150, 150, 150);
`;

const MoveIcon = styled(FontAwesomeIcon)`
    z-index: 100;
    position: absolute;
    top: 49px;
    left: 9px;
    color: lightgray;
`;
const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    /* margin-right: 0.5rem; */
`;
const EditRouteList = ({ planner, plan, plannerData, transList, onUpdatePlan, onDeleteLocation, onChangeLocation, onUpdateTrans, onUpdateLocation, sortIndex, setCurLocation }) => {
    const { plans } = { ...planner };

    const containerRef = useRef();
    const itemsRef = useRef([]);

    const itemsArr = useRef();
    const dragItem = useRef();
    const overItem = useRef();
    const dragItemIndex = useRef();
    const overItemIndex = useRef();

    const dragTarget = useRef();
    const overTarget = useRef();

    let posY = useRef(0);

    const [overTargetArr, setOverTargetArr] = useState([]);
    const [isDrag, setIsDrag] = useState(false);

    const transIconList = [faPlane, faTrainSubway, faBus, faTaxi, faBicycle, faPersonWalking];

    const [dropDownItemId, setDropDownItemId] = useState(null);
    const [hoveredNameId, setHoveredNameId] = useState(null);

    const handleOpen = (setItemId, id) => {
        setItemId(id);
    };

    const onCloseDropDown = () => {
        if (dropDownItemId !== null) {
            setDropDownItemId(null);
        }
    };
    const onCloseName = () => {
        setHoveredNameId(null);
    };

    useEffect(() => {
        window.addEventListener('click', onCloseDropDown);
        return () => {
            window.removeEventListener('click', onCloseDropDown);
        };
    });

    const scrollTop = useRef();
    const initialScrollTop = useRef(0);

    const handleScroll = () => {
        scrollTop.current = containerRef.current.scrollTop;
    };

    useEffect(() => {
        const container = containerRef.current;
        container.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    });

    const itemHeight = useRef();
    // useEffect(() => {
    //     if (itemsRef.current) {
    //         itemsRef.current.forEach((eRow) => {
    //             if (eRow) {
    //                 eRow.forEach((e) => {
    //                     if (e) {
    //                         const computedStyle = getComputedStyle(e);
    //                         const display = computedStyle.display;
    //                         const marginBottom = parseInt(computedStyle.marginBottom);
    //                         if (display === 'flex') {
    //                             itemHeight.current = e.getBoundingClientRect().height + marginBottom;
    //                         }
    //                     }
    //                 });
    //             }
    //         });
    //     }
    // }, [itemsRef.current]);

    const onUpdateSortIndex = () => {
        onUpdateLocation();
    };

    const onChangeCurItem = (item) => {
        setCurLocation(item);
    };

    const dataRef = useRef();

    const [cloneElement, setCloneElement] = useState(null);
    const [cloneElStyle, setCloneElStyle] = useState(0);

    const cloneRef = useRef();
    const onCloneElement = () => {
        const element = <CloneItem ref={cloneRef} cloneElStyle={cloneElStyle} onDragEnter={(e) => console.log(e.target.getBoundingClientRect())} />;
        setCloneElement(element);
    };

    const onDeleteElement = () => {
        setCloneElement(null);
        setCloneElStyle(0);
    };

    const onChangeStyle = (top) => {
        setCloneElStyle(top);
    };

    if (!planner) {
        return <div>Loading...</div>;
    }

    return (
        <EditRouteListBlock ref={containerRef}>
            {plans &&
                plans.map((p, j) => {
                    const items = p.planLocations;
                    return (
                        <RouteList
                            onDrop={(e) => common.onDrop({ e, isDrag, itemsArr, dragItemIndex, overItemIndex, dragItem, sortIndex, items, onUpdateSortIndex })}
                            onDragOver={(e) => common.onDragOver(e)}
                            aria-current={p.planId === plannerData.planId ? 'cur' : null}
                            key={p.planId}
                        >
                            {items &&
                                items.map((item, i) => {
                                    const { locationId, locationName, locationAddr, locationImage, locationTransportation } = item;
                                    return (
                                        <RouteItem
                                            aria-current={p.planId === plannerData.planId ? 'cur' : null}
                                            // ref={(e) => {
                                            //     if (!itemsRef.current[j]) {
                                            //         itemsRef.current[j] = [];
                                            //     }
                                            //     itemsRef.current[j][i] = e;
                                            // }}
                                            key={i}
                                            draggable
                                            onDragStart={(e) => {
                                                common.onDragStart({
                                                    cloneRef,
                                                    dataRef,
                                                    e,
                                                    item,
                                                    setIsDrag,
                                                    dragTarget,
                                                    posY,
                                                    dragItem,
                                                    dragItemIndex,
                                                    itemsArr,
                                                    items,
                                                    scrollTop,
                                                    initialScrollTop,
                                                    onChangeCurItem,
                                                    onCloneElement,
                                                    itemHeight,
                                                    onChangeStyle,
                                                });
                                            }}
                                            onDrag={(e) => {
                                                common.onDragMove({ dataRef, e, isDrag, posY, containerRef, dragItemIndex, dragTarget, scrollTop, initialScrollTop, itemHeight });
                                            }}
                                            onDragEnd={(e) => {
                                                common.onDragEnd({ setIsDrag, overTargetArr, dragTarget, itemsArr, dragItem, dragItemIndex, overItem, overItemIndex, setOverTargetArr, onDeleteElement });
                                            }}
                                            onDragEnter={(e) => {
                                                common.onDragEnter({
                                                    e,
                                                    item,
                                                    isDrag,
                                                    overItem,
                                                    overItemIndex,
                                                    overTarget,
                                                    dragTarget,
                                                    overTargetArr,
                                                    setOverTargetArr,
                                                    dragItemIndex,
                                                    itemsArr,
                                                    items,
                                                    itemHeight,
                                                });
                                            }}
                                            onDragLeave={(e) => {
                                                common.onDragLeave(e);
                                            }}
                                        >
                                            <MoveIcon icon={faEllipsisVertical} />
                                            <TransItem onClick={() => handleOpen(setDropDownItemId, i)}>
                                                <StyledFontAwesomeIcon icon={transIconList[locationTransportation - 1]} />
                                            </TransItem>
                                            {dropDownItemId === i && (
                                                <DropDown>
                                                    <DropDownMenu>
                                                        {transList.map((t, i) => (
                                                            <li
                                                                onClick={() => {
                                                                    onUpdateTrans(t.value, item);
                                                                }}
                                                                onMouseEnter={() => handleOpen(setHoveredNameId, i)}
                                                                onMouseLeave={onCloseName}
                                                            >
                                                                <TransIcon icon={transIconList[i]} />
                                                                {hoveredNameId === i && <TransName>{t.label}</TransName>}
                                                            </li>
                                                        ))}
                                                    </DropDownMenu>
                                                </DropDown>
                                            )}
                                            <SpotItem>
                                                <Img
                                                    src={locationImage}
                                                    alt={locationId}
                                                    // onError={onChangeErrorImg}
                                                />
                                                <TextInfo>
                                                    <Name>{locationName}</Name>
                                                    <Address>{locationAddr.split(' ')[0]}</Address>
                                                </TextInfo>
                                            </SpotItem>
                                            <DeleteButton
                                                onClick={() => {
                                                    onDeleteLocation(locationId);
                                                }}
                                            >
                                                <DeleteIcon icon={faCircleXmark} />
                                            </DeleteButton>
                                        </RouteItem>
                                    );
                                })}
                            {cloneElement}
                        </RouteList>
                    );
                })}
        </EditRouteListBlock>
    );
};

export default EditRouteList;
