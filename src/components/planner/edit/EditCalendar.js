import { useEffect } from 'react';
import { useRef, useState } from 'react';
import styled from 'styled-components';

const EditCalendarBlock = styled.div`
    z-index: 1;
    position: relative;
    left: 4px;
`;

const ItemBox = styled.div`
    position: relative;
`;

const Calendar = styled.div`
    background-color: #f1eee0;
    border: 0.2rem solid #cdd9ac;
    border-radius: 50px;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    margin-top: 16px;
    position: relative;
    cursor: pointer;
    & + & {
        margin: 8px 0;
    }
    &:hover {
        cursor: pointer;
        border-width: 0.3rem;
        margin-right: -0.6rem;
    }
    &[aria-current] {
        background-color: #cdd9ac;
    }
`;

const RouteLine = styled.div`
    background-color: #cdd9ac;
    width: 0.2rem;
    height: 73px;
    position: absolute;
    left: 24px;
    top: -23px;
    z-index: -1;
`;

const AddCal = styled.div``;

const DeleteButton = styled.div`
    position: absolute;
    top: -10px;
    left: 50px;
`;

const EditCalendar = ({ planner, plan, currentInfo, onCreatePlan, onDeletePlan, onLoadPlan, onChangeCurPlanId, onAddDate, onSubDate, onUpdateSubPlan, onChangePlans }) => {
    const { planDateEnd, plans } = { ...planner };

    const letsFormat = (d) => {
        const date = new Date(d);
        return ('0' + (date.getMonth() + 1)).slice(-2) + '/' + ('0' + date.getDate()).slice(-2);
    };

    const onClickDeletePlan = async (planId) => {
        // const onDelete = () => {
        //     onDeletePlan(planId);
        // };
        // const onChange = () => {
        //     onChangeCurPlanId(plans[0].planId || null);
        // };
        // const onSub = () => {
        //     onSubDate(planDateEnd);
        // };
        // const onUpdate = () => {
        //     onUpdateSubPlan();
        // };
        onDeletePlan(planId);
        // onChangeCurPlanId(plans[0].planId || null);
        onSubDate(planDateEnd);

        // await onDelete();
        // await onChange();
        // await onSub();
        // await onUpdate();
    };

    const containerRef = useRef();
    const itemRef = useRef();

    const plansArr = useRef();
    const item = useRef();
    const overItem = useRef();
    const itemIndex = useRef();
    const overItemIndex = useRef();

    let index = 0;

    const [originPos, setOriginPos] = useState();
    const [curPos, setCurPos] = useState();

    const getElementIndex = (p) => {
        plansArr.current = plans;
        return plansArr.current.findIndex((plan) => plan === p);
    };

    const switchItem = () => {
        plansArr.current.splice(itemIndex.current, 1);
        plansArr.current.splice(overItemIndex.current, 0, item.current);
        return plansArr.current;
    };

    const getIndex = () => {
        let prevIndex;
        let nextIndex;
        let curItemIndex = getElementIndex(item.current);

        if (overItemIndex.current === 0) {
            index = 500;
        } else if (overItemIndex.current === plansArr.current.length - 1) {
            index = 2000;
        } else if (itemIndex) {
            prevIndex = plansArr.current[curItemIndex - 1];
            nextIndex = plansArr.current[curItemIndex + 1];
            index = 1000;
        }
    };

    const onDragStart = (plan) => {
        itemRef.current.style.opacity = '0.4';
        item.current = plan;
        itemIndex.current = getElementIndex(plan);
    };
    const onDragEnter = (plan) => {
        overItem.current = plan;
        console.log(plan);
        overItemIndex.current = getElementIndex(plan);
    };

    const onDragEnd = () => {
        itemRef.current.style.opacity = '1';

        onChangePlans(switchItem());
        getIndex();

        plansArr.current = null;
        item.current = null;
        itemIndex.current = null;
        overItem.current = null;
        overItemIndex.current = null;
    };

    const itemMoveStart = () => {
        itemRef.current.style.backgroundColor = 'red';
        console.log(1);
    };

    // useEffect(() => {
    //     if (itemRef.current) {
    //         let item = itemRef.current;
    //         item.addEventListener('mousedown', itemMoveStart);
    //         return () => {
    //             item.removeEventListener('mousedown', itemMoveStart);
    //         };
    //     }
    // });

    if (!planner) {
        return <div>Loading...</div>;
    }
    return (
        <EditCalendarBlock ref={containerRef}>
            <Calendar
                onClick={() => {
                    onAddDate(planDateEnd);
                    onCreatePlan();
                }}
            >
                <RouteLine />
                더하기
            </Calendar>
            <>
                {plans &&
                    plans.map((p, i) => (
                        <ItemBox key={p.planId}>
                            <Calendar
                                ref={itemRef}
                                aria-current={p.planId === currentInfo.planId ? 'date' : null}
                                draggable
                                onDragStart={() => {
                                    onDragStart(p);
                                }}
                                onDragEnd={onDragEnd}
                                onDragEnter={(e) => {
                                    onDragEnter(p);
                                }}
                                onClick={() => {
                                    // onLoadPlan(p);
                                    onChangeCurPlanId(p.planId);
                                }}
                            >
                                <RouteLine />
                                {letsFormat(p.planDate)}
                            </Calendar>
                            <DeleteButton
                                onClick={() => {
                                    onClickDeletePlan(p.planId);
                                    // onSubDate(planDateEnd);
                                    // onDeletePlan(p.planId);
                                    // onChangeCurPlanId(plans[0].planId || null);
                                }}
                            >
                                x
                            </DeleteButton>
                        </ItemBox>
                    ))}
            </>
        </EditCalendarBlock>
        /* {plans &&
                    plan &&
                    plans.map((p, i) => (
                        <Calendar
                            aria-current={p.planId === plan.planId ? 'date' : null}
                            onClick={() => {
                                onLoadPlan(p);
                            }}
                            key={p.planId}
                        >
                            <DeleteButton
                                onClick={() => {
                                    onDeletePlan(p.planId);
                                }}
                            >
                                x
                            </DeleteButton>
                            <RouteLine />
                            {letsFormat(p.planDate)}
                        </Calendar>
                    ))}
            </>
        </EditCalendarBlock> */
    );
};

export default EditCalendar;
