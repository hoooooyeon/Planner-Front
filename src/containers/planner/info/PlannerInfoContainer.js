import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlannerInfo from '../../../components/planner/info/PlannerInfo';
import { deletePlannerAction, loadPlannerAction } from '../../../modules/plannerModule';

const PlannerInfoContainer = () => {
    const dispatch = useDispatch();
    const { planner, plannerError } = useSelector(({ plannerReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
    }));

    // 플래너 정보 가져오기
    // useEffect(() => {
    //     if (planner.plannerId) {
    //         dispatch(loadPlannerAction(planner.plannerId));
    //     }
    // }, [dispatch, planner.plannerId, planner.planMemos]);

    const onDeletePlanner = () => {
        dispatch(deletePlannerAction(planner.plannerId));
    };

    return <PlannerInfo planner={planner} onDeletePlanner={onDeletePlanner} />;
};

export default PlannerInfoContainer;
