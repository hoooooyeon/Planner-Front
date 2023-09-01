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

const EditRouteContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    const { planner, plan, plannerData, account } = useSelector(({ authReducer, plannerReducer }) => ({
        planner: plannerReducer.planner,
        plan: plannerReducer.plan,
        plannerData: plannerReducer.plannerData,
        location: plannerReducer.location,
        account: authReducer.account,
    }));

    const { plannerId, plans, title, planDateStart, planDateEnd, expense, memberCount, memberTypeId, creator } = {
        ...planner,
    };
    const { planId } = { ...plannerData };
    const { accountId } = { ...account };
    const [startDate, setStartDate] = useState(planDateStart ? new Date(planDateStart) : new Date());
    const [endDate, setEndDate] = useState(planDateEnd ? new Date(planDateEnd) : new Date());

    // 여행 날짜 변환
    const letsFormat = (d) => {
        const date = new Date(d);
        return (
            date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
        );
    };

    // 페이지 접근 제어
    useEffect(() => {
        if (!accountId) {
            alert('로그인이 필요합니다.');
            history.push('/Planners');
        } else if (planner === false) {
            alert('잘못된 접근입니다.');
            history.push(`/Planners`);
        } else if (Object.keys(planner).length > 0 && accountId !== planner.accountId) {
            alert('호스트만 접근할 수 있습니다.');
            history.push('/Planners');
        }
    }, [history, accountId, account, planner]);

    // 주소 입력 접근시 plannerData.plannerId 설정.
    useEffect(() => {
        dispatch(changeCurPlannerIdAction(params.plannerId));
    }, [dispatch]);

    // 출발 날짜 선택
    const onUpdatePlannerDate = (date) => {
        if (accountId === planner.accountId) {
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
        if (accountId === planner.accountId) {
            setEndDate(new Date(new Date(date).setDate(new Date(date).getDate() + 1)));
        }
    };

    // plan 삭제시 날짜 하루 제거
    const onSubDate = (date) => {
        if (accountId === planner.accountId) {
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

    // 일정 생성
    const onCreatePlan = () => {
        if (accountId === planner.accountId) {
            let planDate;
            if (plans.length > 0) {
                planDate = letsFormat(endDate.setDate(endDate.getDate() + 1));
            } else {
                planDate = letsFormat(endDate);
            }
            dispatch(createPlanAction({ plannerId, planDate }));
        }
    };

    // 일정 삭제
    const onDeletePlan = (planId) => {
        if (accountId === planner.accountId) {
            dispatch(deletePlanAction({ plannerId, planId }));
        }
    };

    // 날짜 순서 수정
    const [curPlan, setCurPlan] = useState();
    const onUpdatePlan = (index) => {
        if (accountId === planner.accountId) {
            const queryString = { plannerId, planId: curPlan.planId, planDate: curPlan.planDate, index };
            dispatch(updatePlanAction(queryString));
        }
    };

    // 일정 날짜 최신화
    const [updatePlans, setUpdatePlans] = useState();
    useEffect(() => {
        if (accountId === planner.accountId) {
            let date = new Date(planDateStart);
            let planDate = letsFormat(date);

            if (plans) {
                for (let i = 0; i < plans.length; i++) {
                    if (i > 0) {
                        planDate = letsFormat(date.setDate(date.getDate() + 1));
                    }
                    const queryString = { plannerId, planId: plans[i].planId, planDate, index: 1024 * (i + 1) };
                    dispatch(updatePlanAction(queryString));
                }
            }
        }
    }, [dispatch, planDateStart, planDateEnd, plannerId, updatePlans, accountId]);

    // 로케이션 순서 수정
    const [curLocation, setCurLocation] = useState();
    const onUpdateLocation = (index) => {
        if (accountId === planner.accountId) {
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

    // 로케이션 삭제
    const onDeleteLocation = (locationId) => {
        if (accountId === planner.accountId) {
            dispatch(deleteLocationAction({ plannerId, locationId, planId }));
        }
    };

    // planner 로드
    useEffect(() => {
        const { plannerId } = plannerData;
        if (plannerId && accountId) {
            dispatch(loadPlannerAction(plannerId));
        }
    }, [dispatch, plannerData]);

    // plan 선택
    const onChangeCurPlanId = (planId) => {
        dispatch(changeCurPlanIdAction(planId));
    };

    // 로케이션의 이동수단 선택
    const onUpdateTrans = (trans, locationData) => {
        if (accountId === planner.accountId) {
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

    // 멤버모달 토글
    const onToggleMemberModal = () => {
        dispatch(toggleMemberModalAction());
    };

    // 플래너정보수정모달 토글
    const onTogglePlannerInfoModal = () => {
        dispatch(togglePlannerInfoModalAction());
    };

    // 드래그시 클론요소 생성 관련 함수
    const [cloneElement, setCloneElement] = useState(false);
    const [cloneElStyle, setCloneElStyle] = useState(0);
    // 클론 생성
    const onCloneElement = () => {
        setCloneElement(true);
    };
    // 클론 삭제
    const onDeleteElement = () => {
        setCloneElement(false);
        setCloneElStyle(0);
    };
    // 클론 요소 위치 설정
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
            if (planId !== '') {
                dispatch(changeCurPlanIdAction(''));
            }
        }
    }, [dispatch, plans]);

    // 일정 루트 보기
    const onClickDateSchedule = () => {
        dispatch(changeAllScheduleAction(false));
    };

    if (Object.keys(planner).length <= 0 || accountId !== planner.accountId) {
        return null;
    }
    return (
        <EditRoute
            planner={planner}
            plan={plan}
            plannerData={plannerData}
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
