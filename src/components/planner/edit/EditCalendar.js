import { useRef, useState } from 'react';
import styled from 'styled-components';
import * as common from '../../../lib/utils/CommonFunction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faCalendarPlus } from '@fortawesome/free-regular-svg-icons';

const FlexDiv = styled.div`
    width: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 1rem;
    background-color: rgb(230, 230, 230);
    box-shadow: 0 0 5px rgb(120, 120, 120);
    padding: 0.3rem;
`;

const EditCalendarBlock = styled.div`
    width: 70px;
    background-color: rgb(80, 80, 80);
    border: 0.2rem inset rgb(100, 100, 100);
    border-radius: 1rem;
    z-index: 1;
    position: relative;
    padding: 0.3rem;
`;

const ItemBox = styled.div`
    width: 3rem;
    height: 3rem;
    position: relative;
    background-color: rgb(110, 110, 110);
    border: 0.2rem inset rgb(140, 140, 140);
    border-radius: 1rem;
    cursor: pointer;
    padding: 0.2rem 0.5rem 0.5rem 0.2rem;
    & + & {
        margin: 0.3rem 0;
    }
    &:hover {
        transition: transform 0.3s;
        transform: scale(1.05);
        box-shadow: inset 0 0 30px rgb(232, 232, 156);
    }
    &[aria-current] {
        width: 3.2rem;
        height: 3.2rem;
        box-shadow: 0 0 10px rgb(200, 200, 200);
        background-color: rgb(160, 160, 160);
    }
`;

const Calendar = styled.div`
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 3rem;
    border: 0.2rem outset rgb(140, 140, 140);
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 1rem;
    font-size: 0.7rem;
    color: lightgray;
    font-weight: bold;
    letter-spacing: 1px;
`;

const AddCal = styled(ItemBox)`
    border-radius: 2rem;
    padding: 0.3rem;
    margin-bottom: 0.3rem;
    background-color: rgba(100, 100, 100);
`;

const CalIcon = styled(FontAwesomeIcon)`
    color: rgba(130, 130, 130);
    font-size: 1.6rem;
    border-radius: 1rem;
    padding: 0.4rem;
    border: 0.3rem outset gray;
    background-color: rgba(0, 0, 0, 0.2);
`;

const DeleteButton = styled.div`
    position: absolute;
    top: -6px;
    left: 42px;
    border-radius: 2rem;
    border: 0.2rem outset rgb(140, 140, 140);
    background: lightgray;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    font-size: 1.3rem;
    background: lightgray;
    border-radius: 2rem;
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

    const itemHeight = 48;

    if (!planner) {
        return <div>Loading...</div>;
    }
    return (
        <FlexDiv>
            {/* <ItemBox ref={itemRef}> */}
            <AddCal
                onClick={() => {
                    onAddDate(planDateEnd);
                    onCreatePlan();
                }}
            >
                <CalIcon icon={faCalendarPlus} />
            </AddCal>
            <EditCalendarBlock ref={containerRef} onDrop={(e) => common.onDrop(e, isDrag, plansArr, itemIndex, overItemIndex, item, index, plans)} onDragOver={(e) => common.onDragOver(e)}>
                {/* 혹시 plans가 null이되는 버그가 발생할수도? */}
                {/* {console.log(plans)} */}
                {plans &&
                    plans.map((p, i) => (
                        <ItemBox
                            aria-current={p.planId === plannerData.planId ? 'date' : null}
                            onClick={() => {
                                onChangeCurPlanId(p.planId);
                            }}
                            key={p.planId}
                            draggable
                            onDragStart={(e) => {
                                common.onDragStart(e, p, setIsDrag, dragTarget, posY, item, itemIndex, plansArr, plans);
                            }}
                            onDrag={(e) => {
                                common.onDragMove(e, isDrag, posY, containerRef, itemHeight, itemIndex, dragTarget, setIsDrag, overTargetArr, plansArr, item, overItem, overItemIndex, setOverTargetArr);
                            }}
                            onDragEnd={(e) => {
                                common.onDragEnd(setIsDrag, overTargetArr, dragTarget, plansArr, item, itemIndex, overItem, overItemIndex, setOverTargetArr);
                            }}
                            onDragEnter={(e) => {
                                common.onDragEnter(e, p, isDrag, overItem, overItemIndex, overTarget, dragTarget, overTargetArr, setOverTargetArr, itemIndex, itemHeight, plansArr, plans);
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
