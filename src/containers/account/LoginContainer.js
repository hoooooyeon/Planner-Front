import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import Auth from "../../components/account/Auth";
import { tokenUse } from '../../lib/api/client';
import { changeField, initialize, initializeError, loginAction } from "../../modules/authModule";

const LoginContainer = ({ history, type }) => {
    const dispatch = useDispatch();
    const { form, token, account, authError } = useSelector(({ authReducer }) => ({
        form: authReducer[type],
        account: authReducer.account,
        token: authReducer.token,
        authError: authReducer.authError
    }));

    const onChange = (e) => {
        const { name, value } = e.target;
        dispatch(changeField({
            form: type,
            field: name,
            value: value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const { email, password } = form;
        dispatch(initializeError());
        dispatch(loginAction({ email, password }));
    };

    useEffect(() => {
        dispatch(initialize());
    }, [dispatch, authError]);

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
            tokenUse();
        }
    }, [token]);

    useEffect(() => {
        if (account) {
            history.push("/");
        }
    });


    return (
        <Auth type={type} form={form} onChange={onChange} onSubmit={onSubmit} authError={authError} />
    );
};

export default withRouter(LoginContainer);