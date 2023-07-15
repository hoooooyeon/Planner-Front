import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component, path, redirect }) => {
    const { account, planner } = useSelector(({ plannerReducer, authReducer }) => ({ account: authReducer.account, planner: plannerReducer.planner }));
    const { accountId } = { ...account };
    const { creator } = { ...planner };
    // return accountId ? <Route path={path} component={component} /> : <Route path={path} component={component} />;
    return accountId ? <Route path={path} component={component} /> : <Redirect to={redirect} />;
};
export default PrivateRoute;
