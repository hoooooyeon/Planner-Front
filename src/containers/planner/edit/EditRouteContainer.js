import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import EditRoute from '../../../components/planner/edit/EditRoute';
import {
    changeAllScheduleAction,
    changeCurPlanIdAction,
    createPlanAction,
    deleteLocationAction,
    deletePlanAction,
    loadPlannerAction,
    toggleMemberModalAction,
    togglePlannerInfoModalAction,
    updateLocationAction,
    updatePlanAction,
    updatePlannerAction,
} from '../../../modules/plannerModule';

const EditRouteContainer = () => {
    const dispatch = useDispatch();
    const { planner, plannerError, plan, plannerData, loading, transList, account } = useSelector(({ authReducer, plannerReducer, loadingReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
        plan: plannerReducer.plan,
        plannerData: plannerReducer.plannerData,
        loading: loadingReducer.loading,
        location: plannerReducer.location,
        transList: plannerReducer.transList,
        account: authReducer.account,
    }));
    const history = useHistory();

    const { plannerId, plans, title, planDateStart, planDateEnd, expense, memberCount, memberTypeId, creator } = { ...planner };
    const { planId } = { ...plannerData };
    const { nickname, accountId } = { ...account };

    useEffect(() => {
        if (accountId && planner && nickname !== creator) {
            alert('호스트만 접근할 수 있습니다.');

            history.push('/PlannerList');
        }
    }, []);

    const letsFormat = (d) => {
        const date = new Date(d);
        return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    };

    // 시작 날짜 선택 함수
    const onUpdatePlannerDate = (date) => {
        let planDateStart = letsFormat(date);
        let planDateEnd = letsFormat(date);

        if (plans.length !== 0) {
            planDateEnd = letsFormat(new Date(planDateEnd).setDate(new Date(planDateEnd).getDate() + plans.length - 1));
        }
        dispatch(updatePlannerAction({ plannerId, title, planDateStart, planDateEnd, expense, memberCount, memberTypeId }));
    };

    // plan 추가시 날짜 하루 생성
    const onAddDate = (date) => {
        if (plans.length === 0) {
            return;
        }

        let curDate = new Date(date);
        let planDateEnd = letsFormat(curDate.setDate(curDate.getDate() + 1));

        dispatch(updatePlannerAction({ plannerId, title, planDateStart, planDateEnd, expense, memberCount, memberTypeId }));
    };

    // plan 삭제시 날짜 하루 제거
    const onSubDate = (date) => {
        let curDate = new Date(date);
        let planDateEnd = letsFormat(curDate.setDate(curDate.getDate() - 1));

        dispatch(updatePlannerAction({ plannerId, title, planDateStart, planDateEnd, expense, memberCount, memberTypeId }));
    };
    const [startDate, setStartDate] = useState(planDateStart ? new Date(planDateStart) : null);
    const [endDate, setEndDate] = useState(planDateEnd ? new Date(planDateEnd) : null);

    const onChangePlannerDateStart = (date) => {
        setStartDate(date);
    };

    const onChangePlannerDateEnd = (date) => {
        setEndDate(date);
    };

    useEffect(() => {
        if (planDateStart && planDateEnd) {
            onChangePlannerDateStart(new Date(planDateStart));
            onChangePlannerDateEnd(new Date(planDateEnd));
        }
    }, [planDateStart, planDateEnd]);

    const onCreatePlan = () => {
        const planDate = letsFormat(new Date(planDateEnd));

        dispatch(createPlanAction({ plannerId, planDate }));
    };
    const onDeletePlan = (planId) => {
        dispatch(deletePlanAction({ plannerId, planId }));
        if (planner && plans.length > 0 && planId === plannerData.planId) {
            // dispatch(changeCurPlanIdAction(plans[0].planId));
        }
    };

    // 날짜 순서 수정
    const [curPlan, setCurPlan] = useState();
    const onUpdatePlan = (index) => {
        const planDate = curPlan.planDate;
        const planId = curPlan.planId;

        dispatch(updatePlanAction({ plannerId, planId, planDate, index }));
    };

    const [updatePlans, setUpdatePlans] = useState();
    // 일정 날짜 최신화
    useEffect(() => {
        let date = new Date(planDateStart);
        let planDate = letsFormat(date);

        if (plans) {
            for (let i = 0; i < plans.length; i++) {
                const planId = plans[i].planId;
                const index = 1024 * (i + 1);

                if (i > 0) {
                    planDate = letsFormat(date.setDate(date.getDate() + 1));
                }
                dispatch(updatePlanAction({ plannerId, planId, planDate, index }));
            }
        }
    }, [dispatch, planDateStart, planDateEnd, plannerId, updatePlans]);

    // 로케이션 순서 수정
    const [curLocation, setCurLocation] = useState();
    const onUpdateLocation = (index) => {
        const { locationId, locationName, locationContentId, locationImage, locationAddr, locationMapx, locationMapy, locationTransportation } = curLocation;
        dispatch(updateLocationAction({ plannerId, locationId, locationName, locationContentId, locationImage, locationAddr, locationMapx, locationMapy, locationTransportation, planId, index }));
    };
    const onDeleteLocation = (locationId) => {
        dispatch(deleteLocationAction({ plannerId, locationId, planId }));
    };

    // planner 정보 가져오기
    useEffect(() => {
        const { plannerId } = plannerData;
        if (plannerId) {
            dispatch(loadPlannerAction(plannerId));
        }
    }, [dispatch, plannerData]);

    const onChangeCurPlanId = (planId) => {
        dispatch(changeCurPlanIdAction(planId));
    };

    const onUpdateTrans = (trans, locationData) => {
        if (planner) {
            const { locationId, locationName, locationImage, locationContentId, locationAddr, locationMapx, locationMapy } = locationData;
            let locationTransportation = trans;
            dispatch(updateLocationAction({ plannerId, locationId, locationName, locationContentId, locationImage, locationAddr, locationMapx, locationMapy, locationTransportation, planId }));
        }
    };

    const onToggleMemberModal = () => {
        dispatch(toggleMemberModalAction());
    };
    const onTogglePlannerInfoModal = () => {
        dispatch(togglePlannerInfoModalAction());
    };

    // 드래그시 클론요소 생성 관련 함수
    const [cloneElement, setCloneElement] = useState(false);
    const [cloneElStyle, setCloneElStyle] = useState(0);

    const onCloneElement = () => {
        setCloneElement(true);
    };

    const onDeleteElement = () => {
        setCloneElement(false);
        setCloneElStyle(0);
    };

    const onChangeStyle = (top) => {
        setCloneElStyle(top);
    };

    useEffect(() => {
        if (plans && plans.length > 0) {
            let isPlanId = 0;
            plans.forEach((p) => {
                if (p.planId === planId) {
                    isPlanId++;
                }
            });
            if (isPlanId === 0) {
                dispatch(changeCurPlanIdAction(plans[0].planId));
            }
        }
    }, [dispatch, plans]);

    const onClickDateSchedule = () => {
        dispatch(changeAllScheduleAction(false));
    };

    if (nickname !== creator) {
        return null;
    }
    return (
        <EditRoute
            planner={planner}
            plan={plan}
            plannerData={plannerData}
            loading={loading}
            transList={transList}
            startDate={startDate}
            endDate={endDate}
            curPlan={curPlan}
            curLocation={curLocation}
            cloneElement={cloneElement}
            cloneElStyle={cloneElStyle}
            onCloneElement={onCloneElement}
            onDeleteElement={onDeleteElement}
            onChangeStyle={onChangeStyle}
            setCurPlan={setCurPlan}
            setCurLocation={setCurLocation}
            onChangePlannerDateStart={onChangePlannerDateStart}
            onChangePlannerDateEnd={onChangePlannerDateEnd}
            onCreatePlan={onCreatePlan}
            onDeletePlan={onDeletePlan}
            onDeleteLocation={onDeleteLocation}
            onUpdatePlannerDate={onUpdatePlannerDate}
            onChangeCurPlanId={onChangeCurPlanId}
            onAddDate={onAddDate}
            onSubDate={onSubDate}
            onUpdateTrans={onUpdateTrans}
            onToggleMemberModal={onToggleMemberModal}
            onTogglePlannerInfoModal={onTogglePlannerInfoModal}
            onUpdatePlan={onUpdatePlan}
            onUpdateLocation={onUpdateLocation}
            setUpdatePlans={setUpdatePlans}
            onClickDateSchedule={onClickDateSchedule}
        />
    );
};

export default EditRouteContainer;
