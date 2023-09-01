import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    changeCurPlannerIdAction,
    changeKeywordAction,
    changePageNumAction,
    changeResultKeywordAction,
    loadSharePlannerListAction,
    resetPlannerDataAction,
    resetPlannerErrorAction,
    resetSharePlannerListAction,
} from '../../../modules/plannerModule';
import ShareList from '../../../components/planner/list/ShareList';
import { useState } from 'react';

const ShareListContainer = () => {
    const dispatch = useDispatch();
    const { sharePlanners, plannerError, plannerData, loading, keyword, account } = useSelector(
        ({ plannerReducer, authReducer, loadingReducer }) => ({
            sharePlanners: plannerReducer.sharePlanners,
            plannerError: plannerReducer.plannerError,
            planner: plannerReducer.planner,
            account: authReducer.account,
            plannerData: plannerReducer.plannerData,
            keyword: plannerReducer.keyword,
            loading: loadingReducer.loading,
        }),
    );

    const { pageNum } = { ...plannerData };
    const { curKeyword, resultKeyword } = { ...keyword };
    const [sortCriteria, setSortCriteria] = useState(2);
    const drag = useRef(false);

    // 플래너 검색 순위 설정
    const onChangeSort = (num) => {
        setSortCriteria(num);
    };

    // 공유 플래너리스트 가져오기
    useEffect(() => {
        dispatch(resetSharePlannerListAction());
        const queryString = { itemCount: 12, sortCriteria, pageNum, keyword: resultKeyword };
        dispatch(loadSharePlannerListAction(queryString));
    }, [dispatch, pageNum, resultKeyword, sortCriteria]);

    // 플래너 선택
    const onClickPlanner = (plannerId) => {
        if (!drag.current) {
            dispatch(resetPlannerDataAction());
            dispatch(changeCurPlannerIdAction(plannerId));
        }
    };

    // 플래너 키워드 타이핑
    const onChangeKeyword = (keyword) => {
        dispatch(changeKeywordAction(keyword));
    };

    // 실제적으로 검색된 키워드 저장
    const onChangeResultKeyword = () => {
        dispatch(changeResultKeywordAction(curKeyword));
    };

    // 검색 순위, 키워드 변경시 페이지 리셋
    useEffect(() => {
        dispatch(changePageNumAction(1));
    }, [sortCriteria, resultKeyword]);

    // 키워드 리셋
    useEffect(() => {
        dispatch(changeKeywordAction(''));
        dispatch(changeResultKeywordAction(''));
    }, [sortCriteria]);

    // 검색 키워드 및 플래너리스트 초기화
    useEffect(() => {
        return () => {
            dispatch(changeKeywordAction(''));
            dispatch(changeResultKeywordAction(''));
            dispatch(resetSharePlannerListAction());
        };
    }, [dispatch]);

    // plannerError 리셋
    const onCloseError = () => {
        dispatch(resetPlannerErrorAction());
    };

    return (
        <ShareList
            sharePlanners={sharePlanners}
            plannerError={plannerError}
            keyword={keyword}
            sortCriteria={sortCriteria}
            drag={drag}
            loading={loading}
            onClickPlanner={onClickPlanner}
            onChangeKeyword={onChangeKeyword}
            onChangeResultKeyword={onChangeResultKeyword}
            onChangeSort={onChangeSort}
            onCloseError={onCloseError}
        />
    );
};

export default ShareListContainer;
