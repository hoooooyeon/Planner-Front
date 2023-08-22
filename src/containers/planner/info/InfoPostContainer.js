import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfoPostList from '../../../components/planner/info/InfoPostList';
import { createMemoAction, deleteMemoAction, updateMemoAction } from '../../../modules/plannerModule';

const InfoPostContainer = () => {
    const dispatch = useDispatch();
    const { planner, plannerError, account } = useSelector(({ plannerReducer, authReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
        account: authReducer.account,
    }));
    const { plannerId, planMembers } = { ...planner };
    const { accountId, nickname } = { ...account };

    const [curMemo, setCurMemo] = useState({
        memoId: null,
        title: '',
        content: '',
    });

    // 메모 생성
    const onCreateMemo = () => {
        if (accountId === planner.accountId) {
            const title = curMemo.title;
            const content = curMemo.content;
            dispatch(createMemoAction({ plannerId, title, content }));
        }
    };

    // 메모 수정
    const onUpdateMemo = (memoId) => {
        if (accountId === planner.accountId) {
            const queryString = { plannerId, memoId, title: curMemo.title, content: curMemo.content };
            dispatch(updateMemoAction(queryString));
        }
    };

    // 메모 삭제
    const onDeleteMemo = (memoId) => {
        if (accountId === planner.accountId) {
            dispatch(deleteMemoAction({ plannerId, memoId }));
        }
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
        setCurMemo({ memoId: memo.memoId, title: memo.title, content: memo.content });
    };

    // 현제 메모 리셋
    const onResetMemo = () => {
        setCurMemo({ memoId: null, title: '', content: '' });
    };

    if (planner === {}) {
        return null;
    }
    return (
        <InfoPostList
            planner={planner}
            curMemo={curMemo}
            account={account}
            onCreateMemo={onCreateMemo}
            onUpdateMemo={onUpdateMemo}
            onDeleteMemo={onDeleteMemo}
            onChangeMemoTitle={onChangeMemoTitle}
            onChangeMemoContent={onChangeMemoContent}
            onLoadMemo={onLoadMemo}
            onResetMemo={onResetMemo}
        />
    );
};

export default InfoPostContainer;
