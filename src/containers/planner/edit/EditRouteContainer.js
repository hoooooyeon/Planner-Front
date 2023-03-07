import { useDispatch, useSelector } from 'react-redux';
import EditRoute from '../../../components/planner/edit/EditRoute';
import { changePlannerDateEndAction, changePlannerDateStartAction, changePlannerExpenseAction, changePlannerMemberCategoryAction, changePlannerMemberCountAction, changePlannerTitleAction } from '../../../modules/plannerModule';

const EditRouteContainer = () => {
    const dispatch = useDispatch();
    const { planner, plannerError } = useSelector(({ plannerReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
    }));

    const onChangePlannerTitle = (title) => {
        dispatch(changePlannerTitleAction(title));
    };
    const onChangePlannerDateStart = (date) => {
        dispatch(changePlannerDateStartAction(date));
    };
    const onChangePlannerDateEnd = (date) => {
        dispatch(changePlannerDateEndAction(date));
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
    return (
        <EditRoute
            planner={planner}
            onChangePlannerTitle={onChangePlannerTitle}
            onChangePlannerDateStart={onChangePlannerDateStart}
            onChangePlannerDateEnd={onChangePlannerDateEnd}
            onChangePlannerExpense={onChangePlannerExpense}
            onChangePlannerMemberCount={onChangePlannerMemberCount}
            onChangePlannerMemberCategory={onChangePlannerMemberCategory}
        />
    );
};

export default EditRouteContainer;
