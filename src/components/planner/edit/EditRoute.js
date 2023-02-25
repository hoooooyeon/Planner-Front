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

const EditRoute = ({ planner, onChangePlannerTitle, onChangePlannerDateStart, onChangePlannerDateEnd }) => {
    // api 추가 전 date
    // const [dateRange, setDateRange] = useState([null, null]);
    // const [startDate, endDate] = dateRange;

    const onChangeDates = (dates) => {
        const [start, end] = dates;
        onChangePlannerDateStart(start);
        onChangePlannerDateEnd(end);
    };

    return (
        <EditRouteBlock>
            <InfoForm>
                <Title
                    placeholder="플래너 이름"
                    onChange={(e) => {
                        onChangePlannerTitle(e.target.value);
                    }}
                />
                <DateBox>
                    <StyledDatePicker
                        selectsRange={true}
                        startDate={planner.planDateStart}
                        endDate={planner.planDateEnd}
                        minDate={new Date()}
                        onChange={onChangeDates}
                        // 왜 dates를 안 줘도 될까?
                        // onChange={(dates) => {
                        //     onChangeDates(dates);
                        // }}
                        dateFormat=" yyyy. MM. dd "
                        placeholderText="여행 종료일"
                    />

                    {/*
                    api 추가 전  date
                    <StyledDatePicker
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        minDate={new Date()}
                        onChange={(date) => {
                            setDateRange(date);
                        }}
                        dateFormat=" yyyy. MM. dd "
                        placeholderText="여행 종료일"
                    /> */}
                </DateBox>
                <FlexDiv>
                    <Funds placeholder="여행 자금" />
                    <People placeholder="인원" />
                    <Category required>
                        <option value="" disabled selected>
                            선택
                        </option>
                        <option value="alone">혼자</option>
                        <option value="couple">연인</option>
                        <option value="friend">친구</option>
                        <option value="family">가족</option>
                    </Category>
                </FlexDiv>
            </InfoForm>
            <RouteBox>
                <EditCalendar />
                <EditRouteList />
            </RouteBox>
        </EditRouteBlock>
    );
};

export default EditRoute;
