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
    background-color: var(--md-sys-color-surface);
    height: 100vh;
    float: left;
`;

const InfoDiv = styled.div`
    background-color: var(--md-sys-color-surface-variant);
    box-shadow: 0px 1px 3px -2px var(--md-sys-color-shadow);
    margin-bottom: 1rem;
`;

const InfoBox = styled.div`
    position: relative;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const Title = styled.div`
    font-weight: bold;
    margin: 1.5rem 0 0.3rem;
    font-size: 1.3rem;
    width: 21rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Creator = styled.div`
    font-size: 0.9rem;
    color: var(--md-sys-color-secondary);
    margin-bottom: 2rem;
    width: 21rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Dates = styled.div`
    display: flex;
    z-index: 150;
    justify-content: space-around;
    margin-left: 0.5rem;
`;

const ShadowDiv = styled.div`
    box-shadow: 0px 1px 3px -2px var(--md-sys-color-shadow);
    border-radius: 0.2rem 0.5rem 0.5rem 0.2rem;
    &:last-child {
        margin-left: 2rem;
    }
`;

const DateBox = styled.div`
    box-shadow: -8px 0 0 black;
    background-color: var(--md-sys-color-surface);
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
        color: var(--md-sys-color-secondary);
        font-size: 0.7rem;
        width: 4rem;
        text-align: center;
    }
`;

const StartDateBox = styled(DateBox)`
    z-index: 99;
    &:hover {
        transition: transform 0.3s ease;
        transform: scale(1.03);
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
    color: var(--md-sys-color-secondary);
    margin-top: 1rem;
`;

const RouteBox = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    box-shadow: 0px 1px 3px -2px var(--md-sys-color-shadow);
    padding: 0.5rem 0.5rem 0.5rem 1rem;
    background-color: var(--md-sys-color-surface-variant);
`;

const MenuIcon = styled(FontAwesomeIcon)`
    position: absolute;
    top: 10px;
    left: 356px;
    font-size: 1.4rem;
    cursor: pointer;
    &:hover {
        transition: transform 0.3s ease;
        transform: scale(1.2);
    }
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

const DropDownMenu = styled.ul`
    position: absolute;
    line-height: 25px;
    left: 257px;
    width: 4.4rem;
    z-index: 1000;
    border-radius: 0.5rem;
    background-color: var(--md-sys-color-surface);
    box-shadow: 0px 1px 6px -3px var(--md-sys-color-shadow);
    border: none;
    padding: 0.5rem 1rem;
    text-align: center;
    li {
        cursor: pointer;
        font-size: 0.8rem;
        &:hover {
            font-weight: bold;
        }
    }
`;

const EditRoute = ({
    planner,
    plannerData,
    startDate,
    endDate,
    onCreatePlan,
    onDeletePlan,
    onDeleteLocation,
    onUpdatePlannerDate,
    onChangeCurPlanId,
    onAddDate,
    onSubDate,
    onUpdateTrans,
    onToggleMemberModal,
    onTogglePlannerInfoModal,
    onUpdatePlan,
    onUpdateLocation,
    setCurPlan,
    setCurLocation,
    cloneElement,
    cloneElStyle,
    onCloneElement,
    onDeleteElement,
    onChangeStyle,
    setUpdatePlans,
    onClickDateSchedule,
}) => {
    const { title, creator, updateDate } = { ...planner };
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

    return (
        <EditRouteBlock>
            <InfoDiv>
                <InfoBox>
                    <MenuIcon icon={faEllipsis} onClick={onClickDropDown} />
                    <DropDown dropDown={dropDown}>
                        <DropDownMenu>
                            <li onClick={onTogglePlannerInfoModal}>정보 수정</li>
                            <li onClick={onToggleMemberModal}>멤버 관리</li>
                        </DropDownMenu>
                    </DropDown>
                    <Title>{title}</Title>
                    <Creator>By {creator}</Creator>
                    <Dates>
                        <ShadowDiv>
                            <StartDateBox>
                                <p>Start Date</p>
                                <SetIcon icon={faGear} />
                                <PointerStyledDatePicker
                                    selected={startDate}
                                    minDate={new Date()}
                                    onChange={(date) => {
                                        onUpdatePlannerDate(date);
                                    }}
                                    dateFormat=" yyyy. MM. dd "
                                />
                            </StartDateBox>
                        </ShadowDiv>
                        <ShadowDiv>
                            <DateBox>
                                <p>End Date</p>
                                <StyledDatePicker
                                    readOnly
                                    selected={endDate}
                                    minDate={new Date()}
                                    dateFormat=" yyyy. MM. dd "
                                />
                            </DateBox>
                        </ShadowDiv>
                    </Dates>
                    <UpdatedDate>Updated {updateDate}</UpdatedDate>
                </InfoBox>
            </InfoDiv>
            <RouteBox>
                <EditCalendar
                    planner={planner}
                    plannerData={plannerData}
                    onCreatePlan={onCreatePlan}
                    onDeletePlan={onDeletePlan}
                    onChangeCurPlanId={onChangeCurPlanId}
                    onAddDate={onAddDate}
                    onSubDate={onSubDate}
                    onUpdatePlan={onUpdatePlan}
                    setCurPlan={setCurPlan}
                    cloneElement={cloneElement}
                    cloneElStyle={cloneElStyle}
                    onCloneElement={onCloneElement}
                    onDeleteElement={onDeleteElement}
                    onChangeStyle={onChangeStyle}
                    setUpdatePlans={setUpdatePlans}
                    onClickDateSchedule={onClickDateSchedule}
                />
                <EditRouteList
                    planner={planner}
                    plannerData={plannerData}
                    onDeleteLocation={onDeleteLocation}
                    onUpdateTrans={onUpdateTrans}
                    onUpdateLocation={onUpdateLocation}
                    setCurLocation={setCurLocation}
                    cloneElement={cloneElement}
                    cloneElStyle={cloneElStyle}
                    onCloneElement={onCloneElement}
                    onDeleteElement={onDeleteElement}
                    onChangeStyle={onChangeStyle}
                    setUpdatePlans={setUpdatePlans}
                />
            </RouteBox>
        </EditRouteBlock>
    );
};

export default EditRoute;
