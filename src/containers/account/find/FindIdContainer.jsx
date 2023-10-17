import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import FindId from '../../../components/account/find/FindId';
import validation from '../../../lib/utils/validationCheck';
import { accountIdFindAction, initializeErrorAction } from '../../../modules/accountModule';
import {
    changeField,
    initialize,
    initializeError,
    phoneCodeSendAction,
    validateFieldAction,
} from '../../../modules/authModule';

const FindIdContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { authError, authentication, loading, idFinding } = useSelector(({ authReducer, loadingReducer }) => ({
        authError: authReducer.authError,
        idFinding: authReducer.idFinding,
        authentication: authReducer.authentication,
        loading: loadingReducer.loading,
    }));

    const { username, phone, email, code } = { ...authentication };
    const [authType, setAuthType] = useState('phone');

    // email & phone 인증 형식 선택
    const onToggleAuthType = (value) => {
        setAuthType(value);
    };

    // const regex = /^[ㄱ-ㅎ가-힣]*$/;
    // const regex = /^\d{0,11}$/;
    // const regex = /^\d{0,6}$/;

    const onChange = (e) => {
        const { name, value } = e.target;
        // if (regex.test(value)) {
        dispatch(
            changeField({
                form: 'authentication',
                field: name,
                value: value,
            }),
        );
        // }
    };

    // 인증코드 요청
    const handleCodeSend = () => {
        // if (authType === 'email') {
        //     dispatch(emailCodeSendAction({ email }));
        // } else if (authType === 'phone') {
        // }
        const validState = validation(authentication);
        if (Object.keys(validState).length > 0) {
            dispatch(validateFieldAction(validState));
        } else {
            dispatch(initializeError());
            dispatch(phoneCodeSendAction({ username, phone }));
        }
    };

    useEffect(() => {
        if (idFinding === '') {
            alert('입력하신 휴대전화로 인증번호를 발송했습니다.');
        }
    }, [idFinding]);

    // 인증코드 확인 및 아이디 찾기
    const handleCodeCheck = () => {
        // if (authType === 'email') {
        //     dispatch(emailCodeCheckAction({ email, code }));
        // } else if (authType === 'phone') {
        // }
        if (!loading && idFinding === '') {
            const validState = validation(authentication);
            if (Object.keys(validState).length > 0) {
                dispatch(validateFieldAction(validState));
            } else {
                dispatch(initializeError());
                dispatch(accountIdFindAction({ username, phone, code }));
            }
        }
    };

    // 계정 찾기 결과 페이지로 이동
    // useEffect(() => {
    //     if(idFinding===true){

    //                 history.push('/resultFindId');
    //     }
    // }, [idFinding])

    useEffect(() => {
        return () => {
            dispatch(initialize());
            dispatch(initializeError());
            dispatch(initializeErrorAction());
        };
    }, [dispatch]);

    return (
        <FindId
            authError={authError}
            form={authentication}
            authType={authType}
            idFinding={idFinding}
            onToggleAuthType={onToggleAuthType}
            loading={loading}
            onChange={onChange}
            handleCodeSend={handleCodeSend}
            handleCodeCheck={handleCodeCheck}
        />
    );
};

export default FindIdContainer;
