import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ render, path, redirect }) => {
    const { account } = useSelector(({ authReducer }) => ({ account: authReducer.account }));
    const { accountId } = { ...account };
    if (!accountId) {
        alert('로그인이 필요합니다.');
        return <Redirect to={redirect} />;
    }
    return <Route path={path} render={render} />;
};

export default PrivateRoute;
