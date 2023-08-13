import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadSharePlannerListAction, resetPlannerDataAction } from '../modules/plannerModule';
import Home from '../components/home/Home';

const HomeContainer = () => {
    const dispatch = useDispatch();
    const { sharePlanners } = useSelector(({ plannerReducer }) => ({
        sharePlanners: plannerReducer.sharePlanners,
    }));

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

    return <Home sharePlanners={sharePlanners} />;
};

export default HomeContainer;
