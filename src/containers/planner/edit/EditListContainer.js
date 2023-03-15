import { useDispatch, useSelector } from 'react-redux';
import EditList from '../../../components/planner/edit/EditList';
import { updatePlan } from '../../../lib/api/plannerAPI';

const EditListContainer = () => {
    const dispatch = useDispatch();
    const { planner, plannerError, spots } = useSelector(({ plannerReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
        spots: plannerReducer.spots,
    }));

    const onUpdatePlan = () => {
        dispatch(updatePlan(planner.plannerId));
    };
    return <EditList spots={spots} onUpdatePlan={onUpdatePlan} />;
};

export default EditListContainer;
