import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import Auth from "../../components/account/Auth";
import validUtil from "../../lib/utils/validationCheck";
import { changeField, initialize, initializeError, initializeForm, registerAction } from "../../modules/authModule";

const defualtValidMsg = {
    email: false,
    passwordConfirm: '',
    username: '',
    nickname: '',
    phone: '',
}

const RegisterContainer = ({ history, type }) => {
    const dispatch = useDispatch();
    const [valid, setValidMsg] = useState(defualtValidMsg);
    const { form, authError, state } = useSelector(({ authReducer }) => ({
        form: authReducer[type],
        authError: authReducer.authError,
        state: authReducer.state
    }));

    const onChange = (e) => {
        const { name, value } = e.target;
        dispatch(changeField({
            form: type,
            field: name,
            value: value
        }));

        if (validUtil.valid(name, value)) {
            setValidMsg({
                ...valid,
                [name]: true
            });
        }
        else {
            setValidMsg({
                ...valid,
                [name]: false
            });
        }

    };

    const onSubmit = (e) => {
        e.preventDefault();
        const { email, password, username, nickname, phone } = form;
        dispatch(initializeError());
        dispatch(registerAction({ email, password, username, nickname, phone }));
    };

    useEffect(() => {
        dispatch(initializeForm('register'));
    }, [dispatch, authError]);

    useEffect(() => {
        if (state.state) {
            history.push('/login');
        }
    }, [dispatch, state.state]);

    useEffect(() => {
        return () => {
            dispatch(initialize());
        }
    }, [dispatch]);

    return (
        <Auth type={type} form={form} onChange={onChange} onSubmit={onSubmit} valid={valid} authError={state.message} />
    );
};

export default withRouter(RegisterContainer);
