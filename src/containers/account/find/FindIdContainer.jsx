import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import FindId from '../../../components/account/find/FindId';
import validation from '../../../lib/utils/validationCheck';
import {
    changeFieldAction,
    validateFieldAction,
    ACCOUNT_ID_FIND_TYPE,
    accountIdFindAction,
    codeTimerEndAction,
    initializeErrorAction,
    initializeIdFindRequestAction,
    accountIdFindCodeRequestAction,
    ACCOUNT_ID_FIND_CODE_REQUEST_TYPE,
    initializeFormAction,
} from '../../../modules/accountModule';
import { status } from '../../../components/account/find/Status';

const FindIdContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { accountError, idFindForm, loading, codeRequest, idFindRequest } = useSelector(
        ({ accountReducer, loadingReducer }) => ({
            accountError: accountReducer.accountError,
            idFindForm: accountReducer.idFindForm,
            codeRequest: accountReducer.codeRequest,
            idFindRequest: accountReducer.idFindRequest,
            loading: loadingReducer,
        }),
    );

    const [phase, setPhase] = useState(status.REQUEST);

    const onChange = (e) => {
        const { name, value } = e.target;
        dispatch(
            changeFieldAction({
                form: 'idFindForm',
                name: name,
                value: value,
            }),
        );
    };

    // 인증코드 요청 후 인증코드 확인 및 아이디 찾기
    const handleFindId = () => {
        let form = idFindForm;

        if (phase == status.REQUEST) {
            const { code, ...rest } = form;
            form = rest;
        }

        const validState = validation(form);

        if (Object.keys(validState).length > 0) {
            dispatch(validateFieldAction(validState));
        } else {
            dispatch(initializeErrorAction());

            if (phase == status.REQUEST) {
                dispatch(initializeIdFindRequestAction());
                dispatch(accountIdFindCodeRequestAction(idFindForm));
            } else {
                dispatch(accountIdFindAction(idFindForm));
            }
        }
    };

    const handleCodeTimerEnd = () => {
        setPhase(status.REQUEST);
        dispatch(codeTimerEndAction('인증 시간이 끝났습니다. 다시 시도하세요.'));
    };

    useEffect(() => {
        if (codeRequest && phase == status.REQUEST) {
            setPhase(status.FIND);
        } else if (idFindRequest && phase == status.FIND) {
            history.push('/resultFindId');
        }
    }, [loading[ACCOUNT_ID_FIND_CODE_REQUEST_TYPE], loading[ACCOUNT_ID_FIND_TYPE]]);

    useEffect(() => {
        return () => {
            dispatch(initializeErrorAction());
            dispatch(initializeFormAction('idFindForm'));
        };
    }, [dispatch]);

    return (
        <FindId
            accountError={accountError}
            idFindForm={idFindForm}
            phase={phase}
            codeRequest={codeRequest}
            onChange={onChange}
            loading={loading}
            onFindId={handleFindId}
            onCodeTimerEnd={handleCodeTimerEnd}
        />
    );
};

export default FindIdContainer;
