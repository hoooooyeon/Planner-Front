import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FindPassword from '../../../components/account/find/FindPassword';
import validation from '../../../lib/utils/validationCheck';
import {
    ACCOUNT_PASSWORD_FIND_TYPE,
    accountPasswordFindAction,
    changeFieldAction,
    initializeAction,
    initializeErrorAction,
    initializeFormAction,
    initializePasswordFindRequestAction,
    validateFieldAction,
} from '../../../modules/accountModule';

const FindPasswordContainer = () => {
    const dispatch = useDispatch();
    const { accountError, passwordFindForm, loading, passwordFindRequest } = useSelector(
        ({ accountReducer, loadingReducer }) => ({
            accountError: accountReducer.accountError,
            passwordFindForm: accountReducer.passwordFindForm,
            passwordFindRequest: accountReducer.passwordFindRequest,
            loading: loadingReducer[ACCOUNT_PASSWORD_FIND_TYPE],
        }),
    );

    const onChange = (e) => {
        const { name, value } = e.target;
        dispatch(
            changeFieldAction({
                form: 'passwordFindForm',
                name,
                value,
            }),
        );
    };

    // 비밀번호 찾기
    const handlePasswordFind = () => {
        if (!loading) {
            const validState = validation(passwordFindForm);
            if (Object.keys(validState).length > 0) {
                dispatch(validateFieldAction(validState));
            } else {
                dispatch(initializeErrorAction());
                dispatch(accountPasswordFindAction(passwordFindForm));
            }
        }
    };

    useEffect(() => {
        return () => {
            dispatch(initializeErrorAction());
            dispatch(initializeFormAction('passowrdFindForm'));
            dispatch(initializePasswordFindRequestAction());
        };
    }, [dispatch]);

    return (
        <FindPassword
            accountError={accountError}
            passwordFindForm={passwordFindForm}
            onChange={onChange}
            loading={loading}
            passwordFindRequest={passwordFindRequest}
            handlePasswordFind={handlePasswordFind}
        />
    );
};

export default FindPasswordContainer;
