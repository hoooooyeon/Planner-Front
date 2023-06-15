import styled, { css } from 'styled-components';
import EditCalendar from './EditCalendar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from 'react';
import EditRouteList from './EditRouteList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
const EditRouteBlock = styled.div`
    /* width: 400px; */
    background-color: white;
    height: 100%;
    float: left;
`;

const InfoDiv = styled.div`
    background-color: #f5f5f5;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
`;

const InfoBox = styled.div`
    position: relative;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
    background-color: #f5f5f5;
    font-size: 1.7rem;
    font-weight: bold;
    text-align: center;
    padding: 1rem 0;
`;

const Title = styled.div`
    font-weight: bold;
    margin: 2rem 0 0.3rem;
    font-size: 1.3rem;
    /* width:  */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Creator = styled.div`
    font-size: 0.9rem;
    color: gray;
    margin-bottom: 2rem;
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
        margin-left: 2rem;
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
`;

const PointerStyledDatePicker = styled(StyledDatePicker)`
    cursor: pointer;
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
    /* width: 400px; */
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    box-shadow: 0 -2px 2px rgba(0, 0, 0, 0.1);
    padding: 0.5rem;
    background-color: #f5f5f5;
`;

const MenuIcon = styled(FontAwesomeIcon)`
    position: absolute;
    top: 10px;
    left: 356px;
    font-size: 1.4rem;
    cursor: pointer;
`;

const DropDown = styled.div`
    display: none;
    position: relative;
    ${(props) =>
        props.dropDown &&
        css`
            display: block;
        `}
`;

const DropDownArrow = styled.div`
    transform: rotate(45deg);
    position: absolute;
    top: 20px;
    left: 342px;
    width: 1rem;
    height: 1rem;
    z-index: 1001;
    background-color: white;
`;

const DropDownMenu = styled.ul`
    position: absolute;
    line-height: 25px;
    top: 11px;
    left: 270px;
    width: 4.4rem;
    z-index: 1000;
    border-radius: 0.5rem;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border: none;
    padding: 0.5rem 1rem;
    li {
        font-size: 0.8rem;
    }
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

    const [dropDown, setDropDown] = useState(false);

    const onClickDropDown = () => {
        setDropDown(!dropDown);
    };
    const onCloseDropDown = () => {
        if (dropDown) {
            setDropDown(false);
        }
    };

    useEffect(() => {
        window.addEventListener('click', onCloseDropDown);
        return () => window.removeEventListener('click', onCloseDropDown);
    });

    if (!planner) {
        return <div>Loading...</div>;
    }
    return (
        <EditRouteBlock>
            <InfoDiv>
                {/* <Logo>한국다봄</Logo> */}
                <InfoBox>
                    <MenuIcon icon={faEllipsis} onClick={onClickDropDown} />
                    <DropDown dropDown={dropDown}>
                        <DropDownArrow />
                        <DropDownMenu>
                            <li>정보 수정</li>
                            <li>멤버 초대</li>
                        </DropDownMenu>
                    </DropDown>
                    <Title>{title}</Title>
                    <Creator>By {creator}</Creator>
                    <Dates>
                        <ShadowDiv>
                            <DateBox>
                                <p>Start Date</p>
                                <SetIcon icon={faGear} />
                                <PointerStyledDatePicker
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
