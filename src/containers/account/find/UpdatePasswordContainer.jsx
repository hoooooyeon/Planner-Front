import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import UpdatePassword from '../../../components/account/find/UpdatePassword';
import { accountPasswordChange } from '../../../lib/api/accountAPI';
import validation from '../../../lib/utils/validationCheck';
import {
    changeFieldAction,
    initializeAction,
    initializeErrorAction,
    validateFieldAction,
} from '../../../modules/accountModule';

const UpdatePasswordContainer = () => {
    // http://localhost:3000/UpdatePassword?key=190ac5d29f40958a11c88d0249e93e2bdc009e41784bd31c9428d6d5bb2e03cd
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const { changePw, accountError, loading, pwChanging } = useSelector(({ accountReducer, loadingReducer }) => ({
        changePw: accountReducer.changePw,
        pwChanging: accountReducer.pwChanging,
        accountError: accountReducer.accountError,
        loading: accountReducer.loading,
    }));

    const { newPassword, confirmPassword } = { ...changePw };
    const passwordKey = useRef();

    // useEffect(() => {
    //     if (!location.search) {
    //         alert('잘못된 접근입니다.');
    //         history.push('/login');
    //     }
    // }, []);

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

    // 비밀번호 변경
    const handlePasswordChange = () => {
        if (!loading) {
            const key = passwordKey.current;
            const validState = validation(changePw);
            if (Object.keys(validState).length > 0) {
                dispatch(validateFieldAction(validState));
            } else {
                dispatch(initializeErrorAction());
                dispatch(accountPasswordChange({ newPassword, confirmPassword, key }));
            }
        }
    };

    // 비밀번호 변경 완료
    useEffect(() => {
        if (pwChanging) {
            alert('변경이 완료 되었습니다. 로그인 페이지로 이동합니다.');
            history.push('/login');
        }
    }, [pwChanging]);

    // 키값 가져오기
    useEffect(() => {
        passwordKey.current = location.search;
    }, []);

    useEffect(() => {
        return () => {
            dispatch(initializeAction());
            dispatch(initializeErrorAction());
        };
    }, [dispatch]);

    return (
        <UpdatePassword
            form={changePw}
            accountError={accountError}
            loading={loading}
            onChange={onChange}
            handlePasswordChange={handlePasswordChange}
        />
    );
};

export default UpdatePasswordContainer;
