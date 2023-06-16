import { useRef, useState } from 'react';
import styled from 'styled-components';
import * as common from '../../../lib/utils/CommonFunction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faCalendarPlus } from '@fortawesome/free-regular-svg-icons';

const FlexDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 1rem;
    background-color: rgb(240, 240, 240);
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
    padding: 0.5rem;
    width: 4rem;
    height: 29.5rem;
`;

const EditCalendarBlock = styled.div`
    border-radius: 1rem;
    z-index: 1;
    position: relative;
    padding: 0.5rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    background-color: rgb(235, 235, 235);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
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
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    & + & {
        margin-top: 0.5rem;
    }
    &:hover {
        /* transition: transform 0.3s;
        transform: scale(1.05); */
    }
    &[aria-current] {
        box-shadow: 0 0 10px rgb(150, 150, 150);
        background-color: rgb(220, 220, 220);
    }
`;

const Calendar = styled.div`
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 3rem;
    background-color: white;
    border-radius: 1rem;
    font-size: 0.7rem;
    font-weight: bold;
    letter-spacing: 1px;
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
    box-shadow: 0 1px 4px rgb(100, 100, 100);
    &:hover {
        transition: transform 0.3s ease;
        transform: scale(1.05);
    }
`;

const CalIcon = styled(FontAwesomeIcon)`
    color: rgb(110, 110, 110);
    font-size: 1.7rem;
    border-radius: 1rem;
    padding: 0.4rem;
`;

const DeleteButton = styled.div`
    position: absolute;
    top: -2px;
    left: 35px;
    border-radius: 2rem;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    font-size: 1rem;
    background-color: white;
    border-radius: 2rem;
    color: rgb(150, 150, 150);
}
`;

const EditCalendar = ({ planner, plan, plannerData, onCreatePlan, onDeletePlan, onLoadPlan, onChangeCurPlanId, onAddDate, onSubDate, onUpdateSubPlan, onChangePlans }) => {
    const { planDateEnd, plans } = { ...planner };

    const letsFormat = (d) => {
        const date = new Date(d);
        return ('0' + (date.getMonth() + 1)).slice(-2) + '/' + ('0' + date.getDate()).slice(-2);
    };

    const onClickDeletePlan = async (planId) => {
        onDeletePlan(planId);
        onSubDate(planDateEnd);
    };
    const containerRef = useRef();
    const itemRef = useRef();

    const itemsArr = useRef();
    const dragItem = useRef();
    const overItem = useRef();
    const dragItemIndex = useRef();
    const overItemIndex = useRef();

    const dragTarget = useRef();
    const overTarget = useRef();

    let index = 0;

    let posY = useRef(0);

    const [overTargetArr, setOverTargetArr] = useState([]);
    const [isDrag, setIsDrag] = useState(false);

    if (!planner) {
        return <div>Loading...</div>;
    }
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
            <EditCalendarBlock ref={containerRef} onDrop={(e) => common.onDrop(e, isDrag, itemsArr, dragItemIndex, overItemIndex, dragItem, index, plans)} onDragOver={(e) => common.onDragOver(e)}>
                {/* 혹시 plans가 null이되는 버그가 발생할수도? */}
                {/* {console.log(plans)} */}
                {plans &&
                    plans.map((p, i) => (
                        <ItemBox
                            ref={itemRef}
                            aria-current={p.planId === plannerData.planId ? 'date' : null}
                            onClick={() => {
                                onChangeCurPlanId(p.planId);
                            }}
                            key={p.planId}
                            draggable
                            onDragStart={(e) => {
                                common.onDragStart(e, p, setIsDrag, dragTarget, posY, dragItem, dragItemIndex, itemsArr, plans);
                            }}
                            onDrag={(e) => {
                                common.onDragMove(e, isDrag, posY, containerRef, itemRef, dragItemIndex, dragTarget, setIsDrag, overTargetArr, itemsArr, dragItem, overItem, overItemIndex, setOverTargetArr);
                            }}
                            onDragEnd={(e) => {
                                common.onDragEnd(setIsDrag, overTargetArr, dragTarget, itemsArr, dragItem, dragItemIndex, overItem, overItemIndex, setOverTargetArr);
                            }}
                            onDragEnter={(e) => {
                                common.onDragEnter(e, p, isDrag, overItem, overItemIndex, overTarget, dragTarget, overTargetArr, setOverTargetArr, dragItemIndex, itemRef, itemsArr, plans);
                            }}
                        >
                            <Calendar>{letsFormat(p.planDate)}</Calendar>
                            <DeleteButton
                                onClick={() => {
                                    onClickDeletePlan(p.planId);
                                }}
                            >
                                <StyledFontAwesomeIcon icon={faCircleXmark} />
                            </DeleteButton>
                        </ItemBox>
                    ))}
            </EditCalendarBlock>
        </FlexDiv>
    );
};

export default EditCalendar;
