import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FindId from '../../../components/account/find/FindId';
import { changeField, phoneCodeSendAction } from '../../../modules/authModule';

const FindIdContainer = ({ type }) => {
    const dispatch = useDispatch();
    const { authError, verification, form } = useSelector(({ authReducer }) => ({
        authError: authReducer.authError,
        verification: authReducer.verification,
        form: authReducer.findId,
    }));

    const [code, setCode] = useState();

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

    const handlePhoneCodeSend = () => {
        dispatch(phoneCodeSendAction(form.phone));
    };

    return (
        <FindId
            authError={authError}
            code={code}
            form={form}
            verification={verification}
            onChange={onChange}
            handlePhoneCodeSend={handlePhoneCodeSend}
        />
    );
};

export default FindIdContainer;
