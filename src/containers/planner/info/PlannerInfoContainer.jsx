import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlannerInfo from '../../../components/planner/info/PlannerInfo';
import {
    changeMapDataAction,
    changeModalDataAction,
    changePlannerDataAction,
    deletePlannerAction,
    DELETE_PLANNER_TYPE,
    loadPlannerAction,
    LOAD_PLANNER_TYPE,
    plannerInitializePropertyAction,
    toggleLikePlannerAction,
    TOGGLE_LIKE_PLANNER_TYPE,
} from '../../../modules/plannerModule';
import { useHistory, useParams } from 'react-router';

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

    // 주소 입력 접근시 plannerData.plannerId 설정
    useEffect(() => {
        dispatch(changePlannerDataAction({ property: 'plannerId', value: params.plannerId }));
    }, [params]);

    // 페이지 접근 제어
    useEffect(() => {
        if (planner === false) {
            history.push('/Planners');
        }
    }, [history, planner, plannerId]);

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
            dispatch(changeModalDataAction({ property: 'member', value: !member }));
            dispatch(plannerInitializePropertyAction('isInvite'));
        }
    };

    // 플래너정보모달 토글.
    const onTogglePlannerInfoModal = () => {
        if (accountId === planner.accountId) {
            dispatch(changeModalDataAction({ property: 'plannerInfo', value: !plannerInfo }));
        }
    };

    // 수정페이지 도달시 맨처음 plannerData.planId 설정.
    useEffect(() => {
        if (planId === '' && plans && plans.length > 0) {
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
        dispatch(plannerInitializePropertyAction('plannerError'));
    };

    useEffect(() => {
        return () => {
            dispatch(plannerInitializePropertyAction('plannerError'));
        };
    }, []);

    useEffect(() => {
        dispatch(changePlannerDataAction({ property: 'pType', value: '' }));
    }, []);

    return (
        <PlannerInfo
            account={account}
            planner={planner}
            plannerData={plannerData}
            drag={drag}
            plannerError={plannerError}
            loading={loading}
            allSchedule={allSchedule}
            onCloseError={onCloseError}
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
