import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfoPostList from '../../../components/planner/info/InfoPostList';
import {
    changeModalDataAction,
    changePlannerDataAction,
    createMemoAction,
    CREATE_MEMO_TYPE,
    deleteMemoAction,
    DELETE_MEMO_TYPE,
    LOAD_PLANNER_TYPE,
    plannerInitializePropertyAction,
    updateMemoAction,
    UPDATE_MEMO_TYPE,
} from '../../../modules/plannerModule';

const InfoPostContainer = () => {
    const dispatch = useDispatch();
    const { planner, modal, plannerError, account, plannerData, loading } = useSelector(
        ({ plannerReducer, authReducer, loadingReducer }) => ({
            planner: plannerReducer.planner,
            plannerError: plannerReducer.plannerError,
            plannerData: plannerReducer.plannerData,
            modal: plannerReducer.modal,
            account: authReducer.account,
            loading: {
                createMemoLoading: loadingReducer[CREATE_MEMO_TYPE],
                deleteMemoLoading: loadingReducer[DELETE_MEMO_TYPE],
                updateMemoLoading: loadingReducer[UPDATE_MEMO_TYPE],
                plannerLoading: loadingReducer[LOAD_PLANNER_TYPE],
            },
        }),
    );
    const { plannerId } = { ...planner };
    const { accountId, nickname } = { ...account };
    const { memoId } = { ...plannerData };
    const { memo } = { ...modal };

    const [curMemo, setCurMemo] = useState({
        title: '',
        content: '',
    });

    // 메모 생성
    const onCreateMemo = () => {
        if (accountId === planner.accountId) {
            const title = `${nickname}님의 메모`;
            const content = '';
            onResetMemo();
            dispatch(createMemoAction({ plannerId, title, content }));
        }
    };

    // 메모 수정
    const onUpdateMemo = () => {
        if (accountId === planner.accountId) {
            const queryString = { plannerId, memoId, title: curMemo.title, content: curMemo.content };
            dispatch(updateMemoAction(queryString));
            dispatch(plannerInitializePropertyAction('plannerError'));
        }
    };

    // 메모 삭제
    const onDeleteMemo = (memoId) => {
        if (accountId === planner.accountId) {
            dispatch(deleteMemoAction({ plannerId, memoId }));
        }
    };

    // 모달 닫기
    const onCloseModal = () => {
        dispatch(changeModalDataAction({ property: 'memo', value: !memo }));
        dispatch(plannerInitializePropertyAction('plannerError'));
        onResetMemo();
    };

    // 메모 제목 변경
    const onChangeMemoTitle = (title) => {
        setCurMemo({
            ...curMemo,
            title: title,
        });
    };

    // 메모 내용 변경
    const onChangeMemoContent = (content) => {
        setCurMemo({
            ...curMemo,
            content: content,
        });
    };

    // 현재 메모 로드
    const onLoadMemo = (memo) => {
        dispatch(changeModalDataAction({ property: 'memo', value: !modal.memo }));

        dispatch(changePlannerDataAction({ property: 'memoId', value: memo.memoId }));
        setCurMemo({ title: memo.title, content: memo.content });
    };

    // 현재 메모 리셋
    const onResetMemo = () => {
        setCurMemo({ title: '', content: '' });
    };

    useEffect(() => {
        return () => dispatch(plannerInitializePropertyAction('plannerError'));
    }, []);

    return (
        <InfoPostList
            planner={planner}
            curMemo={curMemo}
            account={account}
            modal={modal}
            loading={loading}
            plannerError={plannerError}
            onCreateMemo={onCreateMemo}
            onUpdateMemo={onUpdateMemo}
            onDeleteMemo={onDeleteMemo}
            onChangeMemoTitle={onChangeMemoTitle}
            onChangeMemoContent={onChangeMemoContent}
            onLoadMemo={onLoadMemo}
            onCloseModal={onCloseModal}
        />
    );
};

export default InfoPostContainer;
