import { useDispatch, useSelector } from 'react-redux';
import EditRoute from '../../../components/planner/edit/EditRoute';
import { changePlannerDateEndAction, changePlannerDateStartAction, changePlannerTitleAction } from '../../../modules/plannerModule';

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

    return <EditRoute planner={planner} onChangePlannerTitle={onChangePlannerTitle} onChangePlannerDateStart={onChangePlannerDateStart} onChangePlannerDateEnd={onChangePlannerDateEnd} />;
};

export default EditRouteContainer;
