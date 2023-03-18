import styled from 'styled-components';
import EditCalendar from './EditCalendar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import EditRouteList from './EditRouteList';

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

const FlexDiv = styled.div`
    display: flex;
    height: 100%;
    justify-content: space-between;
`;

const Funds = styled.input`
    width: 90px;
    height: 30px;
    border: none;
    border-radius: 10px;
    padding: 0 10px;
    &:focus {
        outline: none;
    }
`;

const People = styled.input`
    width: 35px;
    height: 30px;
    border: none;
    border-radius: 10px;
    padding: 0 10px;

    &:focus {
        outline: none;
    }
`;

const Category = styled.select`
    width: 100px;
    height: 30px;
    border: none;
    border-radius: 10px;
    text-align: center;
    &:invalid {
        color: lightgray;
    }
    &:focus {
        outline: none;
    }
    option:disabled {
        display: none;
    }
`;

const RouteBox = styled.div`
    display: flex;
`;

const EditRoute = ({ planner, plan, onChangePlannerDateStart, onChangePlannerDateEnd, onCreatePlan, onDeletePlan, onLoadPlan, onUpdatePlan, onDeleteLocation }) => {
    const { planDateStart, planDateEnd } = planner;

    // api 추가 전 date
    const [dateRange, setDateRange] = useState([new Date(planDateStart), new Date(planDateEnd)]);
    const [startDate, setStartDate] = useState(new Date(planDateStart));

    // datePicker의 날짜와 planner의 날짜를 각각 나눔.
    const onChangeDate = (date) => {
        setStartDate(date);
        onChangePlannerDateStart(date);
    };

    // 총 여행일 구하는 함수
    // const onDiffDate = () => {
    //     const date = endDate.getTime() - startDate.getTime();
    //     const diffDate = date / (1000 * 60 * 60 * 24) + 1;
    //     console.log(diffDate);
    // };

    // 날짜 선택 확인 버튼 포함
    //     <DatePicker
    //     selected={startDate}
    //     onChange={(date) => setStartDate(date)}
    //     required
    //     form="external-form"
    //   />
    //   <form id="external-form">
    //     <input type="submit" />
    //   </form>
    return (
        <EditRouteBlock>
            <InfoForm>
                <DateBox>
                    <StyledDatePicker
                        selected={startDate}
                        // startDate={new Date(planDateStart)}
                        // endDate={new Date(planDateEnd)}
                        minDate={new Date()}
                        onChange={onChangeDate}
                        dateFormat=" yyyy. MM. dd "
                        placeholderText="여행 기간"
                    />
                </DateBox>
            </InfoForm>
            <RouteBox>
                <EditCalendar planner={planner} plan={plan} onLoadPlan={onLoadPlan} onCreatePlan={onCreatePlan} onDeletePlan={onDeletePlan} />
                <EditRouteList planner={planner} plan={plan} onUpdatePlan={onUpdatePlan} onDeleteLocation={onDeleteLocation} />
            </RouteBox>
        </EditRouteBlock>
    );
};

export default EditRoute;
