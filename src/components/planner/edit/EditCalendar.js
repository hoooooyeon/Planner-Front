import { useEffect } from 'react';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import * as common from '../../../lib/utils/CommonFunction';

const FlexDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

const EditCalendarBlock = styled.div`
    z-index: 1;
    position: relative;
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
    cursor: pointer;
    position: relative;
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
    height: 10px;
    margin: 0 auto;
`;

const DeleteButton = styled.div`
    position: absolute;
    top: -30px;
    left: 45px;
`;

const EditCalendar = ({ planner, plan, plannerData, onCreatePlan, onDeletePlan, onLoadPlan, onChangeCurPlanId, onAddDate, onSubDate, onUpdateSubPlan, onChangePlans }) => {
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

    const dragTarget = useRef();
    const overTarget = useRef();

    let index = 0;

    let posY = useRef(0);

    const [overTargetArr, setOverTargetArr] = useState([]);
    const [isDrag, setIsDrag] = useState(false);

    // // 바꿀 일정의 index 구하기
    // const getElementIndex = (p) => {
    //     plansArr.current = plans;
    //     return plansArr.current.findIndex((plan) => plan === p);
    // };

    // // 선택 일정과 바꿀 일정을 바꿈
    // const switchItem = () => {
    //     plansArr.current.splice(itemIndex.current, 1);
    //     plansArr.current.splice(overItemIndex.current, 0, item.current);
    //     return plansArr.current;
    // };

    // // db에서 순서를 세팅할 index를 구함.
    // const getIndex = () => {
    //     let prevIndex;
    //     let nextIndex;
    //     let curItemIndex = getElementIndex(item.current);

    //     if (overItemIndex.current === 0) {
    //         index = 500;
    //     } else if (overItemIndex.current === plansArr.current.length - 1) {
    //         index = 2000;
    //     } else if (itemIndex) {
    //         prevIndex = plansArr.current[curItemIndex - 1];
    //         nextIndex = plansArr.current[curItemIndex + 1];
    //         index = 1000;
    //     }
    // };

    // const onDragStart = (e, plan) => {
    //     setIsDrag(true);
    //     // 순서 이동 모션

    //     // 드래그시 반투명 이미지 제거
    //     let img = new Image();
    //     e.dataTransfer.setDragImage(img, 10, 10);

    //     // 드래그되는 요소
    //     dragTarget.current = e.currentTarget;
    //     dragTarget.current.style.zIndex = '100';

    //     // 마우스 포인터 좌표
    //     posY.current = e.clientY;

    //     // 순서 이동 기능
    //     item.current = plan;
    //     itemIndex.current = getElementIndex(plan);
    // };

    // const onDragMove = (e) => {
    //     if (isDrag) {
    //         // 마우스 포인터가 이동한 거리
    //         const diffY = e.clientY - posY.current;

    //         // 드래그가 가능한 컨테이너 크기
    //         const containerHeight = containerRef.current.getBoundingClientRect().height;
    //         const itemHeight = itemRef.current.getBoundingClientRect().height;

    //         // 드래그되는 모션
    //         e.currentTarget.style.top = `${Math.min(Math.max(-itemHeight * itemIndex.current, diffY), containerHeight - itemHeight * (itemIndex.current + 2))}px`;
    //         // e.currentTarget.style.top = `${Math.min(Math.max(-itemHeight * itemIndex.current, diffY), containerHeight - itemHeight * (itemIndex.current + 2))}px`;

    //         dragTarget.current.style.pointerEvents = 'none';

    //         // 마우스 포인터가 컨테이너를 벗어날 시 초기화
    //         if (e.clientY < 0 || e.clientY > containerRef.current.getBoundingClientRect().top + containerHeight) {
    //             onDragEnd();
    //         }
    //     }
    // };

    // const onDragEnter = (e, plan) => {
    //     if (isDrag) {
    //         // 순서 이동 기능
    //         overItem.current = plan;
    //         overItemIndex.current = getElementIndex(plan);

    //         // 순서 이동 모션
    //         // 타겟 요소
    //         overTarget.current = e.currentTarget;

    //         // 타겟 요소의 벌어지는 모션
    //         // 드래그 요소와 타겟 요소가 다른지 확인
    //         if (dragTarget.current !== overTarget.current) {
    //             // 타겟 요소 배열에 중복값 제거
    //             if (!overTargetArr.find((item) => item === e.currentTarget)) {
    //                 setOverTargetArr([...overTargetArr, e.currentTarget]);
    //             }

    //             // 드래그 요소와 타겟 요소의 위치에 따른 위/아래 모션 결정
    //             if (itemIndex.current < overItemIndex.current) {
    //                 e.currentTarget.style.transform = `translateY(-${itemRef.current.getBoundingClientRect().height}px)`;
    //             } else {
    //                 e.currentTarget.style.transform = `translateY(${itemRef.current.getBoundingClientRect().height}px)`;
    //             }

    //             // 벌어진 요소가 다시 제자리로 이동
    //             if (overTargetArr.find((item) => item === e.currentTarget)) {
    //                 e.currentTarget.style.transform = `translateY(${0}px)`;

    //                 setOverTargetArr(overTargetArr.filter((item) => item !== e.currentTarget));
    //             }
    //         }
    //     }
    // };

    // const onDragEnd = () => {
    //     setIsDrag(false);

    //     // 이동 모션
    //     // 드롭시 벌어진 요소 다시 제자리로 이동
    //     overTargetArr.forEach((item) => (item.style.transform = `translateY(${0}px)`));

    //     dragTarget.current.style.zIndex = '0';
    //     dragTarget.current.style.pointerEvents = 'auto';

    //     // 드래그된 요소 다시 제자리로 이동
    //     dragTarget.current.style.top = `${0}px`;

    //     // 사용 변수 초기화
    //     plansArr.current = null;
    //     item.current = null;
    //     itemIndex.current = null;
    //     overItem.current = null;
    //     overItemIndex.current = null;
    //     setOverTargetArr([]);
    // };

    // const onDrop = (e) => {
    //     e.preventDefault();

    //     if (isDrag) {
    //         // 이동 기능
    //         switchItem();
    //         onChangePlans(switchItem());
    //         getIndex();
    //     }
    // };

    // const onDragOver = (e) => {
    //     e.preventDefault();
    // };

    if (!planner) {
        return <div>Loading...</div>;
    }
    return (
        <FlexDiv>
            {/* <EditCalendarBlock ref={containerRef} onDrop={(e) => onDrop(e)} onDragOver={(e) => onDragOver(e)}> */}
            <ItemBox ref={itemRef}>
                <RouteLine />
                <Calendar
                    onClick={() => {
                        onAddDate(planDateEnd);
                        onCreatePlan();
                    }}
                >
                    더하기
                </Calendar>
            </ItemBox>
            <EditCalendarBlock ref={containerRef} onDrop={(e) => common.onDrop(e, isDrag, plansArr, itemIndex, overItemIndex, item, index, plans)} onDragOver={(e) => common.onDragOver(e)}>
                {/* 혹시 plans가 null이되는 버그가 발생할수도? */}
                {/* {console.log(plans)} */}
                {plans &&
                    plans.map((p, i) => (
                        // <ItemBox
                        //     key={p.planId}
                        //     // ref={itemRef}
                        //     draggable
                        //     onDragStart={(e) => {
                        //         onDragStart(e, p);
                        //     }}
                        //     onDrag={(e) => {
                        //         onDragMove(e);
                        //     }}
                        //     onDragEnd={(e) => {
                        //         onDragEnd(e);
                        //     }}
                        //     onDragEnter={(e) => {
                        //         onDragEnter(e, p);
                        //     }}
                        // >
                        <ItemBox
                            key={p.planId}
                            draggable
                            onDragStart={(e) => {
                                common.onDragStart(e, p, setIsDrag, dragTarget, posY, item, itemIndex, plansArr, plans);
                            }}
                            onDrag={(e) => {
                                common.onDragMove(e, isDrag, posY, containerRef, itemRef, itemIndex, dragTarget, setIsDrag, overTargetArr, plansArr, item, overItem, overItemIndex, setOverTargetArr);
                            }}
                            onDragEnd={(e) => {
                                common.onDragEnd(setIsDrag, overTargetArr, dragTarget, plansArr, item, itemIndex, overItem, overItemIndex, setOverTargetArr);
                            }}
                            onDragEnter={(e) => {
                                common.onDragEnter(e, p, isDrag, overItem, overItemIndex, overTarget, dragTarget, overTargetArr, setOverTargetArr, itemIndex, itemRef, plansArr, plans);
                            }}
                        >
                            <RouteLine />
                            <Calendar
                                aria-current={p.planId === plannerData.planId ? 'date' : null}
                                onClick={() => {
                                    onChangeCurPlanId(p.planId);
                                }}
                            >
                                {letsFormat(p.planDate)}
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
                            </Calendar>
                        </ItemBox>
                    ))}
            </EditCalendarBlock>
        </FlexDiv>
    );
};

export default EditCalendar;
