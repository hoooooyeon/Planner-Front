import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { DragFunction } from '../../../lib/utils/CommonFunction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faCalendarPlus } from '@fortawesome/free-regular-svg-icons';

const FlexDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 1rem;
    background-color: var(--md-sys-color-surface);
    box-shadow: 0px 1px 3px -2px var(--md-sys-color-shadow);
    padding: 0.5rem;
    width: 4rem;
    height: 29.5rem;
`;

const EditCalendarBlock = styled.div`
    width: 3rem;
    height: 100%;
    border-radius: 1rem;
    z-index: 1;
    position: relative;
    padding: 0.5rem;
    box-shadow: 0px 1px 3px -2px var(--md-sys-color-shadow);
    background-color: var(--md-sys-color-surface);
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
    box-shadow: 0px 1px 3px -2px var(--md-sys-color-shadow);
    margin-bottom: 0.5rem;
    z-index: 1;
    &:hover {
        box-shadow: 0px 1px 6px -3px var(--md-sys-color-shadow);
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
    background-color: var(--md-sys-color-surface);
    border-radius: 1rem;
    font-size: 0.7rem;
    font-weight: bold;
    letter-spacing: 1px;
    &[aria-current] {
        color: var(--md-sys-color-on-primary);
        background-color: var(--md-sys-color-primary);
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
    box-shadow: 0px 1px 3px -2px var(--md-sys-color-shadow);
    background-color: var(--md-sys-color-primary-container);
    &:hover {
        box-shadow: 0px 1px 6px -3px var(--md-sys-color-shadow);
        transition: transform 0.3s ease;
        transform: scale(1.05);
    }
`;

const CalIcon = styled(FontAwesomeIcon)`
    color: var(--md-sys-color-on-primary-container);
    font-size: 1.7rem;
    border-radius: 1rem;
    padding: 0.4rem;
`;

const DeleteButton = styled.div`
    position: absolute;
    top: -2px;
    left: 35px;s
    border-radius: 2rem;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    font-size: 1rem;
    background-color: var(--md-sys-color-surface);
    border-radius: 2rem;
    box-shadow: 0px 1px 3px -2px var(--md-sys-color-shadow);
    color: var(--md-sys-color-surface-variant);
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
