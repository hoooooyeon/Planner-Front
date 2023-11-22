import styled, { css } from 'styled-components';
import EditCalendar from './EditCalendar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from 'react';
import EditRouteList from './EditRouteList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import Loading from '../../common/Loading';
import EditTutorialModal from './EditTutorialModal';

const EditRouteBlock = styled.div`
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    height: 100vh;
    float: left;
    min-width: 24rem;
    z-index: 10;
    position: fixed;
    @media all and (max-width: 480px) {
        transition: 0s;
        width: 100%;
        min-width: 21rem;
        top: ${(props) => (props.navRoute ? '250px' : '740px')};
    }
    @media all and (min-width: 481px) {
        /* transition: 0.4s ease; */
        transform: ${(props) => (props.navRoute ? 'translateX(0px)' : 'translateX(-392px)')};
    }
`;

const InfoDiv = styled.div`
    height: 14rem;
    background-color: ${(props) => props.theme.secondaryBackgroundColor};
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    margin-bottom: 1rem;
    @media all and (max-width: 480px) {
        height: 9rem;
    }
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
    @media all and (max-width: 480px) {
        font-size: 1rem;
        margin: 0 0 0.3rem;
    }
`;

const Creator = styled.div`
    color: ${(props) => props.theme.tertiaryColor};
    margin-bottom: 2rem;
    width: 21rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    @media all and (max-width: 480px) {
        font-size: 0.7rem;
        margin-bottom: 0.5rem;
    }
`;

const Dates = styled.div`
    display: flex;
    z-index: 150;
    justify-content: space-around;
    margin-left: 0.5rem;
`;

const ShadowDiv = styled.div`
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    border-radius: 0.2rem 0.5rem 0.5rem 0.2rem;
    &:last-child {
        margin-left: 2rem;
    }
`;

const DateBox = styled.div`
    box-shadow: -8px 0 0 ${(props) => props.theme.secondaryColor};
    background-color: ${(props) => props.theme.primaryBackgroundColor};
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
        color: ${(props) => props.theme.secondaryColor};
        font-size: 0.7rem;
        width: 4rem;
        text-align: center;
    }
    @media all and (max-width: 480px) {
        width: 7rem;
        height: 2rem;
        p {
            font-size: 0.6rem;
        }
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
    @media all and (max-width: 480px) {
        top: -34px;
        height: calc(2rem - 0.4rem);
    }
`;

const PointerStyledDatePicker = styled(StyledDatePicker)`
    cursor: pointer;
`;

const SetIcon = styled(FontAwesomeIcon)`
    position: absolute;
    left: 138px;
    top: 5px;
    @media all and (max-width: 480px) {
        left: 90px;
    }
`;

const UpdatedDate = styled.div`
    font-size: 0.7rem;
    color: ${(props) => props.theme.tertiaryColor};
    margin-top: 1rem;
    @media all and (max-width: 480px) {
        font-size: 0.6rem;
        margin-top: 0.5rem;
    }
`;

const RouteBox = styled.div`
    width: 368px;
    height: 480px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    padding: 0.5rem 0.5rem 0.5rem 1rem;
    background-color: ${(props) => props.theme.secondaryBackgroundColor};
    @media all and (max-width: 480px) {
        width: auto;
        height: 308px;
    }
`;

const MenuIcon = styled(FontAwesomeIcon)`
    position: absolute;
    top: 10px;
    right: 17px;
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
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    box-shadow: 0px 1px 6px ${(props) => props.theme.shadowColor};
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
    @media all and (max-width: 480px) {
        left: 305px;
    }
`;

const ButtonBox = styled.div`
    position: absolute;
    left: 405px;
    top: 10px;
    z-index: 150;
    display: flex;
    flex-direction: column;
    @media all and (max-width: 480px) {
        display: none;
    }
`;

const Button = styled.button`
    border: none;
    border-radius: 2rem;
    width: 8rem;
    height: 3rem;
    background-color: ${(props) => props.theme.primaryButtonBackgroundColor};
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    margin: 5px 0;
    color: ${(props) => props.theme.secondaryColor};
    &:hover {
        box-shadow: 0px 1px 6px ${(props) => props.theme.shadowColor};
        color: ${(props) => props.theme.hoverColor};
    }
    a {
        display: block;
        color: ${(props) => props.theme.secondaryColor};
        height: 100%;
        line-height: 3rem;
        &:hover {
            color: ${(props) => props.theme.hoverColor};
        }
    }
    ${(props) =>
        props.allSchedule &&
        css`
            color: ${(props) => props.theme.primaryColor};
            background-color: ${(props) => props.theme.clickedButtonBackgroundColor};
            &:hover {
                color: ${(props) => props.theme.primaryColor};
            }
        `}
`;

const NavArrowIcon = styled(FontAwesomeIcon)`
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 2rem;
    padding: 0.3rem;
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    margin-bottom: 5px;
    cursor: pointer;
    &:hover {
        box-shadow: 0px 1px 6px ${(props) => props.theme.shadowColor};
        color: ${(props) => props.theme.hoverColor};
    }
`;

const EditRoute = ({
    planner,
    plannerData,
    startDate,
    endDate,
    loading,
    allSchedule,
    mapData,
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
    onSavePlanner,
    onClickTutorialModal,
    onClickAllSchedule,
    onToggleWindowNavRoute,
}) => {
    const { title, creator, updateDate } = { ...planner };
    const [dropDown, setDropDown] = useState(false);
    const {
        createLocationLoading,
        deleteLocationLoading,
        updateLocationLoading,
        createPlanLoading,
        deletePlanLoading,
        updatePlanLoading,
        updatePlannerLoading,
        plannerLoading,
    } = { ...loading };
    const { navRoute } = { ...mapData };

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
        <>
            <EditRouteBlock navRoute={navRoute}>
                {plannerLoading ? (
                    <Loading pos="center" />
                ) : (
                    <>
                        {updatePlannerLoading ? (
                            <InfoDiv>
                                <Loading pos="center" />
                            </InfoDiv>
                        ) : (
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
                        )}
                        {createLocationLoading ||
                        deleteLocationLoading ||
                        updateLocationLoading ||
                        createPlanLoading ||
                        deletePlanLoading ||
                        updatePlanLoading ? (
                            <RouteBox>
                                <Loading pos="center" />
                            </RouteBox>
                        ) : (
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
                        )}
                    </>
                )}
                <ButtonBox>
                    {navRoute ? (
                        <NavArrowIcon onClick={() => onToggleWindowNavRoute(false)} icon={faCaretLeft} />
                    ) : (
                        <NavArrowIcon onClick={() => onToggleWindowNavRoute(true)} icon={faCaretRight} />
                    )}
                    <Button allSchedule={allSchedule} onClick={onClickAllSchedule}>
                        모든 일정
                    </Button>
                    <Button onClick={onClickTutorialModal}>사용 방법</Button>
                    <Button onClick={onSavePlanner}>일정 저장</Button>
                </ButtonBox>
            </EditRouteBlock>
        </>
    );
};

export default EditRoute;
