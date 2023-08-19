import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    changeCurPlannerIdAction,
    changeKeywordAction,
    changePageNumAction,
    changeResultKeywordAction,
    loadSharePlannerListAction,
    resetSharePlannerListAction,
} from '../../../modules/plannerModule';
import ShareList from '../../../components/planner/list/ShareList';
import { useState } from 'react';

const ShareListContainer = () => {
    const dispatch = useDispatch();
    const { sharePlanners, plannerError, plannerData, keyword, account } = useSelector(
        ({ plannerReducer, authReducer }) => ({
            sharePlanners: plannerReducer.sharePlanners,
            plannerError: plannerReducer.plannerError,
            planner: plannerReducer.planner,
            account: authReducer.account,
            plannerData: plannerReducer.plannerData,
            keyword: plannerReducer.keyword,
        }),
    );

    const { pageNum } = { ...plannerData };
    const { curKeyword, resultKeyword } = { ...keyword };
    const [sortCriteria, setSortCriteria] = useState(2);
    const drag = useRef(false);

    const onChangeSort = (num) => {
        setSortCriteria(num);
    };
    // 공유 플래너리스트 가져오기
    useEffect(() => {
        const itemCount = 12;
        const keyword = resultKeyword;

        dispatch(loadSharePlannerListAction({ itemCount, sortCriteria, pageNum, keyword }));
    }, [dispatch, pageNum, resultKeyword, sortCriteria, account]);

    const onClickPlanner = (plannerId) => {
        if (!drag.current) {
            dispatch(changeCurPlannerIdAction(plannerId));
        }
    };

    const onChangeKeyword = (keyword) => {
        dispatch(changeKeywordAction(keyword));
    };
    const onChangeResultKeyword = () => {
        dispatch(changeResultKeywordAction(curKeyword));
    };

    useEffect(() => {
        dispatch(changePageNumAction(1));
    }, [sortCriteria, resultKeyword]);

    useEffect(() => {
        dispatch(changeKeywordAction(''));
        dispatch(changeResultKeywordAction(''));
    }, [sortCriteria]);

    // 검색 키워드 초기화
    useEffect(() => {
        return () => {
            dispatch(changeKeywordAction(''));
            dispatch(changeResultKeywordAction(''));
            dispatch(resetSharePlannerListAction());
        };
    }, [dispatch]);

    return (
        <ShareList
            sharePlanners={sharePlanners}
            plannerError={plannerError}
            keyword={keyword}
            sortCriteria={sortCriteria}
            drag={drag}
            onClickPlanner={onClickPlanner}
            onChangeKeyword={onChangeKeyword}
            onChangeResultKeyword={onChangeResultKeyword}
            onChangeSort={onChangeSort}
        />
    );
};

export default ShareListContainer;
