import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurPlannerIdAction, changeMyPageIndexAction, changePlannerAccountAction, createPlannerAction, loadMyPlannerListAction, loadPlannerAction } from '../../../modules/plannerModule';
import * as common from '../../../lib/utils/CommonFunction';
import MyPlannerList from '../../../components/planner/list/MyPlannerList';

const MyPlannerListContainer = () => {
    const dispatch = useDispatch();
    const { myPlanners, plannerError, planner, account, plannerData } = useSelector(({ plannerReducer, authReducer }) => ({
        account: authReducer.account,
        myPlanners: plannerReducer.myPlanners,
        plannerError: plannerReducer.plannerError,
        planner: plannerReducer.planner,
        plannerData: plannerReducer.plannerData,
    }));

    const letsFormat = (d) => {
        const date = new Date(d);
        return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    };

    const { accountId, creator, myPageIndex } = { ...plannerData };
    const { pageLastIndex } = { ...myPlanners };

    // 회원 정보 가져오기
    useEffect(() => {
        if (account) {
            const { accountId, nickname } = account;
            dispatch(changePlannerAccountAction(accountId, nickname));
        }
    }, [dispatch, account]);

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
        if (accountId) {
            dispatch(loadMyPlannerListAction(accountId, myPageIndex));
        }
    }, [dispatch, accountId, myPageIndex]);

    // 플래너 정보 가져오기
    const onLoadPlanner = (plannerId) => {
        dispatch(loadPlannerAction(plannerId));
    };

    const onChangeCurPlannerId = (plannerId) => {
        dispatch(changeCurPlannerIdAction(plannerId));
    };

    const onChangePageIndex = (pageIndex) => {
        dispatch(changeMyPageIndexAction(pageIndex));
    };

    const prevPage = () => {
        common.prevPage(myPageIndex, onChangePageIndex);
    };

    const nextPage = () => {
        common.nextPage(myPageIndex, pageLastIndex, onChangePageIndex);
    };

    return (
        <MyPlannerList
            myPlanners={myPlanners}
            planner={planner}
            plannerError={plannerError}
            onCreatePlanner={onCreatePlanner}
            onLoadPlanner={onLoadPlanner}
            onChangeCurPlannerId={onChangeCurPlannerId}
            prevPage={prevPage}
            nextPage={nextPage}
        />
    );
};

export default MyPlannerListContainer;
