import { useDispatch, useSelector } from 'react-redux';
import EditList from '../../../components/planner/edit/EditList';

const EditListContainer = () => {
    const dispatch = useDispatch();
    const { planner, plannerError } = useSelector(({ plannerReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
    }));
    return <EditList />;
};

export default EditListContainer;
