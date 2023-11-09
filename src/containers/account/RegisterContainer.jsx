import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import Auth from '../../components/account/Auth';
import {
    REGISTER_TYPE,
    changeField,
    initialize,
    initializeError,
    initializeForm,
    registerAction,
    validateField,
    validateFieldAction,
} from '../../modules/authModule';
import validation from '../../lib/utils/validationCheck';

const RegisterContainer = ({ history, type }) => {
    const dispatch = useDispatch();
    const { loading, form, authError, state } = useSelector(({ authReducer, loadingReducer }) => ({
        loading: loadingReducer[REGISTER_TYPE],
        form: authReducer[type],
        authError: authReducer.authError,
        state: authReducer.state,
    }));

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
        const validState = validation(form);

        if (Object.keys(validState).length > 0) {
            dispatch(validateFieldAction(validState));
        } else {
            const { email, password, username, nickname, phone } = form;
            dispatch(initializeError());
            dispatch(registerAction({ email, password, username, nickname, phone }));
        }
    };

    useEffect(() => {
        // dispatch(initializeForm('register'));
    }, [dispatch, authError]);

    useEffect(() => {
        if (state.state) {
            history.push('/login');
        }
    }, [dispatch, state.state]);

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

export default withRouter(RegisterContainer);
