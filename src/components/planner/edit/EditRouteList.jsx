import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { DragFunction } from '../../../lib/utils/CommonFunction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus } from '@fortawesome/free-solid-svg-icons'; // 버스
import { faTaxi } from '@fortawesome/free-solid-svg-icons'; // 택시
import { faPlane } from '@fortawesome/free-solid-svg-icons'; // 비행기
import { faPersonWalking } from '@fortawesome/free-solid-svg-icons'; // 도보
import { faBicycle } from '@fortawesome/free-solid-svg-icons'; // 자전거 or 오토바이
import { faTrainSubway } from '@fortawesome/free-solid-svg-icons'; // 지하철 or 기차
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { handleErrorImg } from '../../../lib/utils/CommonFunction';
import errorImg from '../../../lib/images/spotErrorImg.jpg';
import Empty from '../../common/Empty';

const EditRouteListBlock = styled.div`
    margin-left: 0.2rem;
    width: 284px;
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
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    box-shadow: 0px 1px 6px ${(props) => props.theme.shadowColor};
    border-radius: 1rem;
    cursor: pointer;
    padding: 2rem 1.4rem 0.5rem 1.4rem;
    z-index: 100;
    margin-bottom: 1rem;
    &[aria-current] {
        display: flex;
    }
`;

const CloneItem = styled.div`
    width: 224px;
    height: 72px;
    margin-bottom: 1rem;
    padding: 2rem 1.4rem 0.5rem 1.4rem;
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
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    background-color: ${(props) => props.theme.primaryBackgroundColor};
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
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    background-color: ${(props) => props.theme.secondaryBackgroundColor};
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
    white-space: nowrap;
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    background-color: ${(props) => props.theme.primaryBackgroundColor};
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
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    z-index: 99;
`;

const Img = styled.img`
    border-radius: 0.5rem;
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    width: 3.5rem;
    height: 3.5rem;
    font-size: 0.7rem;
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
    color: ${(props) => props.theme.tertiaryColor};
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
    color: ${(props) => props.theme.tertiaryColor};
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    border-radius: 2rem;
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
`;

const MoveIcon = styled(FontAwesomeIcon)`
    z-index: 100;
    position: absolute;
    top: 49px;
    left: 9px;
    color: ${(props) => props.theme.tertiaryColor};
`;

const EditRouteList = ({
    planner,
    plannerData,
    onDeleteLocation,
    onUpdateTrans,
    onUpdateLocation,
    setCurLocation,
    cloneElement,
    cloneElStyle,
    onCloneElement,
    onDeleteElement,
    onChangeStyle,
    setUpdatePlans,
}) => {
    const transIconList = [faPlane, faTrainSubway, faBus, faTaxi, faBicycle, faPersonWalking];
    const transList = [
        { label: '비행기', value: 1 },
        { label: '기차', value: 2 },
        { label: '버스', value: 3 },
        { label: '택시', value: 4 },
        { label: '오토바이', value: 5 },
        { label: '도보', value: 6 },
    ];
    const { plans } = { ...planner };
    const [dropDownItemId, setDropDownItemId] = useState(null);
    const [hoveredNameId, setHoveredNameId] = useState(null);
    const containerRef = useRef();
    const scrollTop = useRef();

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

    const handleScroll = () => {
        scrollTop.current = containerRef.current.scrollTop;
    };

    // 컨테이너 스크롤높이 구하기
    useEffect(() => {
        const container = containerRef.current;
        container.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    });

    const onUpdateSortIndex = (index) => {
        onUpdateLocation(index);
        setUpdatePlans(index);
    };

    const onChangeCurItem = (item) => {
        setCurLocation(item);
    };

    const dragFunction = new DragFunction();

    return (
        <EditRouteListBlock ref={containerRef}>
            {plans.length > 0 ? (
                plans.map((p) => {
                    const items = p.planLocations;
                    return (
                        <RouteList
                            onDrop={(e) => dragFunction.onDrop({ e, items, onUpdateSortIndex })}
                            onDragOver={(e) => dragFunction.onDragOver(e)}
                            aria-current={p.planId === plannerData.planId ? 'cur' : null}
                            key={p.planId}
                        >
                            {items.length > 0 ? (
                                items.map((item, i) => {
                                    const {
                                        locationId,
                                        locationName,
                                        locationAddr,
                                        locationImage,
                                        locationTransportation,
                                    } = item;
                                    return (
                                        <RouteItem
                                            aria-current={p.planId === plannerData.planId ? 'cur' : null}
                                            key={i}
                                            draggable
                                            onDragStart={(e) => {
                                                dragFunction.onDragStart({
                                                    e,
                                                    item,
                                                    items,
                                                    scrollTop,
                                                    onChangeCurItem,
                                                    onCloneElement,
                                                    onChangeStyle,
                                                });
                                            }}
                                            onDrag={(e) => {
                                                dragFunction.onDragMove({ e, containerRef, scrollTop });
                                            }}
                                            onDragEnd={(e) => {
                                                dragFunction.onDragEnd({ onDeleteElement });
                                            }}
                                            onDragEnter={(e) => {
                                                dragFunction.onDragEnter({
                                                    e,
                                                    item,
                                                    items,
                                                });
                                            }}
                                        >
                                            <MoveIcon icon={faEllipsisVertical} />
                                            <TransItem onClick={() => handleOpen(setDropDownItemId, i)}>
                                                <FontAwesomeIcon icon={transIconList[locationTransportation - 1]} />
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
                                                                {hoveredNameId === i && (
                                                                    <TransName>{t.label}</TransName>
                                                                )}
                                                            </li>
                                                        ))}
                                                    </DropDownMenu>
                                                </DropDown>
                                            )}
                                            <SpotItem>
                                                <Img
                                                    src={locationImage}
                                                    alt={locationId}
                                                    onError={(e) => {
                                                        handleErrorImg({ e, errorImg });
                                                    }}
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
                                })
                            ) : (
                                <Empty text="여행지" />
                            )}
                            {cloneElement && (
                                <CloneItem cloneElStyle={cloneElStyle} onDragEnter={dragFunction.onCloneEnter} />
                            )}
                        </RouteList>
                    );
                })
            ) : (
                <Empty text="일정" />
            )}
        </EditRouteListBlock>
    );
};

export default EditRouteList;
