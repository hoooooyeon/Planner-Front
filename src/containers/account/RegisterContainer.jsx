import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import Auth from '../../components/account/Auth';
import {
    EMAIL_CODE_CHECK_TYPE,
    EMAIL_CODE_REQUEST_TYPE,
    REGISTER_TYPE,
    changeField,
    codeTimerEndAction,
    emailCodeCheckAction,
    emailCodeRequestAction,
    initialize,
    initializeError,
    initializeForm,
    registerAction,
    validateField,
    validateFieldAction,
} from '../../modules/authModule';
import validation from '../../lib/utils/validationCheck';
import EmailConfirm from '../../components/account/EmailConfirm';
import { RegisterStatus } from '../../enum/RegisterStatus';

const RegisterContainer = ({ history, type }) => {
    const dispatch = useDispatch();
    const { loading, form, emailConfirm, registerSuccess, authError, state } = useSelector(
        ({ authReducer, loadingReducer }) => ({
            loading: {
                emailCodeRequestLoading: loadingReducer[EMAIL_CODE_REQUEST_TYPE],
                emailCodeCheckLoading: loadingReducer[EMAIL_CODE_CHECK_TYPE],
                registerLoading: loadingReducer[REGISTER_TYPE],
            },
            form: authReducer[type],
            emailConfirm: authReducer.emailConfirm,
            registerSuccess: authReducer.registerSuccess,
            authError: authReducer.authError,
            state: authReducer.state,
        }),
    );

    const [phase, setPhase] = useState(RegisterStatus.EmailCheck);
    const fieldType = phase == RegisterStatus.EmailCheck ? 'emailConfirm' : 'register';
    const { emailCodeRequest, emailCodeCheck } = emailConfirm;

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        dispatch(
            changeField({
                form: fieldType,
                field: name,
                value: value,
            }),
        );
    };

    const handleEmailConfirmClick = () => {
        let form = null;
        const { email, code } = emailConfirm;

        if (phase == RegisterStatus.EmailCheck && !emailCodeRequest) {
            form = { email };
        } else {
            form = { email, code };
        }

        const validState = validation(form);

        if (Object.keys(validState).length > 0) {
            dispatch(validateFieldAction(validState));
        } else {
            if (phase == RegisterStatus.EmailCheck && !emailCodeRequest) {
                dispatch(initializeError());
                dispatch(emailCodeRequestAction(email));
            } else {
                dispatch(initializeError());
                dispatch(emailCodeCheckAction(form));
            }
        }
    };

    const handleCodeTimerEnd = () => {
        setPhase(RegisterStatus.EmailCheck);
        dispatch(codeTimerEndAction('인증 시간이 끝났습니다. 다시 시도하세요.'));
    };

    const handleSubmit = (e) => {
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

    // 이메일 확인 완료시 회원가입 진행
    useEffect(() => {
        if (emailCodeRequest && emailCodeCheck) {
            setPhase(RegisterStatus.Register);
            dispatch(
                changeField({
                    form: 'register',
                    field: 'email',
                    value: emailConfirm.email,
                }),
            );
        }
    }, [emailCodeRequest, emailCodeCheck]);

    // 회원가입 성공시 로그인 페이지로 이동
    useEffect(() => {
        if (registerSuccess) {
            history.push('/login');
        }
    }, [dispatch, registerSuccess]);

    // 상태 초기화
    useEffect(() => {
        return () => {
            dispatch(initializeForm('register'));
            dispatch(initializeError());
        };
    }, [dispatch]);

    // 이메일 확인이 안료되지 않았으면 이메일 확인 컴포넌트로 리턴
    if (!emailCodeRequest || !emailCodeCheck) {
        return (
            <EmailConfirm
                loading={loading}
                phase={phase}
                emailConfirm={emailConfirm}
                emailCodeRequest={emailCodeRequest}
                onCodeTimerEnd={handleCodeTimerEnd}
                onChange={handleFieldChange}
                onEmailConfirmClick={handleEmailConfirmClick}
                authError={authError}
            />
        );
    }

    return (
        <Auth
            loading={loading}
            type="register"
            form={form}
            onChange={handleFieldChange}
            onSubmit={handleSubmit}
            authError={authError}
        />
    );
};

export default withRouter(RegisterContainer);
