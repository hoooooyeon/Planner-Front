import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FindPassword from '../../../components/account/find/FindPassword';
import {
    accountPasswordFindAction,
    changeFieldAction,
    initializeAction,
    initializeErrorAction,
} from '../../../modules/accountModule';

const FindPasswordContainer = () => {
    const dispatch = useDispatch();
    const { findPw, accountError, loading } = useSelector(({ accountReducer, loadingReducer }) => ({
        findPw: accountReducer.findPw,
        accountError: accountReducer.accountError,
        loading: loadingReducer.loading,
    }));

    const { email, isSend } = { ...findPw };

    const onChange = (e) => {
        const { name, value } = e.target;
        dispatch(
            changeFieldAction({
                form: 'findPw',
                name,
                value,
            }),
        );
    };

    // 비밀번호 찾기
    const handlePasswordFind = () => {
        if (!loading) {
            dispatch(initializeErrorAction());
            dispatch(accountPasswordFindAction({ email }));
        }
    };

    // 비밀번호 찾기 완료
    useEffect(() => {
        if (isSend) {
            alert('입력하신 이메일을 확인해주세요.');
        }
    }, [isSend]);

    useEffect(() => {
        return () => {
            dispatch(initializeAction());
            dispatch(initializeErrorAction());
        };
    }, [dispatch]);

    return (
        <FindPassword
            form={findPw}
            accountError={accountError}
            loading={loading}
            onChange={onChange}
            handlePasswordFind={handlePasswordFind}
        />
    );
};

export default FindPasswordContainer;
