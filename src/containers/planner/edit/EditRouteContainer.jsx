import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import EditRoute from '../../../components/planner/edit/EditRoute';
import {
    changeCurPlanIdAction,
    changeCurPlannerIdAction,
    changeMapDataAction,
    changeModalDataAction,
    changePlannerDataAction,
    createPlanAction,
    CREATE_LOCATION_TYPE,
    CREATE_PLAN_TYPE,
    deleteLocationAction,
    deletePlanAction,
    DELETE_LOCATION_TYPE,
    DELETE_PLAN_TYPE,
    loadPlannerAction,
    LOAD_PLANNER_TYPE,
    plannerInitializePropertyAction,
    toggleMemberModalAction,
    togglePlannerInfoModalAction,
    updateLocationAction,
    updatePlanAction,
    updatePlannerAction,
    UPDATE_LOCATION_TYPE,
    UPDATE_PLANNER_TYPE,
    UPDATE_PLAN_TYPE,
} from '../../../modules/plannerModule';

const EditRouteContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    const { planner, plan, plannerData, modal, account, loading, mapData } = useSelector(
        ({ authReducer, plannerReducer, loadingReducer }) => ({
            planner: plannerReducer.planner,
            plan: plannerReducer.plan,
            plannerData: plannerReducer.plannerData,
            modal: plannerReducer.mdoal,
            location: plannerReducer.location,
            account: authReducer.account,
            mapData: plannerReducer.mapData,
            loading: {
                createLocationLoading: loadingReducer[CREATE_LOCATION_TYPE],
                deleteLocationLoading: loadingReducer[DELETE_LOCATION_TYPE],
                updateLocationLoading: loadingReducer[UPDATE_LOCATION_TYPE],
                createPlanLoading: loadingReducer[CREATE_PLAN_TYPE],
                deletePlanLoading: loadingReducer[DELETE_PLAN_TYPE],
                updatePlanLoading: loadingReducer[UPDATE_PLAN_TYPE],
                updatePlannerLoading: loadingReducer[UPDATE_PLANNER_TYPE],
                plannerLoading: loadingReducer[LOAD_PLANNER_TYPE],
            },
        }),
    );

    const { plannerId, plans, title, planDateStart, planDateEnd, expense, memberCount, memberTypeId, creator } = {
        ...planner,
    };
    const { planId } = { ...plannerData };
    const { accountId } = { ...account };
    const { allSchedule, navRoute, tutorial } = { ...mapData };
    const [startDate, setStartDate] = useState(planDateStart ? new Date(planDateStart) : new Date());
    const [endDate, setEndDate] = useState(planDateEnd ? new Date(planDateEnd) : new Date());
    const { plannerInfo, member } = { ...modal };

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
            history.push('/Planners');
        } else if (planner === false) {
            history.push(`/Planners/${params.plannerId}`);
        } else if (Object.keys(planner).length > 0 && accountId !== planner.accountId) {
            history.push(`/Planners/${params.plannerId}`);
        }
    }, [history, accountId, account, planner]);

    // 주소 입력 접근시 plannerData.plannerId 설정.
    useEffect(() => {
        // dispatch(changeCurPlannerIdAction(params.plannerId));
        dispatch(changePlannerDataAction({ property: 'plannerId', value: params.plannerId }));
        // dispatch(changePlannerDataAction({ property: 'pType', value: 1 }));
    }, [dispatch, params]);

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
        // dispatch(changeCurPlanIdAction(planId));
        dispatch(changePlannerDataAction({ property: 'planId', value: planId }));
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
        // dispatch(toggleMemberModalAction());

        dispatch(changeModalDataAction({ property: 'member', value: !member }));
        dispatch(plannerInitializePropertyAction('isInvite'));
    };

    // 플래너정보수정모달 토글
    const onTogglePlannerInfoModal = () => {
        // dispatch(togglePlannerInfoModalAction());
        dispatch(changeModalDataAction({ property: 'plannerInfo', value: !plannerInfo }));
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
                // dispatch(changeCurPlanIdAction(plans[0].planId));
                dispatch(changePlannerDataAction({ property: 'planId', value: plans[0].planId }));
            }
        } else {
            if (planId !== '') {
                // dispatch(changeCurPlanIdAction(''));
                dispatch(changePlannerDataAction({ property: 'planId', value: '' }));
            }
        }
    }, [dispatch, plans]);

    // 일정 루트 보기
    const onClickDateSchedule = () => {
        dispatch(changeMapDataAction({ property: 'allSchedule', value: false }));
    };

    const onClickAllSchedule = () => {
        dispatch(changeMapDataAction({ property: 'allSchedule', value: !allSchedule }));
    };

    // 튜토리얼모달 토글
    const onClickTutorialModal = () => {
        dispatch(changeMapDataAction({ property: 'tutorial', value: !tutorial }));
    };

    // 일정 저장 버튼
    const onSavePlanner = () => {
        history.push(`/Planners/${plannerId}`);
    };

    // window Route Nav 토글
    const onToggleWindowNavRoute = (bool) => {
        dispatch(changeMapDataAction({ property: 'navRoute', value: bool }));
    };

    // if (Object.keys(planner).length <= 0 || accountId !== planner.accountId) {
    //     return null;
    // }
    return (
        <EditRoute
            planner={planner}
            plan={plan}
            plannerData={plannerData}
            startDate={startDate}
            endDate={endDate}
            loading={loading}
            mapData={mapData}
            allSchedule={allSchedule}
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
            onSavePlanner={onSavePlanner}
            onClickTutorialModal={onClickTutorialModal}
            onClickAllSchedule={onClickAllSchedule}
            onToggleWindowNavRoute={onToggleWindowNavRoute}
        />
    );
};

export default EditRouteContainer;
