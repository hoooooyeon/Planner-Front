import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurPlannerIdAction, changeKeywordAction, changeResultKeywordAction, loadPlannerAction, loadSharePlannerListAction, resetSharePlannerListAction } from '../../../modules/plannerModule';
import ShareList from '../../../components/planner/list/ShareList';
import { useState } from 'react';
import { useHistory } from 'react-router';

const ShareListContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { sharePlanners, plannerError, planner, account, plannerData, keyword } = useSelector(({ plannerReducer, authReducer }) => ({
        sharePlanners: plannerReducer.sharePlanners,
        plannerError: plannerReducer.plannerError,
        planner: plannerReducer.planner,
        account: authReducer.account,
        plannerData: plannerReducer.plannerData,
        keyword: plannerReducer.keyword,
    }));

    const { pageNum } = { ...plannerData };
    const { curKeyword, resultKeyword } = { ...keyword };
    const [sortCriteria, setSortCriteria] = useState(2);
    const drag = useRef(false);

    const onChangeSort = (num) => {
        setSortCriteria(num);
    };
    const { accountId } = { ...account };
    // 공유 플래너리스트 가져오기
    useEffect(() => {
        if (accountId) {
            const itemCount = 12;
            const keyword = resultKeyword;

            dispatch(loadSharePlannerListAction({ itemCount, sortCriteria, pageNum, keyword }));
        }
    }, [dispatch, pageNum, resultKeyword, sortCriteria]);

    // 플래너 정보 가져오기
    const onLoadPlanner = (plannerId) => {
        dispatch(loadPlannerAction(plannerId));
    };

    const onClickPlanner = (plannerId) => {
        if (!drag.current) {
            dispatch(changeCurPlannerIdAction(plannerId));
            history.push(`/Planners/${plannerId}`);
        }
    };

    const onChangeKeyword = (keyword) => {
        dispatch(changeKeywordAction(keyword));
    };
    const onChangeResultKeyword = () => {
        dispatch(changeResultKeywordAction(curKeyword));
    };

    // 검색 키워드 초기화
    useEffect(() => {
        dispatch(changeKeywordAction(''));
        dispatch(changeResultKeywordAction(''));

        return () => {
            dispatch(resetSharePlannerListAction());
        };
    }, [dispatch]);

    return (
        <ShareList
            sharePlanners={sharePlanners}
            planner={planner}
            plannerError={plannerError}
            keyword={keyword}
            sortCriteria={sortCriteria}
            drag={drag}
            onLoadPlanner={onLoadPlanner}
            onClickPlanner={onClickPlanner}
            onChangeKeyword={onChangeKeyword}
            onChangeResultKeyword={onChangeResultKeyword}
            onChangeSort={onChangeSort}
        />
    );
};

export default ShareListContainer;
