import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditRoute from '../../../components/planner/edit/EditRoute';
import {
    changePlannerDateEndAction,
    changePlannerDateStartAction,
    changePlannerExpenseAction,
    changePlannerMemberCategoryAction,
    changePlannerMemberCountAction,
    changePlannerTitleAction,
    loadPlannerAction,
} from '../../../modules/plannerModule';

const EditRouteContainer = () => {
    const dispatch = useDispatch();
    const { planner, plannerError } = useSelector(({ plannerReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
    }));

    const onChangePlannerDateStart = (date) => {
        dispatch(changePlannerDateStartAction(date));
    };
    const onChangePlannerDateEnd = (date) => {
        dispatch(changePlannerDateEndAction(date));
    };

    // // 플래너 정보 가져오기
    // useEffect(() => {
    //     dispatch(loadPlannerAction(planner.plannerId));
    // });

    return <EditRoute planner={planner} onChangePlannerDateStart={onChangePlannerDateStart} onChangePlannerDateEnd={onChangePlannerDateEnd} />;
};

export default EditRouteContainer;
