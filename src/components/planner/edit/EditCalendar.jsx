import { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { DragFunction } from '../../../lib/utils/itemDrag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faCalendarPlus } from '@fortawesome/free-regular-svg-icons';

const FlexDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 1rem;
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    padding: 0.5rem;
    width: 4rem;
    height: 29rem;
    @media all and (max-width: 480px) {
        height: 18.5rem;
    }
`;

const EditCalendarBlock = styled.div`
    width: 3rem;
    height: 100%;
    border-radius: 1rem;
    z-index: 1;
    position: relative;
    padding: 0.5rem;
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const ItemBox = styled.div`
    box-sizing: border-box;
    width: 3rem;
    height: 3rem;
    position: relative;
    border-radius: 1rem;
    cursor: pointer;
    border: none;
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    margin-bottom: 0.5rem;
    z-index: 1;
    &:hover {
        box-shadow: 0px 1px 6px ${(props) => props.theme.shadowColor};
    }
`;

const CloneItem = styled.div`
    width: 3rem;
    height: 3rem;
    margin-bottom: 0.5rem;
    position: relative;
    ${(props) =>
        props.cloneElStyle &&
        css`
            top: ${props.cloneElStyle}px;
        `}
`;

const Calendar = styled.div`
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 3rem;
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    border-radius: 1rem;
    font-size: 0.7rem;
    font-weight: bold;
    letter-spacing: 1px;
    &[aria-current] {
        color: ${(props) => props.theme.primaryColor};
        background-color: ${(props) => props.theme.clickedButtonBackgroundColor};
    }
    &:hover {
        background-color: ${(props) => props.theme.hoverBackgroundColor};
    }
`;

const AddCal = styled(ItemBox)`
    border-radius: 2rem;
    padding: 0.3rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    width: auto;
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    &:hover {
        box-shadow: 0px 1px 6px ${(props) => props.theme.shadowColor};
        transition: transform 0.3s ease;
        transform: scale(1.05);
        background-color: ${(props) => props.theme.hoverBackgroundColor};
    }
`;

const CalIcon = styled(FontAwesomeIcon)`
    color: ${(props) => props.theme.secondaryColor};
    font-size: 1.7rem;
    border-radius: 1rem;
    padding: 0.4rem;
    &:hover {
        color: ${(props) => props.theme.hoverColor};
    }
`;

const DeleteButton = styled.div`
    position: absolute;
    top: -2px;
    left: 35px;s
    border-radius: 2rem;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    font-size: 1rem;
    background-color: ${(props) => props.theme.primaryButtonBackgroundColor};
    border-radius: 2rem;
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    color: ${(props) => props.theme.tertiaryColor};
`;

const EditCalendar = ({
    planner,
    plannerData,
    onCreatePlan,
    onDeletePlan,
    onChangeCurPlanId,
    onAddDate,
    onSubDate,
    onUpdatePlan,
    setCurPlan,
    cloneElement,
    cloneElStyle,
    onCloneElement,
    onDeleteElement,
    onChangeStyle,
    setUpdatePlans,
    onClickDateSchedule,
}) => {
    const { planDateEnd, plans: items } = { ...planner };
    const containerRef = useRef();
    const scrollTop = useRef();

    const letsFormat = (d) => {
        const date = new Date(d);
        return ('0' + (date.getMonth() + 1)).slice(-2) + '/' + ('0' + date.getDate()).slice(-2);
    };

    const onClickDeletePlan = (planId) => {
        onDeletePlan(planId);
        onSubDate(planDateEnd);
    };

    const handleScroll = () => {
        scrollTop.current = containerRef.current.scrollTop;
    };

    // 컨테이너의 스크롤위치 구하기
    useEffect(() => {
        const container = containerRef.current;
        container.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    });

    const onUpdateSortIndex = (index) => {
        onUpdatePlan(index);
        setUpdatePlans({ index: index });
    };

    const onChangeCurItem = (plan) => {
        setCurPlan(plan);
    };

    const dragFunction = new DragFunction();

    return (
        <FlexDiv>
            <AddCal
                onClick={() => {
                    onAddDate(planDateEnd);
                    onCreatePlan();
                }}
            >
                <CalIcon icon={faCalendarPlus} />
            </AddCal>
            <EditCalendarBlock
                ref={containerRef}
                onDrop={(e) => dragFunction.onDrop({ e, items, onUpdateSortIndex })}
                onDragOver={(e) => dragFunction.onDragOver(e)}
            >
                {items &&
                    items.map((item, i) => (
                        <ItemBox
                            key={item.planId}
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
                            onDragEnd={() => {
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
                            <Calendar
                                aria-current={item.planId === plannerData.planId ? 'date' : null}
                                onClick={() => {
                                    onChangeCurPlanId(item.planId);
                                    onClickDateSchedule();
                                }}
                            >
                                {letsFormat(item.planDate)}
                            </Calendar>
                            <DeleteButton
                                onClick={() => {
                                    onClickDeletePlan(item.planId);
                                }}
                            >
                                <StyledFontAwesomeIcon icon={faCircleXmark} />
                            </DeleteButton>
                        </ItemBox>
                    ))}
                {cloneElement && <CloneItem cloneElStyle={cloneElStyle} onDragEnter={dragFunction.onCloneEnter} />}
            </EditCalendarBlock>
        </FlexDiv>
    );
};

export default EditCalendar;
