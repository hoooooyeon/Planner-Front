import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlannerInfo from '../../../components/planner/info/PlannerInfo';
import {
    changeCurPlanIdAction,
    changeCurPlannerIdAction,
    changeMapDataAction,
    changeModalDataAction,
    changePlannerDataAction,
    deletePlannerAction,
    DELETE_PLANNER_TYPE,
    loadPlannerAction,
    LOAD_PLANNER_TYPE,
    plannerInitializePropertyAction,
    resetPlannerErrorAction,
    toggleLikePlannerAction,
    toggleMemberModalAction,
    togglePlannerInfoModalAction,
    TOGGLE_LIKE_PLANNER_TYPE,
} from '../../../modules/plannerModule';
import circleImg from '../../../lib/images/circle.png';
import { useHistory, useLocation, useParams } from 'react-router';

const PlannerInfoContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    const { planner, plannerError, plannerData, modal, loading, mapData, account } = useSelector(
        ({ plannerReducer, authReducer, loadingReducer }) => ({
            planner: plannerReducer.planner,
            plannerError: plannerReducer.plannerError,
            plannerData: plannerReducer.plannerData,
            modal: plannerReducer.modal,
            account: authReducer.account,
            mapData: plannerReducer.mapData,
            loading: {
                plannerLoading: loadingReducer[LOAD_PLANNER_TYPE],
                deletePlannerLoading: loadingReducer[DELETE_PLANNER_TYPE],
                likePlannerLoading: loadingReducer[TOGGLE_LIKE_PLANNER_TYPE],
            },
        }),
    );

    const { plans } = { ...planner };
    const { plannerId, planId } = { ...plannerData };
    const { accountId } = { ...account };
    const { allSchedule } = { ...mapData };
    const { plannerInfo, member } = { ...modal };

    // 페이지 접근 제어
    useEffect(() => {
        if (planner === false) {
            history.push('/Planners');
        }
    }, [history, planner, plannerId]);

    // 주소 입력 접근시 plannerData.plannerId 설정
    useEffect(() => {
        // dispatch(changeCurPlannerIdAction(params.plannerId));
        dispatch(changePlannerDataAction({ property: 'plannerId', value: params.plannerId }));
        // dispatch(changePlannerDataAction({ property: 'pType', value: 1 }));
    }, [params]);

    // 플래너 삭제
    const onDeletePlanner = () => {
        if (accountId === planner.accountId) {
            dispatch(deletePlannerAction(plannerId));
        }
    };

    // 플래너수정페이지로 이동.
    const onClickEditPlanner = () => {
        history.push(`/Planners/edit/${plannerId}`);
    };

    // 멤버수정모달 토글.
    const onToggleMemberModal = () => {
        if (accountId === planner.accountId) {
            // dispatch(toggleMemberModalAction());

            dispatch(changeModalDataAction({ property: 'member', value: !member }));
            dispatch(plannerInitializePropertyAction('isInvite'));
        }
    };

    // 플래너정보모달 토글.
    const onTogglePlannerInfoModal = () => {
        if (accountId === planner.accountId) {
            // dispatch(togglePlannerInfoModalAction());
            dispatch(changeModalDataAction({ property: 'plannerInfo', value: !plannerInfo }));
        }
    };

    // 수정페이지 도달시 맨처음 plannerData.planId 설정.
    useEffect(() => {
        if (planId === '' && plans && plans.length > 0) {
            // dispatch(changeCurPlanIdAction(plans[0].planId));
            dispatch(changePlannerDataAction({ property: 'planId', value: plans[0].planId }));
        }
    }, [dispatch, plans, planId]);

    // planner 로드
    useEffect(() => {
        if (plannerId !== '') {
            dispatch(loadPlannerAction(plannerId));
        }
    }, [dispatch, plannerData]);

    // plan 선택
    const drag = useRef(false);
    const onChangeCurPlanId = (planId) => {
        if (!drag.current) {
            // dispatch(changeCurPlanIdAction(planId));
            dispatch(changePlannerDataAction({ property: 'planId', value: planId }));
        }
    };

    // 플래너 좋아요 토글
    const onToggleLikePlanner = () => {
        dispatch(toggleLikePlannerAction(plannerId));
    };

    const handleToggleScheduleView = (bool) => {
        dispatch(changeMapDataAction({ property: 'allSchedule', value: bool }));
    };

    // plannerError 리셋
    const onCloseError = () => {
        dispatch(resetPlannerErrorAction());
    };

    useEffect(() => {
        return () => {
            dispatch(resetPlannerErrorAction());
        };
    }, []);

    useEffect(() => {
        dispatch(changePlannerDataAction({ property: 'pType', value: '' }));
    }, []);

    // if (Object.keys(planner).length <= 0) {
    //     return null;
    // }
    return (
        <PlannerInfo
            account={account}
            planner={planner}
            plannerData={plannerData}
            // mapRef={mapRef}
            drag={drag}
            plannerError={plannerError}
            loading={loading}
            allSchedule={allSchedule}
            onCloseError={onCloseError}
            // onClickToggleMapSchedule={onClickToggleMapSchedule}
            onClickToggleScheduleView={handleToggleScheduleView}
            onDeletePlanner={onDeletePlanner}
            onToggleMemberModal={onToggleMemberModal}
            onTogglePlannerInfoModal={onTogglePlannerInfoModal}
            onChangeCurPlanId={onChangeCurPlanId}
            onToggleLikePlanner={onToggleLikePlanner}
            onClickEditPlanner={onClickEditPlanner}
        />
    );
};

export default PlannerInfoContainer;
