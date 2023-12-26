import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlannerInfoModal from '../../components/planner/PlannerInfoModal';
import validation from '../../lib/utils/validationCheck';
import {
    changeModalDataAction,
    changePlannerFieldAction,
    plannerInitializePropertyAction,
    updatePlannerAction,
    UPDATE_PLANNER_TYPE,
    plannerValidateFieldAction,
} from '../../modules/plannerModule';

const PlannerInfoModalContainer = () => {
    const dispatch = useDispatch();
    const { planner, plannerError, modal, account, loading, plannerInfoForm } = useSelector(
        ({ plannerReducer, authReducer, loadingReducer }) => ({
            planner: plannerReducer.planner,
            plannerError: plannerReducer.plannerError,
            plannerInfoForm: plannerReducer.plannerInfoForm,
            modal: plannerReducer.modal,
            account: authReducer.account,
            loading: loadingReducer[UPDATE_PLANNER_TYPE],
        }),
    );

    const { accountId } = { ...account };
    const { plannerId, planDateStart, planDateEnd, title, expense, memberCount, memberTypeId, areaCode } = {
        ...planner,
    };
    const { plannerInfo } = { ...modal };

    const onChangeField = (e) => {
        const { name, value } = e.target;
        dispatch(changePlannerFieldAction({ form: 'plannerInfoForm', name: name, value: value }));
    };

    const onChangememberType = (memberType) => {
        dispatch(changePlannerFieldAction({ form: 'plannerInfoForm', name: 'memberTypeId', value: memberType.code }));
    };

    const onUpdatePlanner = () => {
        if (accountId === planner.accountId) {
            const form = { ...plannerInfoForm };
            const validState = validation(form);

            if (Object.keys(validState).length > 0) {
                dispatch(plannerValidateFieldAction(validState));
            } else {
                const { title, expense, memberCount, memberTypeId, areaCode } = { ...plannerInfoForm };

                const queryString = {
                    plannerId,
                    title,
                    planDateStart,
                    planDateEnd,
                    expense,
                    memberCount,
                    memberTypeId,
                    areaCode,
                };
                dispatch(updatePlannerAction(queryString));
                dispatch(plannerInitializePropertyAction('plannerError'));
            }
        }
    };

    useEffect(() => {
        dispatch(changePlannerFieldAction({ form: 'plannerInfoForm', name: 'title', value: title }));
        dispatch(changePlannerFieldAction({ form: 'plannerInfoForm', name: 'expense', value: expense }));
        dispatch(changePlannerFieldAction({ form: 'plannerInfoForm', name: 'memberCount', value: memberCount }));
        dispatch(changePlannerFieldAction({ form: 'plannerInfoForm', name: 'memberTypeId', value: memberTypeId }));
        dispatch(changePlannerFieldAction({ form: 'plannerInfoForm', name: 'areaCode', value: areaCode }));
    }, [plannerInfo]);

    // 플래너정보수정모달 토글
    const onTogglePlannerInfoModal = () => {
        dispatch(changeModalDataAction({ property: 'plannerInfo', value: !plannerInfo }));
    };

    // plannerError 리셋
    const onCloseError = () => {
        dispatch(plannerInitializePropertyAction('plannerError'));
    };

    if (Object.keys(planner).length <= 0) {
        return null;
    }
    return (
        <PlannerInfoModal
            modal={modal}
            plannerInfoForm={plannerInfoForm}
            plannerError={plannerError}
            loading={loading}
            onTogglePlannerInfoModal={onTogglePlannerInfoModal}
            onUpdatePlanner={onUpdatePlanner}
            onChangeField={onChangeField}
            onChangememberType={onChangememberType}
            onCloseError={onCloseError}
        />
    );
};

export default PlannerInfoModalContainer;
