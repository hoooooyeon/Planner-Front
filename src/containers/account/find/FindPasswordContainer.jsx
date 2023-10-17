import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FindPassword from '../../../components/account/find/FindPassword';
import validation from '../../../lib/utils/validationCheck';
import {
    accountPasswordFindAction,
    changeFieldAction,
    initializeAction,
    initializeErrorAction,
    validateFieldAction,
} from '../../../modules/accountModule';

const FindPasswordContainer = () => {
    const dispatch = useDispatch();
    const { findPw, accountError, loading, pwFinding } = useSelector(({ accountReducer, loadingReducer }) => ({
        findPw: accountReducer.findPw,
        pwFinding: accountReducer.pwFinding,
        accountError: accountReducer.accountError,
        loading: loadingReducer.loading,
    }));

    const { email } = { ...findPw };

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
            const validState = validation(findPw);
            if (Object.keys(validState).length > 0) {
                dispatch(validateFieldAction(validState));
            } else {
                dispatch(initializeErrorAction());
                dispatch(accountPasswordFindAction({ email }));
            }
        }
    };

    // 비밀번호 찾기 완료
    useEffect(() => {
        if (pwFinding) {
            alert('입력하신 이메일을 확인해주세요.');
        }
    }, [pwFinding]);

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
            pwFinding={pwFinding}
            onChange={onChange}
            handlePasswordFind={handlePasswordFind}
        />
    );
};

export default FindPasswordContainer;
