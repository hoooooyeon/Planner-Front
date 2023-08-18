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
    const { plannerId } = { ...planner };
    const { accountId } = { ...account };

    const [curMemo, setCurMemo] = useState({
        memoId: null,
        title: '',
        content: '',
    });

    const title = curMemo.title;
    const content = curMemo.content;

    const onCreateMemo = () => {
        if (accountId && account.accountId === planner.accountId) {
            dispatch(createMemoAction({ plannerId, title, content }));
        }
    };

    const onUpdateMemo = (memoId) => {
        if (accountId && account.accountId === planner.accountId) {
            dispatch(updateMemoAction({ plannerId, memoId, title, content }));
        }
    };

    const onDeleteMemo = (memoId) => {
        if (accountId && account.accountId === planner.accountId) {
            dispatch(deleteMemoAction({ plannerId, memoId }));
        }
    };

    const onChangeMemoTitle = (title) => {
        setCurMemo({
            ...curMemo,
            title: title,
        });
    };

    const onChangeMemoContent = (content) => {
        setCurMemo({
            ...curMemo,
            content: content,
        });
    };

    const onLoadMemo = (memo) => {
        setCurMemo({ memoId: memo.memoId, title: memo.title, content: memo.content });
    };

    const onResetMemo = () => {
        setCurMemo({ memoId: null, title: '', content: '' });
    };

    if (!planner || !accountId) {
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
