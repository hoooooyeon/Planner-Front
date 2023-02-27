import { useDispatch, useSelector } from 'react-redux';
import EditRoute from '../../../components/planner/edit/EditRoute';
import { updatePlannerDateEndAction, updatePlannerDateStartAction, updatePlannerTitleAction } from '../../../modules/plannerModule';

const EditRouteContainer = () => {
    const dispatch = useDispatch();
    const { planner, plannerError } = useSelector(({ plannerReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
    }));

    const onUpdatePlannerTitle = (title) => {
        dispatch(updatePlannerTitleAction(title));
    };
    const onUpdatePlannerDateStart = (date) => {
        dispatch(updatePlannerDateStartAction(date));
    };
    const onUpdatePlannerDateEnd = (date) => {
        dispatch(updatePlannerDateEndAction(date));
    };
    return <EditRoute planner={planner} onUpdatePlannerTitle={onUpdatePlannerTitle} onUpdatePlannerDateStart={onUpdatePlannerDateStart} onUpdatePlannerDateEnd={onUpdatePlannerDateEnd} />;
};

export default EditRouteContainer;
