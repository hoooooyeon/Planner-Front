import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlannerList from '../../components/planner/list/PlannerList';
import { loadPlannerAction, loadSharePlannerListAction } from '../../modules/plannerModule';

const PlannerListContainer = () => {
    const dispatch = useDispatch();
    const { sharePlanners, plannerError, planner } = useSelector(({ plannerReducer }) => ({
        sharePlanners: plannerReducer.sharePlanners,
        plannerError: plannerReducer.plannerError,
        planner: plannerReducer.planner,
    }));

    // 공유 플래너리스트 가져오기
    useEffect(() => {
        dispatch(loadSharePlannerListAction());
    }, [dispatch]);

    // 플래너 정보 가져오기
    const onLoadPlanner = (plannerId) => {
        dispatch(loadPlannerAction(plannerId));
    };

    return <PlannerList sharePlanners={sharePlanners} planner={planner} onLoadPlanner={onLoadPlanner} />;
};

export default PlannerListContainer;
