import { useState } from 'react';
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

const EditRouteContainer = ({ location }) => {
    const dispatch = useDispatch();
    const history = useHistory();

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
    const { nickname, accountId } = { ...account };
    const [startDate, setStartDate] = useState(planDateStart ? new Date(planDateStart) : new Date());
    const [endDate, setEndDate] = useState(planDateEnd ? new Date(planDateEnd) : new Date());

    const letsFormat = (d) => {
        const date = new Date(d);
        return (
            date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
        );
    };

    useEffect(() => {
        const { plannerId } = { ...plannerData };
        if (!accountId) {
            alert('로그인이 필요합니다.');
            history.push('/Planners');
        } else if (!plannerId) {
            alert('잘못된 접근입니다.');
            history.push(`/Planners`);
        } else if (planner && nickname !== creator) {
            alert('호스트만 접근할 수 있습니다.');
            history.push('/Planners');
        }
    }, []);

    // 출발 날짜 선택
    const onUpdatePlannerDate = (date) => {
        if (accountId && creator === nickname) {
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
        if (accountId && creator === nickname && plans.length > 0) {
            setEndDate(new Date(new Date(date).setDate(new Date(date).getDate() + 1)));
        }
    };

    // plan 삭제시 날짜 하루 제거
    const onSubDate = (date) => {
        if (accountId && creator === nickname) {
            if (plans.length > 1) {
                setEndDate(new Date(new Date(date).setDate(new Date(date).getDate() - 1)));
            }
        }
    };

    // 출발일, 종료일 업데이트
    useEffect(() => {
        if (planDateStart && planDateEnd) {
            const planDateStart = letsFormat(startDate);
            const planDateEnd = letsFormat(endDate);
            dispatch(
                updatePlannerAction({
                    plannerId,
                    title,
                    planDateStart,
                    planDateEnd,
                    expense,
                    memberCount,
                    memberTypeId,
                }),
            );
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
        if (accountId && creator === nickname) {
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
        if (accountId && creator === nickname) {
            dispatch(deletePlanAction({ plannerId, planId }));
        }
    };

    // 날짜 순서 수정
    const [curPlan, setCurPlan] = useState();
    const onUpdatePlan = (index) => {
        if (accountId && creator === nickname) {
            const planDate = curPlan.planDate;
            const planId = curPlan.planId;

            dispatch(updatePlanAction({ plannerId, planId, planDate, index }));
        }
    };

    // 일정 날짜 최신화
    const [updatePlans, setUpdatePlans] = useState();
    useEffect(() => {
        if (accountId && creator === nickname) {
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
        }
    }, [dispatch, planDateStart, planDateEnd, plannerId, updatePlans]);

    // 로케이션 순서 수정
    const [curLocation, setCurLocation] = useState();
    const onUpdateLocation = (index) => {
        if (accountId && creator === nickname) {
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
            dispatch(
                updateLocationAction({
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
                }),
            );
        }
    };
    const onDeleteLocation = (locationId) => {
        if (accountId && creator === nickname) {
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
        if (plannerId && accountId && creator === nickname) {
            const {
                locationId,
                locationName,
                locationImage,
                locationContentId,
                locationAddr,
                locationMapx,
                locationMapy,
            } = locationData;
            let locationTransportation = trans;
            dispatch(
                updateLocationAction({
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
                }),
            );
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

    if (!planner || nickname !== creator) {
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
