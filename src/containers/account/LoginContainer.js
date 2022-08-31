import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Auth from "../../components/account/Auth";
import { tokenUse } from '../../lib/api/client';
import { changeField, initialize, loginAction } from "../../modules/authModule";

const LoginContainer = () => {
    const dispatch = useDispatch();
    const { form, token, authError } = useSelector(({ authReducer }) => ({
        form: authReducer['login'],
        token: authReducer.token,
        authError: authReducer.authError
    }));

    const onChange = (e) => {
        const { name, value } = e.target;
        dispatch(changeField({
            form: 'login',
            field: name,
            value: value
        }));
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const { email, password } = form;
        dispatch(loginAction({ email, password }));
    };

    useEffect(() => {
        dispatch(initialize());
    }, [dispatch]);

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
            tokenUse();
        }
    }, [token]);


    return (
        <Auth type="login" onChange={onChange} onSubmit={onSubmit} authError={authError} />
    );
};

export default LoginContainer;