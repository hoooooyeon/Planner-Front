import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const PrivateRoute = ({ Compo, path, redirect }) => {
    const { account } = useSelector(({ authReducer }) => ({ account: authReducer.account }));
    const { accountId } = { ...account };
    return accountId ? <Compo path={path} /> : <Redirect to={redirect} />;
};
export default PrivateRoute;
