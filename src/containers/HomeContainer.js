import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurPlannerIdAction, loadSharePlannerListAction, resetPlannerDataAction } from '../modules/plannerModule';
import Home from '../components/home/Home';
import { useHistory } from 'react-router';

const HomeContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { sharePlanners, planner, plannerData, pType } = useSelector(({ plannerReducer }) => ({
        sharePlanners: plannerReducer.sharePlanners,
        planner: plannerReducer.planner,
        plannerData: plannerReducer.plannerData,
        pType: plannerReducer.pType,
    }));

    const { plannerId } = { ...plannerData };

    const onClickPlanner = (plannerId) => {
        dispatch(changeCurPlannerIdAction(plannerId));
    };

    // 공유 플래너리스트 가져오기
    useEffect(() => {
        const itemCount = 4;
        const pageNum = 1;
        const sortCriteria = 1;
        const keyword = '';
        dispatch(loadSharePlannerListAction({ keyword, itemCount, sortCriteria, pageNum }));
    }, [dispatch]);

    useEffect(() => {
        dispatch(resetPlannerDataAction());
    }, [dispatch]);

    useEffect(() => {
        if (!planner && plannerId && pType === 1) {
            history.push(`/Planners/${plannerId}`);
        }
    }, [plannerId]);

    return <Home sharePlanners={sharePlanners} onClickPlanner={onClickPlanner} />;
};

export default HomeContainer;
