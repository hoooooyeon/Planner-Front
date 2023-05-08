import { useEffect } from 'react';
import { useRef, useState } from 'react';
import styled from 'styled-components';

const EditCalendarBlock = styled.div`
    z-index: 1;
    position: relative;
    left: 4px;
    border: 1px solid red;
    height: 100%;
`;

const ItemBox = styled.div`
    position: relative;
    /* width: 50px;
    height: 50px; */
    /* z-index: 1; */
`;

const Calendar = styled.div`
    background-color: #f1eee0;
    border: 0.2rem solid #cdd9ac;
    border-radius: 50px;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    /* margin-top: 16px; */
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
    /* position: absolute;
    left: 27px;
    top: -10px; */
    margin: 0 auto;
`;

const AddCal = styled.div``;

const DeleteButton = styled.div`
    position: absolute;
    top: -30px;
    left: 45px;
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

    const plansArr = useRef();
    const item = useRef();
    const overItem = useRef();
    const itemIndex = useRef();
    const overItemIndex = useRef();

    const dragTarget = useRef();
    const overTarget = useRef();
    const [overTargetArr, setOverTargetArr] = useState([]);

    let index = 0;

    // 바꿀 일정의 index 구하기
    const getElementIndex = (p) => {
        plansArr.current = plans;
        return plansArr.current.findIndex((plan) => plan === p);
    };

    // 선택 일정과 바꿀 일정을 바꿈
    const switchItem = () => {
        plansArr.current.splice(itemIndex.current, 1);
        plansArr.current.splice(overItemIndex.current, 0, item.current);
        return plansArr.current;
    };

    // db에서 순서를 세팅할 index를 구함.
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

    const containerRef = useRef();
    const itemRef = useRef();

    let posX = useRef(0);
    let posY = useRef(0);
    let originalX = useRef(0);
    let originalY = useRef(0);
    // let posX = 0;
    // let posY = 0;
    // let originalX = 0;
    // let originalY = 0;

    const [isDrag, setIsDrag] = useState(false);

    const getPos = (e) => {
        // posX = e.clientX;
        // posY = e.clientY;
        //     originalX = e.target.offsetLeft;
        //     originalY = e.target.offsetTop;
    };

    const onDragStart = (e, plan) => {
        setIsDrag(true);
        // 순서 이동 모션

        // 드래그시 반투명 이미지 제거
        let img = new Image();
        e.dataTransfer.setDragImage(img, 10, 10);

        // 드래그되는 요소
        dragTarget.current = e.currentTarget;
        dragTarget.current.style.zIndex = '100';

        // 마우스 포인터 좌표
        posX.current = e.clientX;
        posY.current = e.clientY;

        // 드래그될 요소의 최초 좌표
        originalX.current = e.currentTarget.offsetLeft;
        originalY.current = e.currentTarget.offsetTop;

        // 순서 이동 기능
        item.current = plan;
        itemIndex.current = getElementIndex(plan);
    };

    const onDragMove = (e) => {
        if (isDrag) {
            // 마우스 포인터가 이동한 거리
            const diffX = e.clientX - posX.current;
            const diffY = e.clientY - posY.current;

            // 드래그가 가능한 컨테이너 크기
            const containerWidth = containerRef.current.getBoundingClientRect().width;
            const containerHeight = containerRef.current.getBoundingClientRect().height;
            const itemWidth = itemRef.current.getBoundingClientRect().width;
            const itemHeight = itemRef.current.getBoundingClientRect().height;
            const endPointX = containerWidth - itemWidth;
            const endPointY = containerHeight - itemHeight;

            // 드래그되는 모션
            e.currentTarget.style.left = `${Math.min(Math.max(0, diffX), endPointX)}px`;
            e.currentTarget.style.top = `${Math.min(Math.max(-itemHeight * itemIndex.current, diffY), containerHeight - itemHeight * (itemIndex.current + 2))}px`;

            dragTarget.current.style.pointerEvents = 'none';

            // 마우스 포인터가 컨테이너를 벗어날 시 초기화
            if (e.clientX < 0 || e.clientX > containerRef.current.getBoundingClientRect().left + containerWidth || e.clientY < 0 || e.clientY > containerRef.current.getBoundingClientRect().top + containerHeight) {
                onDragEnd();
            }
        }
    };

    const onDragEnter = (e, plan) => {
        if (isDrag) {
            // 순서 이동 기능
            overItem.current = plan;
            overItemIndex.current = getElementIndex(plan);

            // 순서 이동 모션
            // 타겟 요소
            overTarget.current = e.currentTarget;

            // 타겟 요소의 벌어지는 모션
            // 드래그 요소와 타겟 요소가 다른지 확인
            if (dragTarget.current !== overTarget.current) {
                // 타겟 요소 배열에 중복값 제거
                if (!overTargetArr.find((item) => item === e.currentTarget)) {
                    setOverTargetArr([...overTargetArr, e.currentTarget]);
                }

                // 드래그 요소와 타겟 요소의 위치에 따른 위/아래 모션 결정
                if (itemIndex.current < overItemIndex.current) {
                    e.currentTarget.style.transform = `translateY(-${itemRef.current.getBoundingClientRect().height}px)`;
                } else {
                    e.currentTarget.style.transform = `translateY(${itemRef.current.getBoundingClientRect().height}px)`;
                }

                // 벌어진 요소가 다시 제자리로 이동
                if (overTargetArr.find((item) => item === e.currentTarget)) {
                    e.currentTarget.style.transform = `translateY(${0}px)`;

                    setOverTargetArr(overTargetArr.filter((item) => item !== e.currentTarget));
                }
            }
        }
    };

    const onDragLeave = (e) => {};

    const onDragEnd = (e) => {
        setIsDrag(false);

        // 이동 모션
        // 드롭시 벌어진 요소 다시 제자리로 이동
        overTargetArr.forEach((item) => (item.style.transform = `translateY(${0}px)`));

        dragTarget.current.style.zIndex = '0';
        dragTarget.current.style.pointerEvents = 'auto';

        // 드래그된 요소 다시 제자리로 이동
        dragTarget.current.style.left = `${0}px`;
        dragTarget.current.style.top = `${0}px`;

        // 사용 변수 초기화
        plansArr.current = null;
        item.current = null;
        itemIndex.current = null;
        overItem.current = null;
        overItemIndex.current = null;
        setOverTargetArr([]);
    };

    const onDrop = (e) => {
        e.preventDefault();

        if (isDrag) {
            // 이동 기능
            onChangePlans(switchItem());
            getIndex();
        }
    };

    const onDragOver = (e) => {
        e.preventDefault();
    };

    if (!planner) {
        return <div>Loading...</div>;
    }
    return (
        <EditCalendarBlock ref={containerRef} onDrop={(e) => onDrop(e)} onDragOver={(e) => onDragOver(e)}>
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
            <>
                {/* {console.log(plans)} */}
                {plans &&
                    plans.map((p, i) => (
                        <ItemBox
                            key={p.planId}
                            // ref={itemRef}
                            // aria-current={p.planId === currentInfo.planId ? 'date' : null}
                            draggable
                            onDragStart={(e) => {
                                onDragStart(e, p);
                            }}
                            onDrag={(e) => {
                                onDragMove(e);
                            }}
                            onDragEnd={(e) => {
                                onDragEnd(e);
                            }}
                            onDragEnter={(e) => {
                                onDragEnter(e, p);
                            }}
                            onDragLeave={(e) => {
                                onDragLeave(e);
                            }}
                            // onDrop={(e) => {
                            //     onDrop(e);
                            // }}
                            // onDragOver={(e) => {
                            //     onDragOver(e);
                            // }}
                            onClick={(e) => {
                                getPos(e);
                                // onChangeCurPlanId(p.planId);
                            }}
                        >
                            <RouteLine />
                            <Calendar>
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
            </>
        </EditCalendarBlock>
    );
};

export default EditCalendar;
