import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import Auth from "../../components/account/Auth";
import { changeField, initialize, initializeError, initializeForm, registerAction } from "../../modules/authModule";


const RegisterContainer = ({ history, type }) => {
    const dispatch = useDispatch();
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
        <Auth type={type} form={form} onChange={onChange} onSubmit={onSubmit} authError={state.message} />
    );
};

export default withRouter(RegisterContainer);
