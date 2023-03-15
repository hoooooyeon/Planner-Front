import { useDispatch, useSelector } from 'react-redux';
import PlannerInfoModal from '../../components/planner/PlannerInfoModal';
import { changePlannerExpenseAction, changePlannerMemberCategoryAction, changePlannerMemberCountAction, changePlannerTitleAction, loadPlannerAction, togglePlannerInfoModalAction, updatePlannerAction } from '../../modules/plannerModule';

const PlannerInfoModalContainer = () => {
    const dispatch = useDispatch();
    const { planner, plannerError, modal } = useSelector(({ plannerReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
        modal: plannerReducer.modal,
    }));

    const { plannerId, title, planDateStart, planDateEnd, expense, memberCount, memberTypeId } = planner;

    const onUpdatePlanner = () => {
        dispatch(updatePlannerAction({ plannerId, title, planDateStart, planDateEnd, expense, memberCount, memberTypeId }));
    };

    const onChangePlannerTitle = (title) => {
        dispatch(changePlannerTitleAction(title));
    };
    const onChangePlannerExpense = (expense) => {
        dispatch(changePlannerExpenseAction(expense));
    };
    const onChangePlannerMemberCount = (count) => {
        dispatch(changePlannerMemberCountAction(count));
    };
    const onChangePlannerMemberCategory = (memberTypeId) => {
        dispatch(changePlannerMemberCategoryAction(memberTypeId));
    };

    const onTogglePlannerInfoModal = () => {
        dispatch(togglePlannerInfoModalAction());
    };

    // 플래너 정보 가져오기
    const onLoadPlanner = (plannerId) => {
        dispatch(loadPlannerAction(plannerId));
    };

    return (
        <PlannerInfoModal
            planner={planner}
            modal={modal}
            onChangePlannerExpense={onChangePlannerExpense}
            onChangePlannerMemberCategory={onChangePlannerMemberCategory}
            onChangePlannerMemberCount={onChangePlannerMemberCount}
            onChangePlannerTitle={onChangePlannerTitle}
            onTogglePlannerInfoModal={onTogglePlannerInfoModal}
            onUpdatePlanner={onUpdatePlanner}
            onLoadPlanner={onLoadPlanner}
        />
    );
};

export default PlannerInfoModalContainer;
