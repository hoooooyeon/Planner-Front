import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlannerInfoModal from '../../components/planner/PlannerInfoModal';
import {
    resetPlannerErrorAction,
    togglePlannerInfoModalAction,
    updatePlannerAction,
} from '../../modules/plannerModule';

const PlannerInfoModalContainer = () => {
    const dispatch = useDispatch();
    const { planner, plannerError, modal, account } = useSelector(({ plannerReducer, authReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
        modal: plannerReducer.modal,
        account: authReducer.account,
    }));

    const { accountId } = { ...account };
    const { plannerId, planDateStart, planDateEnd, title, expense, memberCount, memberTypeId, creator } = {
        ...planner,
    };
    const [curTitle, setCurTitle] = useState(title);
    const [curExpense, setCurExpense] = useState(expense);
    const [curMemberCount, setCurMemberCount] = useState(memberCount);
    const [curMemberTypeId, setCurMemberTypeId] = useState(memberTypeId);

    const onChangeExpense = (keyword) => {
        const regex = /^[0-9]+$/;

        if (regex.test(keyword) || keyword === '') {
            setCurExpense(keyword);
        }
    };

    const onChangeMemberCount = (keyword) => {
        const regex = /^[0-9]+$/;

        if (regex.test(keyword) || keyword === '') {
            setCurMemberCount(keyword);
        }
    };

    useEffect(() => {
        setCurTitle(title);
        setCurExpense(expense);
        setCurMemberCount(memberCount);
        setCurMemberTypeId(memberTypeId);
    }, [modal]);

    // 플래너 수정
    const onUpdatePlanner = () => {
        if (accountId === planner.accountId) {
            const queryString = {
                plannerId,
                title: curTitle,
                planDateStart,
                planDateEnd,
                expense: curExpense,
                memberCount: curMemberCount,
                memberTypeId: curMemberTypeId,
            };
            dispatch(updatePlannerAction(queryString));
        }
    };

    // 플래너정보수정모달 토글
    const onTogglePlannerInfoModal = () => {
        dispatch(togglePlannerInfoModalAction());
    };

    // plannerError 리셋
    const onCloseError = () => {
        dispatch(resetPlannerErrorAction());
    };

    if (Object.keys(planner).length <= 0) {
        return null;
    }
    return (
        <PlannerInfoModal
            modal={modal}
            plannerError={plannerError}
            onTogglePlannerInfoModal={onTogglePlannerInfoModal}
            onUpdatePlanner={onUpdatePlanner}
            curTitle={curTitle}
            curExpense={curExpense}
            curMemberCount={curMemberCount}
            curMemberTypeId={curMemberTypeId}
            setCurTitle={setCurTitle}
            onChangeExpense={onChangeExpense}
            onChangeMemberCount={onChangeMemberCount}
            setCurMemberTypeId={setCurMemberTypeId}
            onCloseError={onCloseError}
        />
    );
};

export default PlannerInfoModalContainer;
