import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurPlannerIdAction, createPlannerAction, resetPlannerDataAction } from '../../../modules/plannerModule';
import MyPlannerList from '../../../components/planner/list/MyPlannerList';
import { profileMyPlannerLoadAction, resetMyPlannerListAction } from '../../../modules/profileModule';
import { useHistory } from 'react-router';

const MyPlannerListContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { myPlanners, plannerError, account } = useSelector(({ plannerReducer, authReducer, profileReducer }) => ({
        account: authReducer.account,
        myPlanners: profileReducer.myPlanners,
        plannerError: plannerReducer.plannerError,
    }));

    const letsFormat = (d) => {
        const date = new Date(d);
        return (
            date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
        );
    };

    const { pageLastIndex } = { ...myPlanners };
    const { accountId, nickname } = { ...account };
    const drag = useRef(false);

    useEffect(() => {
        dispatch(resetPlannerDataAction());
        return () => {
            dispatch(resetMyPlannerListAction());
        };
    }, [dispatch]);

    const onCreatePlanner = () => {
        if (accountId) {
            let title = `${nickname}의 여행 플래너`;
            let planDateStart = letsFormat(new Date());
            let planDateEnd = letsFormat(new Date());
            let planMembers = [];
            let expense = 0;
            let memberCount = 1;
            let memberTypeId = 1;
            const creator = nickname;

            dispatch(
                createPlannerAction({
                    accountId,
                    creator,
                    title,
                    planDateStart,
                    planDateEnd,
                    planMembers,
                    expense,
                    memberCount,
                    memberTypeId,
                }),
            );
        } else {
            alert('로그인이 필요합니다.');
        }
    };

    const [pageNum, setPageNum] = useState(1);
    // 나의 플래너리스트 가져오기
    useEffect(() => {
        if (accountId) {
            const itemCount = 10;
            const sortCriteria = 2;
            dispatch(profileMyPlannerLoadAction({ accountId, pageNum, itemCount, sortCriteria }));
        }
    }, [dispatch, accountId, pageNum]);

    const onClickPlanner = (plannerId) => {
        if (!drag.current) {
            dispatch(changeCurPlannerIdAction(plannerId));
            history.push(`/Planners/${plannerId}`);
        }
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
            drag={drag}
            plannerError={plannerError}
            onCreatePlanner={onCreatePlanner}
            onClickPlanner={onClickPlanner}
            onPreviousPage={onPreviousPage}
            onNextPage={onNextPage}
        />
    );
};

export default MyPlannerListContainer;
