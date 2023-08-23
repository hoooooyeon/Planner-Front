import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    changeCurPlannerIdAction,
    loadSharePlannerListAction,
    resetPlannerDataAction,
    resetSharePlannerListAction,
} from '../modules/plannerModule';
import Home from '../components/home/Home';
import { useHistory } from 'react-router';

const HomeContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { sharePlanners, planner, plannerData, pType, loading } = useSelector(
        ({ plannerReducer, loadingReducer }) => ({
            sharePlanners: plannerReducer.sharePlanners,
            planner: plannerReducer.planner,
            plannerData: plannerReducer.plannerData,
            pType: plannerReducer.pType,
            loading: loadingReducer.loading,
        }),
    );

    const { plannerId } = { ...plannerData };

    // 플래너 선택
    const onClickPlanner = (plannerId) => {
        dispatch(changeCurPlannerIdAction(plannerId));
    };

    // 공유 플래너리스트 가져오기
    useEffect(() => {
        const queryString = { itemCount: 4, sortCriteria: 1, pageNum: 1 };
        dispatch(loadSharePlannerListAction(queryString));
    }, [dispatch]);

    // 주소 이동
    useEffect(() => {
        if (planner !== false && Object.keys(planner).length <= 0 && plannerId && pType === 1) {
            history.push(`/Planners/${plannerId}`);
        }
    }, [plannerId]);

    // plannerData, sharePlanners 리셋
    useEffect(() => {
        dispatch(resetPlannerDataAction());
        return () => {
            dispatch(resetSharePlannerListAction());
        };
    }, [dispatch]);

    return <Home sharePlanners={sharePlanners} loading={loading} onClickPlanner={onClickPlanner} />;
};

export default HomeContainer;
