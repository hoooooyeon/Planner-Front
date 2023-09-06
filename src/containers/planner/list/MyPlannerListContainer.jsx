import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurPlannerIdAction, createPlannerAction, resetPlannerDataAction } from '../../../modules/plannerModule';
import MyPlannerList from '../../../components/planner/list/MyPlannerList';
import { useHistory } from 'react-router';
import {
    accountMyPlannerListLoadAction,
    resetAccountErrorAction,
    resetMyPlannerListAction,
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
            loading: loadingReducer.loading,
        }),
    );

    const { plannerId } = { ...plannerData };
    const { pageLastIndex } = { ...myPlannerList };
    const { accountId, nickname } = { ...account };
    const drag = useRef(false);

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
            dispatch(resetMyPlannerListAction());
        };
    }, [dispatch]);

    // 플래너 생성
    const onCreatePlanner = () => {
        if (accountId) {
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
        } else {
            alert('로그인이 필요합니다.');
        }
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
            dispatch(resetMyPlannerListAction());
            const queryString = { accountId, pageNum, itemCount: 10, sortCriteria: 2 };

            dispatch(accountMyPlannerListLoadAction(queryString));
        }
    }, [dispatch, accountId, pageNum]);

    // accountError 리셋
    const onCloseError = () => {
        dispatch(resetAccountErrorAction());
    };

    const maxPage = pageLastIndex;
    const [page, setPage] = useState(1);

    const onNextPage = () => {
        if (page !== maxPage) {
            setPage((index) => index + 1);
        }
    };
    const onPreviousPage = () => {
        if (page !== 1) {
            setPage((index) => index - 1);
        }
    };

    useEffect(() => {
        setPageNum(page);
    }, [page]);

    return (
        <MyPlannerList
            myPlannerList={myPlannerList}
            accountError={accountError}
            drag={drag}
            loading={loading}
            onCloseError={onCloseError}
            onCreatePlanner={onCreatePlanner}
            onClickPlanner={onClickPlanner}
            onPreviousPage={onPreviousPage}
            onNextPage={onNextPage}
        />
    );
};

export default MyPlannerListContainer;
