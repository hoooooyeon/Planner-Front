import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlannerInfoModal from '../../components/planner/PlannerInfoModal';
import { togglePlannerInfoModalAction, updatePlannerAction } from '../../modules/plannerModule';

const PlannerInfoModalContainer = () => {
    const dispatch = useDispatch();
    const { planner, plannerError, modal } = useSelector(({ plannerReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
        modal: plannerReducer.modal,
    }));

    const { plannerId, planDateStart, planDateEnd, title, expense, memberCount, memberTypeId } = { ...planner };
    const [curTitle, setCurTitle] = useState(title);
    const [curExpense, setCurExpense] = useState(expense);
    const [curMemberCount, setCurMemberCount] = useState(memberCount);
    const [curMemberTypeId, setCurMemberTypeId] = useState(memberTypeId);

    useEffect(() => {
        setCurTitle(title);
        setCurExpense(expense);
        setCurMemberCount(memberCount);
        setCurMemberTypeId(memberTypeId);
    }, [title, expense, memberCount, memberTypeId, modal]);

    const onUpdatePlanner = () => {
        const title = curTitle;
        const expense = curExpense;
        const memberCount = curMemberCount;
        const memberTypeId = curMemberTypeId;
        dispatch(updatePlannerAction({ plannerId, title, planDateStart, planDateEnd, expense, memberCount, memberTypeId }));
    };

    const onTogglePlannerInfoModal = () => {
        dispatch(togglePlannerInfoModalAction());
    };

    return (
        <PlannerInfoModal
            planner={planner}
            modal={modal}
            onTogglePlannerInfoModal={onTogglePlannerInfoModal}
            onUpdatePlanner={onUpdatePlanner}
            curTitle={curTitle}
            curExpense={curExpense}
            curMemberCount={curMemberCount}
            curMemberTypeId={curMemberTypeId}
            setCurTitle={setCurTitle}
            setCurExpense={setCurExpense}
            setCurMemberCount={setCurMemberCount}
            setCurMemberTypeId={setCurMemberTypeId}
        />
    );
};

export default PlannerInfoModalContainer;
