import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, path }) => {
    const { account } = useSelector(({ authReducer }) => ({ account: authReducer.account }));
    const { accountId } = { ...account };
    return <Route path={path} render={(props) => (accountId ? <Component {...props} /> : <Redirect to="/login" />)} />;
};

export default PrivateRoute;
