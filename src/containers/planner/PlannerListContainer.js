import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlannerList from '../../components/planner/list/PlannerList';
import { changeCurPlannerIdAction, changePlannerAccountAction, changePlannerIdAction, createPlannerAction, loadPlannerAction, loadSharePlannerListAction } from '../../modules/plannerModule';

const PlannerListContainer = () => {
    const dispatch = useDispatch();
    const { sharePlanners, plannerError, planner, account } = useSelector(({ plannerReducer, authReducer }) => ({
        account: authReducer.account,
        sharePlanners: plannerReducer.sharePlanners,
        plannerError: plannerReducer.plannerError,
        planner: plannerReducer.planner,
    }));

    // 회원 정보 가져오기
    useEffect(() => {
        if (account) {
            const { accountId, nickname } = account;
            dispatch(changePlannerAccountAction(accountId, nickname));
        }
    }, [dispatch, account]);

    const onCreatePlanner = () => {
        if (account) {
            const { accountId, creator, title, planDateStart, planDateEnd, planMembers, expense, memberCount, memberTypeId } = planner;

            dispatch(createPlannerAction({ accountId, creator, title, planDateStart, planDateEnd, planMembers, expense, memberCount, memberTypeId }));
        }
    };

    // 공유 플래너리스트 가져오기
    useEffect(() => {
        dispatch(loadSharePlannerListAction());
    }, [dispatch]);

    // 플래너 정보 가져오기
    const onLoadPlanner = (plannerId) => {
        dispatch(loadPlannerAction(plannerId));
    };

    const onChangeCurPlannerId = (plannerId) => {
        dispatch(changeCurPlannerIdAction(plannerId));
    };
    return <PlannerList onCreatePlanner={onCreatePlanner} sharePlanners={sharePlanners} planner={planner} onLoadPlanner={onLoadPlanner} plannerError={plannerError} onChangeCurPlannerId={onChangeCurPlannerId} />;
};

export default PlannerListContainer;
