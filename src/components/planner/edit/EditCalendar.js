import styled from 'styled-components';

const EditCalendarBlock = styled.div`
    z-index: 1;
    position: relative;
    left: 4px;
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
    top: -20px;
    left: 50px;
`;

const EditCalendar = ({ planner, plan, onCreatePlan, onDeletePlan, onLoadPlan }) => {
    const { plans } = planner;

    const letsFormat = (d) => {
        const date = new Date(d);
        return ('0' + (date.getMonth() + 1)).slice(-2) + '/' + ('0' + date.getDate()).slice(-2);
    };

    return (
        <EditCalendarBlock>
            <Calendar onClick={onCreatePlan}>
                <RouteLine />
                더하기
            </Calendar>
            <>
                {plans &&
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
        </EditCalendarBlock>
    );
};

export default EditCalendar;
