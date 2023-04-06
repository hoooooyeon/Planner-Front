import { useDispatch, useSelector } from 'react-redux';
import EditList from '../../../components/planner/edit/EditList';
import { changePlanLocationAction, createLocationAction } from '../../../modules/plannerModule';

const EditListContainer = () => {
    const dispatch = useDispatch();
    const { planner, plannerError, spots, plan, currentInfo } = useSelector(({ plannerReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
        spots: plannerReducer.spots,
        plan: plannerReducer.plan,
        currentInfo: plannerReducer.currentInfo,
    }));

    const onChangePlanLocation = (location) => {
        dispatch(changePlanLocationAction(location));
    };

    const { plannerId } = planner;
    const onCreateLocation = (spot) => {
        if (currentInfo) {
            const { planId } = currentInfo;
            const { contentid, firstimage, firstimage2 } = spot;
            const locationImage = firstimage !== '' ? firstimage : firstimage2;
            const locationTransportation = 1;
            dispatch(createLocationAction({ plannerId, contentid, locationImage, locationTransportation, planId }));
        }
    };

    return <EditList spots={spots} onChangePlanLocation={onChangePlanLocation} onCreateLocation={onCreateLocation} />;
};

export default EditListContainer;
