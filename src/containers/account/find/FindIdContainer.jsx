import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FindId from '../../../components/account/find/FindId';
import { changeField, initialize, initializeError, phoneCodeSendAction } from '../../../modules/authModule';

const FindIdContainer = () => {
    const dispatch = useDispatch();
    const { authError, authentication } = useSelector(({ authReducer }) => ({
        authError: authReducer.authError,
        authentication: authReducer.authentication,
    }));

    const { usename, phone, email, code, state } = { ...authentication };

    const onChange = (e) => {
        const { name, value } = e.target;
        dispatch(
            changeField({
                form: authentication,
                field: name,
                value: value,
            }),
        );
    };

    const handlePhoneCodeSend = () => {
        dispatch(phoneCodeSendAction(phone));
    };

    useEffect(() => {
        return () => {
            dispatch(initialize());
            dispatch(initializeError());
        };
    }, [dispatch]);

    return (
        <FindId
            authError={authError}
            authentication={authentication}
            onChange={onChange}
            handlePhoneCodeSend={handlePhoneCodeSend}
        />
    );
};

export default FindIdContainer;
