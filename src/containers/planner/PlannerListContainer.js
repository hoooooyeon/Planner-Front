import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlannerList from '../../components/planner/list/PlannerList';
import { changeCurPlannerIdAction, changePlannerAccountAction, createPlannerAction, loadMyPlannerListAction, loadPlannerAction, loadSharePlannerListAction } from '../../modules/plannerModule';

const PlannerListContainer = () => {
    const dispatch = useDispatch();
    const { myPlanners, sharePlanners, plannerError, planner, account, currentInfo } = useSelector(({ plannerReducer, authReducer }) => ({
        account: authReducer.account,
        myPlanners: plannerReducer.myPlanners,
        sharePlanners: plannerReducer.sharePlanners,
        plannerError: plannerReducer.plannerError,
        planner: plannerReducer.planner,
        currentInfo: plannerReducer.currentInfo,
    }));

    const letsFormat = (d) => {
        const date = new Date(d);
        return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    };

    // 회원 정보 가져오기
    useEffect(() => {
        if (account) {
            const { accountId, nickname } = account;
            dispatch(changePlannerAccountAction(accountId, nickname));
        }
    }, [dispatch, account]);

    const { accountId, creator } = { ...currentInfo };

    const onCreatePlanner = () => {
        let title = `${creator}의 여행 플래너`;
        let planDateStart = letsFormat(new Date());
        let planDateEnd = letsFormat(new Date());
        let planMembers = [];
        let expense = 0;
        let memberCount = 1;
        let memberTypeId = 1;

        dispatch(createPlannerAction({ accountId, creator, title, planDateStart, planDateEnd, planMembers, expense, memberCount, memberTypeId }));
    };

    // 나의 플래너리스트 가져오기
    useEffect(() => {
        const { accountId } = currentInfo;
        if (accountId) {
            dispatch(loadMyPlannerListAction(accountId));
        }
    }, [dispatch, currentInfo]);

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
    return <PlannerList myPlanners={myPlanners} sharePlanners={sharePlanners} planner={planner} plannerError={plannerError} onCreatePlanner={onCreatePlanner} onLoadPlanner={onLoadPlanner} onChangeCurPlannerId={onChangeCurPlannerId} />;
};

export default PlannerListContainer;
