import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurPlannerIdAction, createPlannerAction, loadPlannerAction, resetPlannerDataAction } from '../../../modules/plannerModule';
import MyPlannerList from '../../../components/planner/list/MyPlannerList';
import { loadMyPlannerListAction } from '../../../modules/ProfileModule';

const MyPlannerListContainer = () => {
    const dispatch = useDispatch();
    const { myPlanners, plannerError, planner, account } = useSelector(({ plannerReducer, authReducer, profileReducer }) => ({
        account: authReducer.account,
        myPlanners: profileReducer.myPlanners,
        plannerError: plannerReducer.plannerError,
        planner: plannerReducer.planner,
    }));

    const letsFormat = (d) => {
        const date = new Date(d);
        return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    };

    const { pageLastIndex } = { ...myPlanners };
    const { accountId, nickname } = { ...account };

    useEffect(() => {
        dispatch(resetPlannerDataAction());
    }, [dispatch]);

    const onCreatePlanner = () => {
        let title = `${nickname}의 여행 플래너`;
        let planDateStart = letsFormat(new Date());
        let planDateEnd = letsFormat(new Date());
        let planMembers = [];
        let expense = 0;
        let memberCount = 1;
        let memberTypeId = 1;
        const creator = nickname;

        dispatch(createPlannerAction({ accountId, creator, title, planDateStart, planDateEnd, planMembers, expense, memberCount, memberTypeId }));
    };

    const [pageNum, setPageNum] = useState(1);
    // 나의 플래너리스트 가져오기
    useEffect(() => {
        if (accountId) {
            const itemCount = 10;
            const sortCriteria = 2;
            dispatch(loadMyPlannerListAction({ accountId, pageNum, itemCount, sortCriteria }));
        }
    }, [dispatch, accountId, pageNum]);

    // 플래너 정보 가져오기
    const onLoadPlanner = (plannerId) => {
        dispatch(loadPlannerAction(plannerId));
    };

    const onChangeCurPlannerId = (plannerId) => {
        dispatch(changeCurPlannerIdAction(plannerId));
    };

    // 마지막 페이지
    const maxPage = pageLastIndex;
    // 현재 페이지
    const [page, setPage] = useState(1);

    const onNextPage = () => {
        if (!(page === maxPage)) {
            setPage((index) => index + 1);
        }
    };
    const onPreviousPage = () => {
        if (!(page === 1)) {
            setPage((index) => index - 1);
        }
    };

    useEffect(() => {
        setPageNum(page);
    }, [page]);

    return (
        <MyPlannerList
            myPlanners={myPlanners}
            planner={planner}
            plannerError={plannerError}
            onCreatePlanner={onCreatePlanner}
            onLoadPlanner={onLoadPlanner}
            onChangeCurPlannerId={onChangeCurPlannerId}
            onPreviousPage={onPreviousPage}
            onNextPage={onNextPage}
        />
    );
};

export default MyPlannerListContainer;
