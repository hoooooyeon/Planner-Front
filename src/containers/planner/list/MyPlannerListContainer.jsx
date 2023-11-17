import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    changeCurPlannerIdAction,
    createPlannerAction,
    CREATE_PLANNER_TYPE,
    resetPlannerDataAction,
} from '../../../modules/plannerModule';
import MyPlannerList from '../../../components/planner/list/MyPlannerList';
import { useHistory } from 'react-router';
import {
    accountMyPlannerListLoadAction,
    ACCOUNT_MY_PLANNER_LIST_LOAD_TYPE,
    changeMyPlannerListPageIndexAction,
    initializeErrorAction,
    initializeFormAction,
} from '../../../modules/accountModule';

const MyPlannerListContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { myPlannerList, accountError, loading, planner, pType, plannerData, account } = useSelector(
        ({ plannerReducer, authReducer, accountReducer, loadingReducer }) => ({
            account: authReducer.account,
            myPlannerList: accountReducer.myPlannerList,
            accountError: accountReducer.accountError,
            planner: plannerReducer.planner,
            plannerData: plannerReducer.plannerData,
            pType: plannerReducer.pType,
            loading: {
                myPlannersLoading: loadingReducer[ACCOUNT_MY_PLANNER_LIST_LOAD_TYPE],
                createPlannerLoading: loadingReducer[CREATE_PLANNER_TYPE],
            },
        }),
    );

    const { plannerId } = { ...plannerData };
    const { totalCount } = { ...myPlannerList };
    const { accountId, nickname } = { ...account };
    const drag = useRef(false);
    const pageLastIndex = Math.ceil(totalCount / 10) || 0;

    // 날짜데이터 형식 변환.
    const letsFormat = (d) => {
        const date = new Date(d);
        return (
            date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
        );
    };

    // 데이터 리셋
    useEffect(() => {
        dispatch(resetPlannerDataAction());
        return () => {
            dispatch(initializeFormAction('myPlannerList'));
            dispatch(initializeErrorAction());
        };
    }, [dispatch]);

    // 플래너 생성
    const onCreatePlanner = () => {
        const queryString = {
            accountId,
            creator: nickname,
            title: `${nickname}의 여행 플래너`,
            planDateStart: letsFormat(new Date()),
            planDateEnd: letsFormat(new Date()),
            planMembers: [],
            expense: 0,
            memberCount: 1,
            memberTypeId: 1,
        };
        dispatch(createPlannerAction(queryString));
    };

    // 플래너 선택
    const onClickPlanner = (plannerId) => {
        if (!drag.current) {
            dispatch(resetPlannerDataAction());
            dispatch(changeCurPlannerIdAction(plannerId));
        }
    };

    // 주소 이동
    useEffect(() => {
        if (planner !== false && Object.keys(planner).length <= 0 && plannerId && pType === 2) {
            history.push(`/Planners/edit/${plannerId}`);
        } else if (planner !== false && Object.keys(planner).length <= 0 && plannerId && pType === 1) {
            history.push(`/Planners/${plannerId}`);
        }
    }, [plannerId]);

    // 나의 플래너리스트 가져오기
    const [pageNum, setPageNum] = useState(1);
    useEffect(() => {
        if (accountId) {
            dispatch(initializeFormAction('myPlannerList'));
            const queryString = { accountId, pageNum, itemCount: 10, sortCriteria: 2 };

            dispatch(accountMyPlannerListLoadAction(queryString));
        }
    }, [dispatch, accountId, pageNum]);

    // accountError 리셋
    const onCloseError = () => {
        dispatch(initializeErrorAction());
    };

    const onNextPage = () => {
        if (pageNum < pageLastIndex) {
            setPageNum((pageIndex) => pageIndex + 1);
        }
    };
    const onPreviousPage = () => {
        if (pageNum > 1) {
            setPageNum((pageIndex) => pageIndex - 1);
        }
    };
    const onChangePage = (index) => {
        setPageNum(index);
    };

    return (
        <MyPlannerList
            accountId={accountId}
            myPlannerList={myPlannerList}
            accountError={accountError}
            drag={drag}
            loading={loading}
            onCloseError={onCloseError}
            onCreatePlanner={onCreatePlanner}
            onClickPlanner={onClickPlanner}
            onPreviousPage={onPreviousPage}
            onNextPage={onNextPage}
            onChangePage={onChangePage}
        />
    );
};

export default MyPlannerListContainer;
