import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfoPostList from '../../../components/planner/info/InfoPostList';
import {
    changeCurMemoIdAction,
    createMemoAction,
    deleteMemoAction,
    resetPlannerErrorAction,
    toggleMemoModalAction,
    updateMemoAction,
} from '../../../modules/plannerModule';

const InfoPostContainer = () => {
    const dispatch = useDispatch();
    const { planner, modal, plannerError, account, plannerData } = useSelector(({ plannerReducer, authReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
        plannerData: plannerReducer.plannerData,
        modal: plannerReducer.modal,
        account: authReducer.account,
    }));
    const { plannerId, planMembers } = { ...planner };
    const { accountId, nickname } = { ...account };
    const { memoId } = { ...plannerData };

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
            dispatch(resetPlannerErrorAction());
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
        dispatch(toggleMemoModalAction());
        dispatch(resetPlannerErrorAction());
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
        dispatch(toggleMemoModalAction());
        dispatch(changeCurMemoIdAction(memo.memoId));
        setCurMemo({ title: memo.title, content: memo.content });
    };

    // 현재 메모 리셋
    const onResetMemo = () => {
        setCurMemo({ title: '', content: '' });
    };

    if (Object.keys(planner).length <= 0) {
        return null;
    }
    return (
        <InfoPostList
            planner={planner}
            curMemo={curMemo}
            account={account}
            modal={modal}
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
