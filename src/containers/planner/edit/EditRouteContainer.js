import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import EditRoute from '../../../components/planner/edit/EditRoute';
import {
    changeAllScheduleAction,
    changeCurPlanIdAction,
    changeCurPlannerIdAction,
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

const EditRouteContainer = ({ location }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    const { planner, plannerError, plan, plannerData, loading, account } = useSelector(
        ({ authReducer, plannerReducer, loadingReducer }) => ({
            planner: plannerReducer.planner,
            plannerError: plannerReducer.plannerError,
            plan: plannerReducer.plan,
            plannerData: plannerReducer.plannerData,
            loading: loadingReducer.loading,
            location: plannerReducer.location,
            account: authReducer.account,
        }),
    );

    const { plannerId, plans, title, planDateStart, planDateEnd, expense, memberCount, memberTypeId, creator } = {
        ...planner,
    };
    const { planId } = { ...plannerData };
    const { accountId } = { ...account };
    const [startDate, setStartDate] = useState(planDateStart ? new Date(planDateStart) : new Date());
    const [endDate, setEndDate] = useState(planDateEnd ? new Date(planDateEnd) : new Date());

    const letsFormat = (d) => {
        const date = new Date(d);
        return (
            date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
        );
    };

    useEffect(() => {
        if (!accountId) {
            alert('로그인이 필요합니다.');
            history.push('/Planners');
        } else if (planner === false) {
            alert('잘못된 접근입니다.');
            history.push(`/Planners`);
        } else if (Object.keys(planner).length > 0 && account && account.accountId !== planner.accountId) {
            alert('호스트만 접근할 수 있습니다.');
            history.push('/Planners');
        }
    }, [history, accountId, account, planner]);

    useEffect(() => {
        dispatch(changeCurPlannerIdAction(params.plannerId));
    }, [dispatch]);

    // 출발 날짜 선택
    const onUpdatePlannerDate = (date) => {
        if (account && Object.keys(planner).length > 0 && account.accountId === planner.accountId) {
            setStartDate(date);
            if (plans.length > 0) {
                setEndDate(new Date(new Date(date).setDate(new Date(date).getDate() + plans.length - 1)));
            } else {
                setEndDate(date);
            }
        }
    };

    // plan 추가시 날짜 하루 생성
    const onAddDate = (date) => {
        if (account && Object.keys(planner).length > 0 && account.accountId === planner.accountId) {
            setEndDate(new Date(new Date(date).setDate(new Date(date).getDate() + 1)));
        }
    };

    // plan 삭제시 날짜 하루 제거
    const onSubDate = (date) => {
        if (account && Object.keys(planner).length > 0 && account.accountId === planner.accountId) {
            if (plans.length > 1) {
                setEndDate(new Date(new Date(date).setDate(new Date(date).getDate() - 1)));
            }
        }
    };

    // 출발일, 종료일 업데이트
    useEffect(() => {
        if (planDateStart && planDateEnd) {
            const queryString = {
                plannerId,
                title,
                planDateStart: letsFormat(startDate),
                planDateEnd: letsFormat(endDate),
                expense,
                memberCount,
                memberTypeId,
            };
            dispatch(updatePlannerAction(queryString));
        }
    }, [startDate, endDate]);

    // 날짜 수정 오류시 자동 수정
    useEffect(() => {
        if (planDateStart && planDateEnd) {
            setStartDate(new Date(planDateStart));
            if (plans.length > 0) {
                setEndDate(
                    new Date(new Date(planDateStart).setDate(new Date(planDateStart).getDate() + plans.length - 1)),
                );
            } else {
                setEndDate(new Date(planDateStart));
            }
        }
    }, [planDateStart, planDateEnd]);

    const onCreatePlan = () => {
        if (account && Object.keys(planner).length > 0 && account.accountId === planner.accountId) {
            let planDate;
            if (plans.length > 0) {
                planDate = letsFormat(endDate.setDate(endDate.getDate() + 1));
            } else {
                planDate = letsFormat(endDate);
            }
            dispatch(createPlanAction({ plannerId, planDate }));
        }
    };

    const onDeletePlan = (planId) => {
        if (account && Object.keys(planner).length > 0 && account.accountId === planner.accountId) {
            dispatch(deletePlanAction({ plannerId, planId }));
        }
    };

    // 날짜 순서 수정
    const [curPlan, setCurPlan] = useState();
    const onUpdatePlan = (index) => {
        if (account && Object.keys(planner).length > 0 && account.accountId === planner.accountId) {
            const queryString = { plannerId, planId: curPlan.planId, planDate: curPlan.planDate, index };
            dispatch(updatePlanAction(queryString));
        }
    };

    // 일정 날짜 최신화
    const [updatePlans, setUpdatePlans] = useState();
    useEffect(() => {
        if (account && Object.keys(planner).length > 0 && account.accountId === planner.accountId) {
            let date = new Date(planDateStart);
            let planDate = letsFormat(date);

            if (plans) {
                for (let i = 0; i < plans.length; i++) {
                    // const planId = plans[i].planId;
                    // const index = 1024 * (i + 1);

                    if (i > 0) {
                        planDate = letsFormat(date.setDate(date.getDate() + 1));
                    }
                    const queryString = { plannerId, planId: plans[i].planId, planDate, index: 1024 * (i + 1) };
                    dispatch(updatePlanAction(queryString));
                }
            }
        }
    }, [dispatch, planDateStart, planDateEnd, plannerId, updatePlans]);

    // 로케이션 순서 수정
    const [curLocation, setCurLocation] = useState();
    const onUpdateLocation = (index) => {
        if (account && Object.keys(planner).length > 0 && account.accountId === planner.accountId) {
            const {
                locationId,
                locationName,
                locationContentId,
                locationImage,
                locationAddr,
                locationMapx,
                locationMapy,
                locationTransportation,
            } = curLocation;
            const queryString = {
                plannerId,
                locationId,
                locationName,
                locationContentId,
                locationImage,
                locationAddr,
                locationMapx,
                locationMapy,
                locationTransportation,
                planId,
                index,
            };
            dispatch(updateLocationAction(queryString));
        }
    };
    const onDeleteLocation = (locationId) => {
        if (account && Object.keys(planner).length > 0 && account.accountId === planner.accountId) {
            dispatch(deleteLocationAction({ plannerId, locationId, planId }));
        }
    };

    // planner 정보 가져오기
    useEffect(() => {
        const { plannerId } = plannerData;
        if (plannerId && accountId) {
            dispatch(loadPlannerAction(plannerId));
        }
    }, [dispatch, plannerData]);

    const onChangeCurPlanId = (planId) => {
        dispatch(changeCurPlanIdAction(planId));
    };

    const onUpdateTrans = (trans, locationData) => {
        if (account && Object.keys(planner).length > 0 && account.accountId === planner.accountId) {
            const {
                locationId,
                locationName,
                locationImage,
                locationContentId,
                locationAddr,
                locationMapx,
                locationMapy,
                index,
            } = locationData;
            const queryString = {
                plannerId,
                locationId,
                locationName,
                locationContentId,
                locationImage,
                locationAddr,
                locationMapx,
                locationMapy,
                locationTransportation: trans,
                planId,
                index,
            };
            dispatch(updateLocationAction(queryString));
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

    // planId 최신화
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
        } else {
            if (planId !== null) {
                dispatch(changeCurPlanIdAction(null));
            }
        }
    }, [dispatch, plans]);

    const onClickDateSchedule = () => {
        dispatch(changeAllScheduleAction(false));
    };

    if (
        Object.keys(planner).length <= 0 ||
        (account && Object.keys(planner).length > 0 && account.accountId !== planner.accountId)
    ) {
        return null;
    }
    return (
        <EditRoute
            planner={planner}
            plan={plan}
            plannerData={plannerData}
            loading={loading}
            startDate={startDate}
            endDate={endDate}
            cloneElement={cloneElement}
            cloneElStyle={cloneElStyle}
            onCloneElement={onCloneElement}
            onDeleteElement={onDeleteElement}
            onChangeStyle={onChangeStyle}
            setCurPlan={setCurPlan}
            setCurLocation={setCurLocation}
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
