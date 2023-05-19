import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurPlannerIdAction, changeMyPageIndexAction, changePlannerAccountAction, createPlannerAction, loadMyPlannerListAction, loadPlannerAction, loadSharePlannerListAction } from '../../../modules/plannerModule';
import ShareList from '../../../components/planner/list/ShareList';

const ShareListContainer = () => {
    const dispatch = useDispatch();
    const { sharePlanners, plannerError, planner, account, plannerData } = useSelector(({ plannerReducer, authReducer }) => ({
        sharePlanners: plannerReducer.sharePlanners,
        plannerError: plannerReducer.plannerError,
        planner: plannerReducer.planner,
        account: authReducer.account,
        plannerData: plannerReducer.plannerData,
    }));

    // 공유 플래너리스트 가져오기
    const { sharePageIndex } = { ...plannerData };
    useEffect(() => {
        if (account) {
            dispatch(loadSharePlannerListAction(sharePageIndex));
        }
    }, [dispatch, sharePageIndex, account]);

    // 플래너 정보 가져오기
    const onLoadPlanner = (plannerId) => {
        dispatch(loadPlannerAction(plannerId));
    };

    const onChangeCurPlannerId = (plannerId) => {
        dispatch(changeCurPlannerIdAction(plannerId));
    };

    return <ShareList sharePlanners={sharePlanners} planner={planner} plannerError={plannerError} onLoadPlanner={onLoadPlanner} onChangeCurPlannerId={onChangeCurPlannerId} />;
};

export default ShareListContainer;
