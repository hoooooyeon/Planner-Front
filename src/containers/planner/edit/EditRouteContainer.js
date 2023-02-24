import { useDispatch, useSelector } from 'react-redux';
import EditRoute from '../../../components/planner/edit/EditRoute';

const EditRouteContainer = () => {
    const dispatch = useDispatch();
    const { planner, plannerError } = useSelector(({ plannerReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
    }));

    const onChangePlannerTitle = (title) => {
        dispatch(onChangePlannerTitle(title));
    };

    return <EditRoute onChangePlannerTitle={onChangePlannerTitle} />;
};

export default EditRouteContainer;
