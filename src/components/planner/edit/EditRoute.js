import styled from 'styled-components';
import EditCalendar from './EditCalendar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import EditRouteList from './EditRouteList';
import { useEffect } from 'react';

const EditRouteBlock = styled.div`
    width: 370px;
    background-color: #f5f5f5;
    height: 750px;
    float: left;
`;

const InfoForm = styled.form`
    padding: 10px 15px;
    width: calc(100% - 30px);
    display: flex;
    flex-direction: column;
    background-color: #cdd9ac;
    input::placeholder {
        color: lightgray;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

const Title = styled.input`
    height: 40px;
    margin-bottom: 10px;
    border: none;
    border-radius: 10px;
    padding: 0 10px;
    &:focus {
        outline: none;
    }
`;

const DateBox = styled.div`
    margin-bottom: 10px;
    display: flex;
    height: 100%;
    background-color: white;
    border-radius: 10px;
    line-height: 30px;
    z-index: 999;
    input {
        position: absolute;
        left: 50%;
        transform: translate(-50%, -70%);
    }
`;

const StyledDatePicker = styled(DatePicker)`
    text-align: center;
    width: 220px;
    height: 20px;
    border-radius: 5rem;
    border: none;
    margin: 0 auto;
    &:focus {
        outline: none;
    }
`;

const RouteBox = styled.div`
    display: flex;
`;

const EditRoute = ({
    planner,
    plan,
    currentInfo,
    loading,
    onChangePlannerDateStart,
    onChangePlannerDateEnd,
    onCreatePlan,
    onDeletePlan,
    onLoadPlan,
    onUpdatePlan,
    onDeleteLocation,
    onUpdatePlannerDate,
    onChangeCurPlanId,
    onAddDate,
    onSubDate,
    onUpdateSubPlan,
    onChangePlans,
    onChangeLocation,
    onUpdateTrans,
}) => {
    // const [dateRange, setDateRange] = useState([new Date(planDateStart), new Date(planDateEnd)]);
    const { planDateStart, plans } = { ...planner };
    const [startDate, setStartDate] = useState(planDateStart ? new Date(planDateStart) : null);
    // const [startDate, setStartDate] = useState(new Date(planDateStart));

    // useEffect(() => {
    //     if (planner !== '') {
    //         setStartDate(new Date(planDateStart));
    //     }
    // }, [planner, planDateStart]);

    // datePicker의 날짜와 planner의 날짜를 각각 나눔.
    const onChangeDate = (date) => {
        setStartDate(date);
        // onChangePlannerDateStart(date);
        // onChangePlannerDateEnd(date);
        onUpdatePlannerDate(date);
        if (plans) {
            // onUpdatePlan();
        }
    };

    // if (!planner && loading) {
    if (!planner) {
        return <div>Loading...</div>;
    }
    return (
        <EditRouteBlock>
            <InfoForm>
                <DateBox>
                    <StyledDatePicker
                        selected={startDate}
                        // startDate={new Date(planDateStart)}
                        // endDate={new Date(planDateEnd)}
                        minDate={new Date()}
                        onChange={
                            onChangeDate
                            // onUpdatePlan();
                        }
                        dateFormat=" yyyy. MM. dd "
                        placeholderText="여행 기간"
                        // onClick={onUpdatePlan}
                    />
                </DateBox>
            </InfoForm>
            <RouteBox>
                <EditCalendar
                    planner={planner}
                    plan={plan}
                    currentInfo={currentInfo}
                    onLoadPlan={onLoadPlan}
                    onCreatePlan={onCreatePlan}
                    onDeletePlan={onDeletePlan}
                    onChangeCurPlanId={onChangeCurPlanId}
                    onAddDate={onAddDate}
                    onSubDate={onSubDate}
                    onUpdateSubPlan={onUpdateSubPlan}
                    onChangePlans={onChangePlans}
                />
                <EditRouteList planner={planner} plan={plan} currentInfo={currentInfo} onUpdatePlan={onUpdatePlan} onDeleteLocation={onDeleteLocation} onChangeLocation={onChangeLocation} onUpdateTrans={onUpdateTrans} />
            </RouteBox>
        </EditRouteBlock>
    );
};

export default EditRoute;
