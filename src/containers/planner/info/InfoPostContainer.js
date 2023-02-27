import { useDispatch, useSelector } from 'react-redux';
import InfoPostList from '../../../components/planner/info/InfoPostList';
import { changeMemoContentAction, changeMemoTitleAction, createMemoAction, deleteMemoAction, updateMemoAction } from '../../../modules/plannerModule';

const InfoPostContainer = () => {
    const dispatch = useDispatch();
    const { planner, plannerError, memos, memo } = useSelector(({ plannerReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
        memos: plannerReducer.memos,
        memo: plannerReducer.memo,
    }));

    const onCreateMemo = () => {
        dispatch(createMemoAction());
    };

    const onUpdateMemo = () => {
        dispatch(updateMemoAction());
    };

    const onDeleteMemo = () => {
        dispatch(deleteMemoAction());
    };

    const onChangeMemoTitle = (title) => {
        dispatch(changeMemoTitleAction(title));
    };

    const onChangeMemoContent = (content) => {
        dispatch(changeMemoContentAction(content));
    };

    return <InfoPostList memos={memos} memo={memo} onCreateMemo={onCreateMemo} onUpdateMemo={onUpdateMemo} onDeleteMemo={onDeleteMemo} onChangeMemoTitle={onChangeMemoTitle} onChangeMemoContent={onChangeMemoContent} />;
};

export default InfoPostContainer;
