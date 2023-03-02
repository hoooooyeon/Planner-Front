import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlannerList from '../../components/planner/list/PlannerList';
import { changePlannerAccountAction, loadPlannerAction, loadSharePlannerListAction, resetPlannerInfoFormAction } from '../../modules/plannerModule';

const PlannerListContainer = () => {
    const dispatch = useDispatch();
    const { sharePlanners, plannerError, planner, account } = useSelector(({ plannerReducer, authReducer }) => ({
        account: authReducer.account,
        sharePlanners: plannerReducer.sharePlanners,
        plannerError: plannerReducer.plannerError,
        planner: plannerReducer.planner,
    }));

    useEffect(() => {
        if (account) {
            const { accountId, nickname } = account;
            dispatch(changePlannerAccountAction(accountId, nickname));
        }
    }, [dispatch, account]);

    // 공유 플래너리스트 가져오기
    useEffect(() => {
        dispatch(loadSharePlannerListAction());
    }, [dispatch]);

    // 플래너 정보 가져오기
    const onLoadPlanner = (plannerId) => {
        dispatch(loadPlannerAction(plannerId));
    };

    // 플래너 정보폼 초기화(planner 초기화)
    const onResetPlannerInfoForm = () => {
        dispatch(resetPlannerInfoFormAction());
    };

    return <PlannerList sharePlanners={sharePlanners} planner={planner} onLoadPlanner={onLoadPlanner} plannerError={plannerError} onResetPlannerInfoForm={onResetPlannerInfoForm} />;
};

export default PlannerListContainer;
