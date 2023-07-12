import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, path }) => {
    const { account, planner } = useSelector(({ plannerReducer, authReducer }) => ({ account: authReducer.account, planner: plannerReducer.planner }));
    const { nickname } = { ...account };
    const { creator } = { ...planner };
    return <Route path={path} render={(props) => (nickname === creator ? <Component {...props} /> : <Redirect to="/login" />)} />;
};

export default PrivateRoute;
