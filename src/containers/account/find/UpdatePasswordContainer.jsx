import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router';
import UpdatePassword from '../../../components/account/find/UpdatePassword';
import { accountPasswordChange } from '../../../lib/api/accountAPI';
import validation from '../../../lib/utils/validationCheck';
import {
    ACCOUNT_PASSWORD_CHANGE_TYPE,
    accountPasswordChangeAction,
    changeFieldAction,
    initializeErrorAction,
    initializePasswordUpdateRequestAction,
    validateFieldAction,
} from '../../../modules/accountModule';
import QueryString from 'qs';
import { initializeForm } from '../../../modules/authModule';

const UpdatePasswordContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const { key } = QueryString.parse(location.search, { ignoreQueryPrefix: true });
    const { passwordChangeForm, accountError, loading, passwordChangeRequest } = useSelector(
        ({ accountReducer, loadingReducer }) => ({
            passwordChangeForm: accountReducer.passwordChangeForm,
            accountError: accountReducer.accountError,
            loading: loadingReducer[ACCOUNT_PASSWORD_CHANGE_TYPE],
            passwordChangeRequest: accountReducer.passwordChangeRequest,
        }),
    );

    const onChange = (e) => {
        const { name, value } = e.target;
        dispatch(
            changeFieldAction({
                form: 'passwordChangeForm',
                name,
                value,
            }),
        );
    };

    // 비밀번호 변경
    const handlePasswordChange = () => {
        const validState = validation(passwordChangeForm);
        if (Object.keys(validState).length > 0) {
            dispatch(validateFieldAction(validState));
        } else {
            dispatch(initializeErrorAction());
            dispatch(accountPasswordChangeAction({ ...passwordChangeForm, key }));
        }
    };

    useEffect(() => {
        if (!key) {
            alert('잘못된 접근입니다.');
            history.push('/login');
        }
    }, []);

    useEffect(() => {
        return () => {
            dispatch(initializeErrorAction());
            dispatch(initializeForm('passwordChangeForm'));
            dispatch(initializePasswordUpdateRequestAction());
        };
    }, [dispatch]);

    return (
        <UpdatePassword
            accountError={accountError}
            passwordChangeForm={passwordChangeForm}
            onChange={onChange}
            handlePasswordChange={handlePasswordChange}
            loading={loading}
            passwordChangeRequest={passwordChangeRequest}
        />
    );
};

export default UpdatePasswordContainer;
