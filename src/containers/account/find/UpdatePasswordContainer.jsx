import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import UpdatePassword from '../../../components/account/find/UpdatePassword';
import { accountPasswordChange } from '../../../lib/api/accountAPI';
import { changeFieldAction, initializeAction, initializeErrorAction } from '../../../modules/accountModule';

const UpdatePasswordContainer = () => {
    // http://localhost:3000/UpdatePassword?key=190ac5d29f40958a11c88d0249e93e2bdc009e41784bd31c9428d6d5bb2e03cd
    const dispatch = useDispatch();
    const history = useHistory();
    const { changePw, accountError, loading } = useSelector(({ accountReducer, loadingReducer }) => ({
        changePw: accountReducer.changePw,
        accountError: accountReducer.accountError,
        loading: accountReducer.loading,
    }));

    const { newPassword, confirmPassword, key, isChange } = { ...changePw };

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
            dispatch(initializeErrorAction());
            dispatch(accountPasswordChange({ newPassword, confirmPassword, key }));
        }
    };

    useEffect(() => {
        if (isChange) {
            alert('변경이 완료 되었습니다. 로그인 페이지로 이동합니다.');
            history.push('/login');
        }
    }, [isChange]);

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
