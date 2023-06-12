import styled from 'styled-components';
import EditCalendar from './EditCalendar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from 'react';
import EditRouteList from './EditRouteList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';

const EditRouteBlock = styled.div`
    width: 370px;
    background-color: #f5f5f5;
    height: 750px;
    float: left;
`;

const InfoDiv = styled.div`
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
`;

const InfoBox = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    padding: 0.5rem 0;
`;

const Title = styled.div`
    font-weight: bold;
    margin-bottom: 0.3rem;
    font-size: 1.3rem;
`;

const Creator = styled.div`
    font-size: 0.9rem;
    color: gray;
    margin-bottom: 1rem;
`;

const Dates = styled.div`
    display: flex;
    z-index: 999;
    justify-content: space-around;
    margin-left: 0.5rem;
`;

const ShadowDiv = styled.div`
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 0.2rem 0.5rem 0.5rem 0.2rem;
    &:last-child {
        margin-left: 1rem;
    }
`;

const DateBox = styled.div`
    box-shadow: -8px 0 0 black;
    background-color: white;
    border-radius: 0.2rem 0.5rem 0.5rem 0.2rem;
    width: 10rem;
    height: 3rem;
    padding: 0.4rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 10%;
    position: relative;
    p {
        color: lightgray;
        font-size: 0.7rem;
        width: 4rem;
        text-align: center;
    }
`;

const StyledDatePicker = styled(DatePicker)`
    position: absolute;
    top: -40px;
    left: 1px;
    width: 100%;
    height: calc(3rem - 0.4rem);
    padding: 1.2rem 0 0;
    border: none;
    font-weight: bold;
    text-align: center;
    background-color: transparent;
    &:focus {
        outline: none;
    }
    &:first-of-type {
        cursor: pointer;
    }
`;

const SetIcon = styled(FontAwesomeIcon)`
    position: absolute;
    left: 138px;
    top: 5px;
`;

const UpdatedDate = styled.div`
    font-size: 0.7rem;
    color: lightgray;
    margin-top: 0.5rem;
`;

const RouteBox = styled.div`
    display: flex;
`;

const EditRoute = ({
    planner,
    plan,
    plannerData,
    transList,
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
    const { title, creator, planDateStart, planDateEnd, updateDate } = { ...planner };
    const [startDate, setStartDate] = useState(planDateStart ? new Date(planDateStart) : null);
    const [endDate, setEndDate] = useState(planDateEnd ? new Date(planDateEnd) : null);

    // datePicker의 날짜와 planner의 날짜를 각각 나눔.
    useEffect(() => {
        setStartDate(new Date(planDateStart));
        setEndDate(new Date(planDateEnd));
    }, [planDateStart, planDateEnd]);

    if (!planner) {
        return <div>Loading...</div>;
    }
    return (
        <EditRouteBlock>
            <InfoDiv>
                <Logo>한국다봄</Logo>
                <InfoBox>
                    <Title>{title}</Title>
                    <Creator>By {creator}</Creator>
                    <Dates>
                        <ShadowDiv>
                            <DateBox>
                                <p>Start Date</p>
                                <SetIcon icon={faGear} />
                                <StyledDatePicker
                                    selected={startDate}
                                    minDate={new Date()}
                                    onChange={(date) => {
                                        onUpdatePlannerDate(date);
                                    }}
                                    dateFormat=" yyyy. MM. dd "
                                    placeholderText="여행 기간"
                                />
                            </DateBox>
                        </ShadowDiv>
                        <ShadowDiv>
                            <DateBox>
                                <p>End Date</p>
                                <StyledDatePicker readOnly selected={endDate} minDate={new Date()} dateFormat=" yyyy. MM. dd " />
                            </DateBox>
                        </ShadowDiv>
                    </Dates>
                    <UpdatedDate>Updated {updateDate}</UpdatedDate>
                </InfoBox>
            </InfoDiv>
            <RouteBox>
                <EditCalendar
                    planner={planner}
                    plan={plan}
                    plannerData={plannerData}
                    onLoadPlan={onLoadPlan}
                    onCreatePlan={onCreatePlan}
                    onDeletePlan={onDeletePlan}
                    onChangeCurPlanId={onChangeCurPlanId}
                    onAddDate={onAddDate}
                    onSubDate={onSubDate}
                    onUpdateSubPlan={onUpdateSubPlan}
                    onChangePlans={onChangePlans}
                />
                <EditRouteList
                    planner={planner}
                    plan={plan}
                    plannerData={plannerData}
                    transList={transList}
                    onUpdatePlan={onUpdatePlan}
                    onDeleteLocation={onDeleteLocation}
                    onChangeLocation={onChangeLocation}
                    onUpdateTrans={onUpdateTrans}
                />
            </RouteBox>
        </EditRouteBlock>
    );
};

export default EditRoute;
