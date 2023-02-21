import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlannerList from '../../components/planner/list/PlannerList';
import { loadSharePlannerAction } from '../../modules/plannerModule';

const PlannerListContainer = () => {
    const dispatch = useDispatch();
    const { planners, plannerError } = useSelector(({ plannerReducer }) => ({
        planners: plannerReducer.planners,
        plannerError: plannerReducer.plannerError,
    }));
    useEffect(() => {
        dispatch(loadSharePlannerAction());
    }, [dispatch]);
    return <PlannerList planners={planners} />;
};

export default PlannerListContainer;
