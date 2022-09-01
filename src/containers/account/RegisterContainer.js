import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Auth from "../../components/account/Auth";
import { changeField, initialize, registerAction } from "../../modules/authModule";


const RegisterContainer = () => {
    const dispatch = useDispatch();
    const { form, authError } = useSelector(({ authReducer }) => ({
        form: authReducer['register'],
        authError: authReducer.authError
    }));

    const onChange = (e) => {
        const { name, value } = e.target;
        dispatch(changeField({
            form: 'register',
            field: name,
            value: value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const { email, password, username, nickname } = form;
        dispatch(registerAction({ email, password, username, nickname }));
    };

    useEffect(() => {
        dispatch(initialize());
    }, [dispatch, authError]);

    return (
        <Auth type="register" form={form} onChange={onChange} onSubmit={onSubmit} authError={authError} />
    );
};

export default RegisterContainer;
