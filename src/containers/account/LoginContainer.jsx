import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import Auth from '../../components/account/Auth';
import { tokenUse } from '../../lib/api/client';
import {
    LOGIN_TYPE,
    changeField,
    initialize,
    initializeError,
    initializeForm,
    loginAction,
} from '../../modules/authModule';

const LoginContainer = ({ history, type }) => {
    const dispatch = useDispatch();
    const { loading, form, account, accessToken, authError, state } = useSelector(
        ({ authReducer, loadingReducer }) => ({
            loading: { loginLoading: loadingReducer[LOGIN_TYPE] },
            form: authReducer[type],
            account: authReducer.account,
            accessToken: authReducer.accessToken,
            authError: authReducer.authError,
            state: authReducer.state,
        }),
    );

    const onChange = (e) => {
        const { name, value } = e.target;
        dispatch(
            changeField({
                form: type,
                field: name,
                value: value,
            }),
        );
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const { email, password } = form;
        dispatch(initializeError());
        dispatch(loginAction({ email, password }));
    };

    useEffect(() => {
        dispatch(initializeForm('login'));
    }, [dispatch, state.message]);

    useEffect(() => {
        if (account) {
            // 액세스 토큰 설정
            if (accessToken) {
                localStorage.setItem('accessToken', accessToken);
                tokenUse(accessToken);
            }

            // 홈으로 이동
            history.push('/');
        }
    }, [account]);

    useEffect(() => {
        return () => {
            dispatch(initialize());
            dispatch(initializeError());
        };
    }, [dispatch]);

    return (
        <Auth loading={loading} type={type} form={form} onChange={onChange} onSubmit={onSubmit} authError={authError} />
    );
};

export default withRouter(LoginContainer);
